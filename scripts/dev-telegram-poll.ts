import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

import {
  sendTelegramMessage,
  parseUpdateMessage,
  isUpdateTemplateEmpty,
  getHighestResolutionPhoto,
  saveTelegramPhotoLocally,
  formatUpdateConfirmation,
  formatStatsReply,
  formatHelpReply,
} from '../lib/telegram';
import { insertWaypoint, getTripStats } from '../lib/db';
import { TelegramWebhookUpdate } from '../types';

const TELEGRAM_API_BASE = 'https://api.telegram.org';
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const ALLOWED_USER_ID = process.env.TELEGRAM_ALLOWED_USER_ID
  ? parseInt(process.env.TELEGRAM_ALLOWED_USER_ID, 10)
  : null;

if (!BOT_TOKEN) {
  console.error('❌ Error: TELEGRAM_BOT_TOKEN is not set in .env.local');
  process.exit(1);
}

let offset = 0;

async function pollUpdates() {
  console.log('====================================================');
  console.log('📡 Trust The Thumb — Local Live Dispatcher Polling');
  console.log(`🤖 Connected to Bot: @Leesdspbot`);
  console.log(`👤 Whitelisted User ID: ${ALLOWED_USER_ID || 'Any'}`);
  console.log('✨ Waiting for messages from your phone...');
  console.log('====================================================\n');

  while (true) {
    try {
      const res = await fetch(
        `${TELEGRAM_API_BASE}/bot${BOT_TOKEN}/getUpdates?offset=${offset}&timeout=20`
      );
      const data = await res.json();

      if (data.ok && Array.isArray(data.result)) {
        for (const update of data.result as TelegramWebhookUpdate[]) {
          offset = update.update_id + 1;

          const message = update.message || update.edited_message;
          if (!message) continue;

          const chatId = message.chat.id;
          const senderId = message.from?.id;
          const senderName = message.from?.first_name || 'User';

          console.log(`\n📨 Received message from ${senderName} (ID: ${senderId})`);

          // 1. Authorization check
          if (ALLOWED_USER_ID && senderId !== ALLOWED_USER_ID) {
            console.warn(`⛔ Unauthorized access attempt from ID: ${senderId}`);
            await sendTelegramMessage(
              chatId,
              `⛔ *Access Denied*\nYour Telegram User ID (\`${senderId}\`) is not authorized to post to Trust The Thumb.`
            );
            continue;
          }

          // 2. Command processing
          const rawContent = message.text || message.caption || '';
          const trimmedContent = rawContent.trim();
          const command = trimmedContent.split(/\s+/)[0]?.toLowerCase();

          console.log(`📝 Command: ${command || 'Photo/Text'} | Content: "${trimmedContent.replace(/\n/g, ' ')}"`);

          if (command === '/start' || command === '/help' || command === 'help' || command === 'hello' || command === 'hi') {
            await sendTelegramMessage(chatId, formatHelpReply());
            console.log('  -> Sent /help template');
            continue;
          }

          if (command === '/stats' || command === 'stats') {
            const stats = getTripStats();
            await sendTelegramMessage(chatId, formatStatsReply(stats));
            console.log('  -> Sent /stats card');
            continue;
          }

          const isUpdate =
            command === '/update' ||
            command === 'update' ||
            command === 'upd' ||
            trimmedContent.startsWith('/update') ||
            trimmedContent.startsWith('update') ||
            trimmedContent.startsWith('loc:') ||
            trimmedContent.startsWith('location:');

          if (isUpdate) {
            if (isUpdateTemplateEmpty(trimmedContent)) {
              await sendTelegramMessage(
                chatId,
                `✍️ *Ready to log a ride!*\n\nTap to copy the template below, fill in your details, and send:\n\n` +
                `\`\`\`\n` +
                `/update\n` +
                `loc: Flagstaff, AZ\n` +
                `miles: 85\n` +
                `driver: Marcus | 1998 Ford F-150\n` +
                `quote: Keep following the sunset\n` +
                `gifts: 2 hot coffees\n` +
                `\`\`\`\n\n` +
                `💡 _Tip: You can also attach a photo with this template in the caption!_`
              );
              console.log('  -> Sent empty update template prompt');
              continue;
            }

            let imageUrl: string | null = null;
            const bestPhoto = getHighestResolutionPhoto(message.photo);
            if (bestPhoto) {
              imageUrl = await saveTelegramPhotoLocally(bestPhoto.file_id);
              console.log(`  -> Photo saved: ${imageUrl}`);
            }

            const parsed = parseUpdateMessage(trimmedContent);
            if (imageUrl) {
              parsed.imageUrl = imageUrl;
            }

            const result = insertWaypoint(parsed);
            console.log(`  -> Waypoint saved! ID: ${result.waypointId} | Location: ${result.waypoint.location_name} | +${result.waypoint.miles_added} mi`);

            const reply = formatUpdateConfirmation(result.waypoint, result.stats);
            await sendTelegramMessage(chatId, reply);
            console.log('  -> Sent confirmation reply to phone');
            continue;
          }

          // Unrecognized
          await sendTelegramMessage(
            chatId,
            `❓ Unrecognized command.\n\nType \`/help\` for the formatting template or send \`/update\` to log a ride.`
          );
          console.log('  -> Sent unrecognized command notice');
        }
      }
    } catch (err) {
      console.error('Polling error (retrying in 3s):', err);
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }
}

pollUpdates();
