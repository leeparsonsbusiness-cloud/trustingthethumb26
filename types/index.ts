export interface WaypointRecord {
  id?: number;
  timestamp: string; // ISO 8601 string
  location_name: string;
  miles_added: number;
  driver_name: string | null;
  driver_vehicle: string | null;
  quote: string | null;
  gifts_count: number;
  gifts_description: string | null;
  image_url: string | null;
  is_active: number; // 1 = active, 0 = hidden
}

export interface TripStatsRecord {
  id?: number;
  total_miles: number;
  total_rides: number;
  generosity_count: number;
  current_status_text: string | null;
  last_location: string | null;
  updated_at: string;
}

export interface ParsedUpdateInput {
  location: string;
  miles: number;
  driverName: string | null;
  driverVehicle: string | null;
  quote: string | null;
  giftsCount: number;
  giftsDescription: string | null;
  imageUrl?: string | null;
}

export interface TelegramUser {
  id: number;
  is_bot: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
}

export interface TelegramChat {
  id: number;
  type: string;
  title?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
}

export interface TelegramPhotoSize {
  file_id: string;
  file_unique_id: string;
  width: number;
  height: number;
  file_size?: number;
}

export interface TelegramMessage {
  message_id: number;
  from?: TelegramUser;
  chat: TelegramChat;
  date: number;
  text?: string;
  caption?: string;
  photo?: TelegramPhotoSize[];
}

export interface TelegramWebhookUpdate {
  update_id: number;
  message?: TelegramMessage;
  edited_message?: TelegramMessage;
  channel_post?: TelegramMessage;
  edited_channel_post?: TelegramMessage;
}
