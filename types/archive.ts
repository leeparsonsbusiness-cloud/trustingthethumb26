export interface WaypointPhoto {
  url: string;
  caption?: string;
  title?: string;
}

export interface Waypoint {
  id: string;
  name: string;
  state: string;
  coordinates: [number, number];
  status: "completed" | "current" | "upcoming";
  mileMarker: number;
  dateCompleted: string | null;
  storySnippet: string;
  driverName?: string | null;
  rideVehicle?: string | null;
  photos?: WaypointPhoto[];
}

export interface ArchiveMetrics {
  milesTraveled: number;
  totalMilesGoal: number;
  ridesCaught: number;
  daysOnHighway: number;
  generosityCounter: number;
}
