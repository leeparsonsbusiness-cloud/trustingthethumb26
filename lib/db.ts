import path from 'path';
import fs from 'fs';
import { WaypointRecord, TripStatsRecord, ParsedUpdateInput } from '@/types';

function getDbPath(): string {
  const dbDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }
  return process.env.SQLITE_DB_PATH || path.join(dbDir, 'trust_the_thumb.db');
}

export interface SqliteDbInterface {
  exec(sql: string): void;
  prepare(sql: string): {
    run(...params: any[]): { changes: number | bigint; lastInsertRowid: number | bigint };
    get(...params: any[]): any;
    all(...params: any[]): any[];
  };
  close?(): void;
}

let dbInstance: SqliteDbInterface | null = null;

export function resetDbConnection(): void {
  if (dbInstance && typeof dbInstance.close === 'function') {
    try {
      dbInstance.close();
    } catch {}
  }
  dbInstance = null;
}

export function getDb(): SqliteDbInterface {
  if (!dbInstance) {
    const dbPath = getDbPath();
    try {
      // 1. Prefer Node.js native built-in node:sqlite (Node 22+)
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { DatabaseSync } = require('node:sqlite');
      const db = new DatabaseSync(dbPath);
      db.exec('PRAGMA journal_mode = WAL;');
      db.exec('PRAGMA foreign_keys = ON;');
      dbInstance = db;
    } catch {
      // 2. Fallback to better-sqlite3 if node:sqlite is not available
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const BetterSqlite3 = require('better-sqlite3');
      const db = new BetterSqlite3(dbPath);
      db.pragma('journal_mode = WAL');
      db.pragma('foreign_keys = ON');
      dbInstance = db;
    }

    initDb(dbInstance!);
  }
  return dbInstance!;
}

export function initDb(db: SqliteDbInterface = getDb()): void {
  // Create waypoints table
  db.exec(`
    CREATE TABLE IF NOT EXISTS waypoints (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      timestamp TEXT NOT NULL,
      location_name TEXT NOT NULL,
      miles_added REAL NOT NULL DEFAULT 0,
      driver_name TEXT,
      driver_vehicle TEXT,
      quote TEXT,
      gifts_count INTEGER NOT NULL DEFAULT 0,
      gifts_description TEXT,
      image_url TEXT,
      is_active INTEGER NOT NULL DEFAULT 1
    );

    CREATE INDEX IF NOT EXISTS idx_waypoints_timestamp ON waypoints(timestamp DESC);
    CREATE INDEX IF NOT EXISTS idx_waypoints_is_active ON waypoints(is_active);

    CREATE TABLE IF NOT EXISTS trip_stats (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      total_miles REAL NOT NULL DEFAULT 0,
      total_rides INTEGER NOT NULL DEFAULT 0,
      generosity_count INTEGER NOT NULL DEFAULT 0,
      current_status_text TEXT,
      last_location TEXT,
      updated_at TEXT NOT NULL
    );
  `);

  // Ensure initial trip_stats record exists
  const existingStats = db.prepare('SELECT id FROM trip_stats WHERE id = 1').get();
  if (!existingStats) {
    const now = new Date().toISOString();
    db.prepare(`
      INSERT INTO trip_stats (id, total_miles, total_rides, generosity_count, current_status_text, last_location, updated_at)
      VALUES (1, 0, 0, 0, 'On the road', 'Origin', ?)
    `).run(now);
  }
}

export interface InsertWaypointResult {
  waypointId: number | bigint;
  waypoint: WaypointRecord;
  stats: TripStatsRecord;
}

/**
 * Records a new waypoint and atomically updates cumulative trip counters
 */
export function insertWaypoint(input: ParsedUpdateInput): InsertWaypointResult {
  const db = getDb();
  const timestamp = new Date().toISOString();

  // 1. Insert waypoint record
  const insertStmt = db.prepare(`
    INSERT INTO waypoints (
      timestamp,
      location_name,
      miles_added,
      driver_name,
      driver_vehicle,
      quote,
      gifts_count,
      gifts_description,
      image_url,
      is_active
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
  `);

  const result = insertStmt.run(
    timestamp,
    input.location,
    input.miles,
    input.driverName || null,
    input.driverVehicle || null,
    input.quote || null,
    input.giftsCount || 0,
    input.giftsDescription || null,
    input.imageUrl || null
  );

  const waypointId = result.lastInsertRowid;

  // 2. Increment global counters in trip_stats
  const updateStatsStmt = db.prepare(`
    UPDATE trip_stats
    SET
      total_miles = total_miles + ?,
      total_rides = total_rides + 1,
      generosity_count = generosity_count + ?,
      last_location = ?,
      updated_at = ?
    WHERE id = 1
  `);

  updateStatsStmt.run(
    input.miles,
    input.giftsCount || 0,
    input.location,
    timestamp
  );

  // 3. Query updated stats
  const updatedStats = db.prepare('SELECT * FROM trip_stats WHERE id = 1').get() as TripStatsRecord;

  const insertedWaypoint: WaypointRecord = {
    id: Number(waypointId),
    timestamp,
    location_name: input.location,
    miles_added: input.miles,
    driver_name: input.driverName || null,
    driver_vehicle: input.driverVehicle || null,
    quote: input.quote || null,
    gifts_count: input.giftsCount || 0,
    gifts_description: input.giftsDescription || null,
    image_url: input.imageUrl || null,
    is_active: 1,
  };

  return {
    waypointId,
    waypoint: insertedWaypoint,
    stats: {
      id: updatedStats.id,
      total_miles: Number(updatedStats.total_miles),
      total_rides: Number(updatedStats.total_rides),
      generosity_count: Number(updatedStats.generosity_count),
      current_status_text: updatedStats.current_status_text,
      last_location: updatedStats.last_location,
      updated_at: updatedStats.updated_at,
    },
  };
}

/**
 * Retrieve current cumulative trip stats
 */
export function getTripStats(): TripStatsRecord {
  const db = getDb();
  const rawStats = db.prepare('SELECT * FROM trip_stats WHERE id = 1').get() as TripStatsRecord | undefined;

  if (rawStats) {
    return {
      id: rawStats.id,
      total_miles: Number(rawStats.total_miles),
      total_rides: Number(rawStats.total_rides),
      generosity_count: Number(rawStats.generosity_count),
      current_status_text: rawStats.current_status_text,
      last_location: rawStats.last_location,
      updated_at: rawStats.updated_at,
    };
  }

  // Fallback default
  return {
    id: 1,
    total_miles: 0,
    total_rides: 0,
    generosity_count: 0,
    current_status_text: 'On the road',
    last_location: 'Starting Point',
    updated_at: new Date().toISOString(),
  };
}

/**
 * Retrieve recent active waypoints
 */
export function getRecentWaypoints(limit: number = 10): WaypointRecord[] {
  const db = getDb();
  const rows = db.prepare(`
    SELECT * FROM waypoints
    WHERE is_active = 1
    ORDER BY id DESC
    LIMIT ?
  `).all(limit) as any[];

  return rows.map((row) => ({
    id: Number(row.id),
    timestamp: row.timestamp,
    location_name: row.location_name,
    miles_added: Number(row.miles_added),
    driver_name: row.driver_name,
    driver_vehicle: row.driver_vehicle,
    quote: row.quote,
    gifts_count: Number(row.gifts_count),
    gifts_description: row.gifts_description,
    image_url: row.image_url,
    is_active: Number(row.is_active),
  }));
}

/**
 * Re-computes trip_stats from all active waypoints to ensure data integrity if needed
 */
export function recalculateTripStats(): TripStatsRecord {
  const db = getDb();
  const summary = db.prepare(`
    SELECT
      COALESCE(SUM(miles_added), 0) as total_miles,
      COUNT(id) as total_rides,
      COALESCE(SUM(gifts_count), 0) as generosity_count
    FROM waypoints
    WHERE is_active = 1
  `).get() as { total_miles: number; total_rides: number; generosity_count: number };

  const lastWaypoint = db.prepare(`
    SELECT location_name FROM waypoints
    WHERE is_active = 1
    ORDER BY id DESC
    LIMIT 1
  `).get() as { location_name: string } | undefined;

  const now = new Date().toISOString();
  const lastLocation = lastWaypoint?.location_name || 'Starting Point';

  db.prepare(`
    UPDATE trip_stats
    SET
      total_miles = ?,
      total_rides = ?,
      generosity_count = ?,
      last_location = ?,
      updated_at = ?
    WHERE id = 1
  `).run(summary.total_miles, summary.total_rides, summary.generosity_count, lastLocation, now);

  return getTripStats();
}
