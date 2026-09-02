import { ParsedUpdateInput, TripStatsRecord, TelegramPhotoSize, WaypointRecord } from '@/types';
import fs from 'fs';
import path from 'path';

const TELEGRAM_API_BASE = 'https://api.telegram.org';

/**
 * Sends a message back to the specified Telegram chat
 */
export async function sendTelegramMessage(
  chatId: number | string,
  text: string,
  parseMode: 'Markdown' | 'HTML' = 'Markdown'
): Promise<{ ok: boolean; result?: any; description?: string }> {
  const token = process.env.TELEGRAM_BOT_TOKEN;

  if (!token) {
    console.error('TELEGRAM_BOT_TOKEN is not configured.');
    return { ok: false, description: 'TELEGRAM_BOT_TOKEN is missing' };
  }

  const endpoint = `${TELEGRAM_API_BASE}/bot${token}/sendMessage`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: parseMode,
        disable_web_page_preview: false,
      }),
    });

    const data = await response.json();

    // Fallback: If Markdown parsing fails due to unescaped special characters, retry without parse_mode
    if (!data.ok && parseMode === 'Markdown') {
      console.warn('Telegram Markdown parse error, retrying with plain text:', data.description);
      const fallbackResponse = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: text.replace(/[*_`\[\]]/g, ''),
        }),
      });
      return await fallbackResponse.json();
    }

    return data;
  } catch (error: any) {
    console.error('Failed to send Telegram message:', error);
    return { ok: false, description: error?.message || 'Network error' };
  }
}

/**
 * Retrieves the direct public/download URL for a Telegram file_id
 */
export async function getTelegramFileUrl(fileId: string): Promise<string | null> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return null;

  try {
    const res = await fetch(`${TELEGRAM_API_BASE}/bot${token}/getFile?file_id=${fileId}`);
    const data = await res.json();

    if (data.ok && data.result?.file_path) {
      return `${TELEGRAM_API_BASE}/file/bot${token}/${data.result.file_path}`;
    }
    console.error('Failed to get Telegram file path:', data);
    return null;
  } catch (error) {
    console.error('Error fetching file info from Telegram:', error);
    return null;
  }
}

/**
 * Downloads a photo from Telegram and saves it to local public/uploads directory
 */
export async function saveTelegramPhotoLocally(fileId: string): Promise<string | null> {
  try {
    const fileUrl = await getTelegramFileUrl(fileId);
    if (!fileUrl) return null;

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'waypoints');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const filename = `photo_${Date.now()}_${path.basename(fileUrl)}`;
    const localFilePath = path.join(uploadsDir, filename);

    const photoRes = await fetch(fileUrl);
    if (!photoRes.ok) return fileUrl; // fallback to remote URL

    const arrayBuffer = await photoRes.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(localFilePath, buffer);

    // Return the web-accessible relative path
    return `/uploads/waypoints/${filename}`;
  } catch (err) {
    console.error('Could not save photo locally, using direct URL fallback:', err);
    return getTelegramFileUrl(fileId);
  }
}

/**
 * Extracts the highest resolution photo from a Telegram photo array
 */
export function getHighestResolutionPhoto(photos?: TelegramPhotoSize[]): TelegramPhotoSize | null {
  if (!photos || photos.length === 0) return null;
  return photos.reduce((prev, current) => {
    const prevSize = (prev.width || 0) * (prev.height || 0);
    const currSize = (current.width || 0) * (current.height || 0);
    return currSize > prevSize ? current : prev;
  }, photos[0]);
}

/**
 * Checks if an update message has actual data or is just an empty command/template
 */
export function isUpdateTemplateEmpty(rawContent: string): boolean {
  const cleaned = rawContent
    .replace(/^\/?(?:update|upd)/i, '')
    .replace(/(?:loc|location|miles|mileage|dist|distance|driver|ride|quote|note|msg|gifts|gift|generosity)\s*:/gi, '')
    .replace(/[|\-;:,\n\r\t]/g, '')
    .trim();

  return cleaned.length === 0;
}

/**
 * Parses the structured /update command from text or photo caption
 */
export function parseUpdateMessage(rawContent: string): ParsedUpdateInput {
  // Normalize single-line inline keywords by converting " Miles:" or ", miles:" or "/ miles:" to newlines
  let normalized = rawContent
    .replace(/\s*[,;\/]\s*(?=(?:loc|location|miles|mileage|dist|distance|driver|ride|quote|note|msg|gifts|gift|generosity)\s*[:=,])/gi, '\n')
    .replace(/\s+(?=(?:loc|location|miles|mileage|dist|distance|driver|ride|quote|note|msg|gifts|gift|generosity)\s*[:=])/gi, '\n');

  const lines = normalized.split('\n').map((line) => line.trim()).filter(Boolean);

  let location = 'Roadside';
  let miles = 0;
  let driverName: string | null = null;
  let driverVehicle: string | null = null;
  let quote: string | null = null;
  let giftsCount = 0;
  let giftsDescription: string | null = null;

  for (const line of lines) {
    // 1. Location line: loc: [City, State] or location: [City, State] or loc, [City, State]
    const locMatch = line.match(/^(?:loc|location)\s*[:=,]\s*(.+)$/i);
    if (locMatch) {
      const val = locMatch[1].trim();
      if (val && val.toLowerCase() !== 'n/a') location = val;
      continue;
    }

    // 2. Miles line: miles: [Number]
    const milesMatch = line.match(/^(?:miles|mileage|dist|distance)\s*[:=, ]\s*([+0-9.]+)/i);
    if (milesMatch) {
      const parsedMiles = parseFloat(milesMatch[1].replace('+', ''));
      if (!isNaN(parsedMiles)) {
        miles = parsedMiles;
      }
      continue;
    }

    // 3. Driver line: driver: [Name] | [Vehicle] or driver: [Name] / [Vehicle]
    const driverMatch = line.match(/^(?:driver|ride)\s*[:=,]\s*(.+)$/i);
    if (driverMatch) {
      const fullDriverStr = driverMatch[1].trim();
      if (fullDriverStr.includes('|')) {
        const [name, ...vehicleParts] = fullDriverStr.split('|');
        driverName = name.trim() || null;
        driverVehicle = vehicleParts.join('|').trim() || null;
      } else if (fullDriverStr.includes(' - ')) {
        const [name, ...vehicleParts] = fullDriverStr.split(' - ');
        driverName = name.trim() || null;
        driverVehicle = vehicleParts.join(' - ').trim() || null;
      } else if (fullDriverStr.includes(' / ')) {
        const [name, ...vehicleParts] = fullDriverStr.split(' / ');
        driverName = name.trim() || null;
        driverVehicle = vehicleParts.join(' / ').trim() || null;
      } else {
        driverName = fullDriverStr || null;
      }
      if (driverName && driverName.toLowerCase() === 'n/a') driverName = null;
      if (driverVehicle && driverVehicle.toLowerCase() === 'n/a') driverVehicle = null;
      continue;
    }

    // 4. Quote line: quote: [Driver quote or road note]
    const quoteMatch = line.match(/^(?:quote|note|msg)\s*[:=,]\s*(.+)$/i);
    if (quoteMatch) {
      let rawQuote = quoteMatch[1].trim();
      if ((rawQuote.startsWith('"') && rawQuote.endsWith('"')) || (rawQuote.startsWith("'") && rawQuote.endsWith("'"))) {
        rawQuote = rawQuote.slice(1, -1).trim();
      }
      if (rawQuote && rawQuote.toLowerCase() !== 'n/a') {
        quote = rawQuote;
      }
      continue;
    }

    // 5. Gifts line: gifts: [Number] [Optional description]
    const giftsMatch = line.match(/^(?:gifts|gift|generosity)\s*:\s*(.+)$/i);
    if (giftsMatch) {
      const giftStr = giftsMatch[1].trim();
      const countMatch = giftStr.match(/^(\d+)\s*(.*)$/);

      if (countMatch) {
        giftsCount = parseInt(countMatch[1], 10);
        giftsDescription = countMatch[2]?.trim() || null;
      } else {
        if (giftStr.toLowerCase() === 'none' || giftStr === '0') {
          giftsCount = 0;
          giftsDescription = null;
        } else {
          giftsCount = 1;
          giftsDescription = giftStr;
        }
      }
      continue;
    }
  }

  return {
    location,
    miles,
    driverName,
    driverVehicle,
    quote,
    giftsCount,
    giftsDescription,
  };
}

/**
 * Builds the Telegram reply message after a successful /update
 */
export function formatUpdateConfirmation(waypoint: WaypointRecord, stats: TripStatsRecord): string {
  const driverStr = waypoint.driver_name
    ? waypoint.driver_vehicle
      ? `${waypoint.driver_name} (${waypoint.driver_vehicle})`
      : waypoint.driver_name
    : 'Anonymous Friend';

  const giftsStr = waypoint.gifts_count > 0
    ? `+${waypoint.gifts_count}${waypoint.gifts_description ? ` ${waypoint.gifts_description}` : ' gift(s)'}`
    : '0';

  let message = `✅ *Live Site Updated!*\n\n` +
    `📍 *Location:* ${waypoint.location_name}\n` +
    `🚗 *Driver:* ${driverStr}\n` +
    `🛣️ *+${waypoint.miles_added} miles* (Total: ${stats.total_miles.toLocaleString()} miles)\n` +
    `☕ *${giftsStr}* (Total Generosity: ${stats.generosity_count})\n`;

  if (waypoint.quote) {
    message += `💬 _"${waypoint.quote}"_\n`;
  }

  if (waypoint.image_url) {
    message += `📸 _Photo saved to Driver Wall of Fame!_\n`;
  }

  message += `\n⚡ _Next.js live cache refreshed._`;

  return message;
}

/**
 * Builds the Telegram reply message for /stats
 */
export function formatStatsReply(stats: TripStatsRecord): string {
  return `📊 *Trust The Thumb — Live Trip Stats*\n\n` +
    `📍 *Current Location:* ${stats.last_location || 'Unknown'}\n` +
    `🛣️ *Total Distance:* ${stats.total_miles.toLocaleString()} miles\n` +
    `🚗 *Total Rides:* ${stats.total_rides} rides\n` +
    `☕ *Generosity Index:* ${stats.generosity_count} acts of kindness\n` +
    `🏷️ *Status:* ${stats.current_status_text || 'On the road'}\n` +
    `🕒 *Last Logged:* ${new Date(stats.updated_at).toUTCString()}\n\n` +
    `🌐 [View Live Tracker](https://trustthethumb.com)`;
}

/**
 * Builds the Telegram reply message for /help or /start
 */
export function formatHelpReply(): string {
  return `👍 *Trust The Thumb — Mobile Dispatcher*\n\n` +
    `Send structured road updates directly from Telegram. Tap to copy the template below:\n\n` +
    `\`\`\`\n` +
    `/update\n` +
    `loc: Flagstaff, AZ\n` +
    `miles: 85\n` +
    `driver: Marcus | 1998 Ford F-150\n` +
    `quote: Keep following the sunset\n` +
    `gifts: 2 hot coffees\n` +
    `\`\`\`\n\n` +
    `*Commands:*\n` +
    `• \`/update\` - Log a new ride/waypoint (with optional photo)\n` +
    `• \`/stats\` - View cumulative miles, rides, and gifts\n` +
    `• \`/help\` - Show this template & instructions\n\n` +
    `💡 *Tip:* You can attach a photo with the \`/update\` caption to automatically add the driver to the Wall of Fame!`;
}

/**
 * Registers the official Bot Command menu with Telegram API (setMyCommands)
 * This makes the popup command menu appear automatically on iOS/Android keyboards!
 */
export async function registerBotCommands(
  token: string = process.env.TELEGRAM_BOT_TOKEN || ''
): Promise<{ ok: boolean; description?: string }> {
  if (!token) {
    return { ok: false, description: 'Telegram Bot Token is missing' };
  }

  const commands = [
    { command: 'update', description: 'Log new ride & waypoint (text/photo)' },
    { command: 'stats', description: 'View total miles, rides & generosity index' },
    { command: 'help', description: 'Get tap-to-copy update template' },
  ];

  try {
    const res = await fetch(`${TELEGRAM_API_BASE}/bot${token}/setMyCommands`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ commands }),
    });
    return await res.json();
  } catch (err: any) {
    return { ok: false, description: err?.message || 'Network error' };
  }
}

/**
 * Registers or updates the Webhook URL with Telegram API (setWebhook)
 */
export async function registerWebhook(
  webhookUrl: string,
  secretToken: string,
  token: string = process.env.TELEGRAM_BOT_TOKEN || ''
): Promise<{ ok: boolean; description?: string }> {
  if (!token) {
    return { ok: false, description: 'Telegram Bot Token is missing' };
  }

  try {
    const res = await fetch(`${TELEGRAM_API_BASE}/bot${token}/setWebhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: webhookUrl,
        secret_token: secretToken,
        allowed_updates: ['message', 'edited_message'],
        drop_pending_updates: false,
      }),
    });
    return await res.json();
  } catch (err: any) {
    return { ok: false, description: err?.message || 'Network error' };
  }
}

/**
 * Fetches bot information (getMe) to verify credentials
 */
export async function getBotInfo(
  token: string = process.env.TELEGRAM_BOT_TOKEN || ''
): Promise<{ ok: boolean; result?: any; description?: string }> {
  if (!token) {
    return { ok: false, description: 'Telegram Bot Token is missing' };
  }

  try {
    const res = await fetch(`${TELEGRAM_API_BASE}/bot${token}/getMe`);
    return await res.json();
  } catch (err: any) {
    return { ok: false, description: err?.message || 'Network error' };
  }
}

