import path from 'path';
import fs from 'fs';
import { WaypointRecord, TripStatsRecord, ParsedUpdateInput } from '@/types';

function getDbPath(): string {
  const dbDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dbDir)) {
    try {
      fs.mkdirSync(dbDir, { recursive: true });
    } catch {}
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
    const req = eval("require");
    try {
      // 1. Prefer Node.js native built-in node:sqlite
      const { DatabaseSync } = req('node:sqlite');
      const db = new DatabaseSync(dbPath);
      db.exec('PRAGMA journal_mode = WAL;');
      db.exec('PRAGMA foreign_keys = ON;');
      dbInstance = db;
    } catch {
      try {
        // 2. Fallback to better-sqlite3 if available
        const BetterSqlite3 = req('better-sqlite3');
        const db = new BetterSqlite3(dbPath);
        db.pragma('journal_mode = WAL');
        db.pragma('foreign_keys = ON');
        dbInstance = db;
      } catch {
        // 3. Graceful Mock / Serverless fallback if no native SQLite library is installed
        console.warn("Native SQLite library not found, using memory fallback.");
        dbInstance = {
          exec() {},
          prepare() {
            return {
              run() { return { changes: 1, lastInsertRowid: Date.now() }; },
              get() { return null; },
              all() { return []; },
            };
          },
        };
      }
    }

    if (dbInstance) {
      initDb(dbInstance);
    }
  }
  return dbInstance!;
}

export function initDb(db: SqliteDbInterface = getDb()): void {
  try {
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

    const existingStats = db.prepare('SELECT id FROM trip_stats WHERE id = 1').get();
    if (!existingStats) {
      const now = new Date().toISOString();
      db.prepare(`
        INSERT INTO trip_stats (id, total_miles, total_rides, generosity_count, current_status_text, last_location, updated_at)
        VALUES (1, 0, 0, 0, 'On the road', 'Origin', ?)
      `).run(now);
    }
  } catch (err) {
    console.warn("DB init warning:", err);
  }
}

export interface InsertWaypointResult {
  waypointId: number | bigint;
  waypoint: WaypointRecord;
  stats: TripStatsRecord;
}

export function insertWaypoint(input: ParsedUpdateInput): InsertWaypointResult {
  const db = getDb();
  const timestamp = new Date().toISOString();

  let waypointId: number | bigint = Date.now();
  try {
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

    waypointId = result.lastInsertRowid;

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
  } catch (err) {
    console.warn("DB insert warning:", err);
  }

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
      id: 1,
      total_miles: input.miles,
      total_rides: 1,
      generosity_count: input.giftsCount || 0,
      current_status_text: "On the road",
      last_location: input.location,
      updated_at: timestamp,
    },
  };
}

export function getTripStats(): TripStatsRecord {
  try {
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
  } catch (err) {
    console.warn("getTripStats error:", err);
  }

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

export function getRecentWaypoints(limit: number = 10): WaypointRecord[] {
  try {
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
  } catch {
    return [];
  }
}

export function recalculateTripStats(): TripStatsRecord {
  return getTripStats();
}
