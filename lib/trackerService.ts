import fs from 'fs';
import path from 'path';

export interface Creator {
  name: string;
  age: number;
  handle: string;
  avatar: string;
  socials: Record<string, string>;
}

export interface Waypoint {
  id: string;
  name: string;
  state: string;
  coordinates: [number, number];
  status: 'current' | 'upcoming' | 'completed';
  mileMarker: number;
  dateCompleted: string | null;
  storySnippet: string;
  driverName: string | null;
  rideVehicle: string | null;
  photos?: Array<{
    url: string;
    caption?: string;
    title?: string;
  }>;
}

export interface LiveStatus {
  state: string;
  statusBadgeText: string;
  statusType: string;
  currentCity: string;
  currentCoordinates: [number, number];
  lastUpdated: string;
  currentNote: string;
}

export interface Metrics {
  milesTraveled: number;
  totalMilesGoal: number;
  ridesCaught: number;
  daysOnHighway: number;
  generosityCounter: number;
  peopleMet: number;
  ridesTaken: number;
  mealsShared: number;
  placesStayed: number;
  moneySpent: number;
}

export interface TrackerConfig {
  journeyTitle: string;
  creators: Record<string, Creator>;
  launchDate: string;
  liveStatus: LiveStatus;
  metrics: Metrics;
  waypoints: Waypoint[];
}

const LOCAL_CONFIG_PATH = path.join(process.cwd(), 'data', 'trackerConfig.json');
const TMP_CONFIG_PATH = path.join('/tmp', 'trackerConfig.json');

// In-memory cache for fast repeated reads within the same serverless instance
let memoryConfigCache: TrackerConfig | null = null;
let memoryCacheTimestamp = 0;

/**
 * Loads the current TrackerConfig.
 * Checks memory cache -> /tmp file -> local data/trackerConfig.json.
 */
export function getTrackerConfig(): TrackerConfig {
  const now = Date.now();
  if (memoryConfigCache && now - memoryCacheTimestamp < 10000) {
    return memoryConfigCache;
  }

  // 1. Try /tmp (serverless cache)
  try {
    if (fs.existsSync(TMP_CONFIG_PATH)) {
      const raw = fs.readFileSync(TMP_CONFIG_PATH, 'utf-8');
      const parsed = JSON.parse(raw);
      memoryConfigCache = parsed;
      memoryCacheTimestamp = now;
      return parsed;
    }
  } catch {}

  // 2. Try project data file
  try {
    if (fs.existsSync(LOCAL_CONFIG_PATH)) {
      const raw = fs.readFileSync(LOCAL_CONFIG_PATH, 'utf-8');
      const parsed = JSON.parse(raw);
      memoryConfigCache = parsed;
      memoryCacheTimestamp = now;
      return parsed;
    }
  } catch {}

  throw new Error('Unable to load trackerConfig.json');
}

/**
 * Saves tracker config:
 * 1. Updates memory cache
 * 2. Writes to /tmp (for subsequent serverless hits)
 * 3. Writes to local disk (if writable)
 * 4. Pushes to GitHub via GitHub API (if GITHUB_TOKEN is available)
 */
export async function saveTrackerConfig(
  config: TrackerConfig,
  commitMessage: string = 'Live highway update from Telegram'
): Promise<{ savedLocally: boolean; pushedToGitHub: boolean; error?: string }> {
  memoryConfigCache = config;
  memoryCacheTimestamp = Date.now();
  const jsonStr = JSON.stringify(config, null, 2);

  // 1. Write to /tmp
  try {
    fs.writeFileSync(TMP_CONFIG_PATH, jsonStr, 'utf-8');
  } catch {}

  // 2. Write to local file if writable
  let savedLocally = false;
  try {
    fs.writeFileSync(LOCAL_CONFIG_PATH, jsonStr, 'utf-8');
    savedLocally = true;
  } catch {
    // Expected in read-only serverless lambdas
  }

  // 3. Push to GitHub API if token available
  let pushedToGitHub = false;
  const githubToken = process.env.GITHUB_TOKEN;
  const githubRepo = process.env.GITHUB_REPO || 'leeparsonsbusiness-cloud/trustingthethumb26';

  if (githubToken) {
    try {
      const fileUrl = `https://api.github.com/repos/${githubRepo}/contents/data/trackerConfig.json`;
      
      // Get existing file SHA
      const getRes = await fetch(fileUrl, {
        headers: {
          Authorization: `token ${githubToken}`,
          'User-Agent': 'TrustTheThumb-Bot',
          Accept: 'application/vnd.github.v3+json',
        },
      });

      if (getRes.ok) {
        const fileData = await getRes.json();
        const sha = fileData.sha;

        // Put updated file content
        const putRes = await fetch(fileUrl, {
          method: 'PUT',
          headers: {
            Authorization: `token ${githubToken}`,
            'User-Agent': 'TrustTheThumb-Bot',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: commitMessage,
            content: Buffer.from(jsonStr).toString('base64'),
            sha,
            branch: 'main',
          }),
        });

        if (putRes.ok) {
          pushedToGitHub = true;
        } else {
          const errData = await putRes.json();
          console.warn('GitHub API commit error:', errData);
        }
      }
    } catch (ghErr) {
      console.error('Failed to sync to GitHub API:', ghErr);
    }
  }

  return { savedLocally, pushedToGitHub };
}

/**
 * Matches a city string to a waypoint (e.g. "barstow" -> barstow waypoint)
 */
export function findMatchingWaypoint(cityOrId: string, waypoints: Waypoint[]): Waypoint | null {
  const clean = cityOrId.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (!clean) return null;

  for (const wp of waypoints) {
    const wpIdClean = wp.id.toLowerCase().replace(/[^a-z0-9]/g, '');
    const wpNameClean = wp.name.toLowerCase().replace(/[^a-z0-9]/g, '');

    if (clean === wpIdClean || clean === wpNameClean) return wp;
    if (clean.includes(wpIdClean) || wpNameClean.includes(clean)) return wp;
  }
  return null;
}

/**
 * Updates location and note from "/location City, State | Note"
 */
export async function updateLocation(city: string, note?: string) {
  const config = getTrackerConfig();
  const nowIso = new Date().toISOString();

  config.liveStatus.state = 'active';
  config.liveStatus.statusType = 'active';
  config.liveStatus.currentCity = city;
  config.liveStatus.statusBadgeText = `Live on Highway • ${city}`;
  config.liveStatus.lastUpdated = nowIso;
  if (note && note.trim()) {
    config.liveStatus.currentNote = note.trim();
  }

  // Attempt to match with waypoint
  const matched = findMatchingWaypoint(city, config.waypoints);
  if (matched) {
    config.liveStatus.currentCoordinates = matched.coordinates;
    let foundCurrent = false;
    for (const wp of config.waypoints) {
      if (wp.id === matched.id) {
        wp.status = 'current';
        foundCurrent = true;
      } else if (!foundCurrent) {
        wp.status = 'completed';
        if (!wp.dateCompleted) wp.dateCompleted = nowIso;
      } else {
        wp.status = 'upcoming';
      }
    }
  }

  const result = await saveTrackerConfig(config, `Live location update from Telegram: ${city}`);
  return { config, matchedWaypoint: matched, ...result };
}

export type UpdateWaypointResult =
  | { ok: false; error: string }
  | {
      ok: true;
      config: TrackerConfig;
      waypoint: Waypoint;
      savedLocally: boolean;
      pushedToGitHub: boolean;
      error?: string;
    };

/**
 * Updates waypoint details from "/waypoint barstow | Dave | Ford F-150 | Story snippet"
 */
export async function updateWaypoint(
  waypointId: string,
  driverName?: string,
  vehicle?: string,
  story?: string
): Promise<UpdateWaypointResult> {
  const config = getTrackerConfig();
  const nowIso = new Date().toISOString();

  const matched = findMatchingWaypoint(waypointId, config.waypoints);
  if (!matched) {
    return { ok: false, error: `Waypoint '${waypointId}' not found.` };
  }

  let foundCurrent = false;
  for (const wp of config.waypoints) {
    if (wp.id === matched.id) {
      wp.status = 'current';
      if (driverName && driverName.trim()) wp.driverName = driverName.trim();
      if (vehicle && vehicle.trim()) wp.rideVehicle = vehicle.trim();
      if (story && story.trim()) wp.storySnippet = story.trim();
      foundCurrent = true;
    } else if (!foundCurrent) {
      wp.status = 'completed';
      if (!wp.dateCompleted) wp.dateCompleted = nowIso;
    } else {
      wp.status = 'upcoming';
    }
  }

  config.liveStatus.state = 'active';
  config.liveStatus.statusType = 'active';
  config.liveStatus.currentCity = matched.name;
  config.liveStatus.currentCoordinates = matched.coordinates;
  config.liveStatus.statusBadgeText = `Live on Highway • ${matched.name}`;
  config.liveStatus.lastUpdated = nowIso;
  if (story && story.trim()) {
    config.liveStatus.currentNote = story.trim();
  }

  const result = await saveTrackerConfig(config, `Live waypoint update from Telegram: ${matched.name}`);
  return { ok: true, config, waypoint: matched, ...result };
}

/**
 * Updates tracker from parsed /update command
 */
export async function updateFromStructuredRide(input: {
  location: string;
  miles: number;
  driverName: string | null;
  driverVehicle: string | null;
  quote: string | null;
  giftsCount: number;
  imageUrl?: string | null;
}) {
  const config = getTrackerConfig();
  const nowIso = new Date().toISOString();

  if (input.location && input.location !== 'Roadside') {
    config.liveStatus.currentCity = input.location;
    config.liveStatus.statusBadgeText = `Live on Highway • ${input.location}`;
  }
  config.liveStatus.state = 'active';
  config.liveStatus.statusType = 'active';
  config.liveStatus.lastUpdated = nowIso;
  if (input.quote) {
    config.liveStatus.currentNote = input.quote;
  }

  // Update cumulative metrics
  if (input.miles > 0) {
    config.metrics.milesTraveled = (config.metrics.milesTraveled || 0) + input.miles;
  }
  config.metrics.ridesCaught = (config.metrics.ridesCaught || 0) + 1;
  config.metrics.ridesTaken = config.metrics.ridesCaught;
  if (input.giftsCount > 0) {
    config.metrics.generosityCounter = (config.metrics.generosityCounter || 0) + input.giftsCount;
  }

  // Waypoint progression if matching location
  const matched = findMatchingWaypoint(input.location, config.waypoints);
  if (matched) {
    config.liveStatus.currentCoordinates = matched.coordinates;
    let foundCurrent = false;
    for (const wp of config.waypoints) {
      if (wp.id === matched.id) {
        wp.status = 'current';
        if (input.driverName) wp.driverName = input.driverName;
        if (input.driverVehicle) wp.rideVehicle = input.driverVehicle;
        if (input.quote) wp.storySnippet = input.quote;
        foundCurrent = true;
      } else if (!foundCurrent) {
        wp.status = 'completed';
        if (!wp.dateCompleted) wp.dateCompleted = nowIso;
      } else {
        wp.status = 'upcoming';
      }
    }
  }

  const result = await saveTrackerConfig(
    config,
    `Live ride logged from Telegram: ${input.location} (+${input.miles} mi)`
  );
  return { config, matchedWaypoint: matched, ...result };
}
