import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { TelegramWebhookUpdate } from '@/types';
import {
  sendTelegramMessage,
  parseUpdateMessage,
  isUpdateTemplateEmpty,
  getHighestResolutionPhoto,
  saveTelegramPhotoLocally,
  formatUpdateConfirmation,
  formatStatsReply,
  formatHelpReply,
} from '@/lib/telegram';
import { insertWaypoint, getTripStats } from '@/lib/db';
import {
  getTrackerConfig,
  updateLocation,
  updateWaypoint,
  updateFromStructuredRide,
} from '@/lib/trackerService';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // 1. Webhook Secret Token Verification
    const secretTokenHeader = request.headers.get('x-telegram-bot-api-secret-token');
    const expectedSecret = process.env.TELEGRAM_WEBHOOK_SECRET;

    if (expectedSecret && secretTokenHeader !== expectedSecret) {
      console.warn('Unauthorized webhook attempt: secret token mismatch.');
      return NextResponse.json(
        { error: 'Unauthorized: Invalid secret token' },
        { status: 401 }
      );
    }

    // 2. Parse Incoming Payload
    let update: TelegramWebhookUpdate;
    try {
      update = await request.json();
    } catch (err) {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }

    const message = update.message || update.edited_message;
    if (!message) {
      return NextResponse.json({ ok: true, ignored: true });
    }

    const chatId = message.chat.id;
    const senderId = message.from?.id;

    // 3. User Authorization Check (supports multiple comma-separated IDs)
    const allowedUserIdStr = process.env.TELEGRAM_ALLOWED_USER_ID;
    if (allowedUserIdStr) {
      const allowedUserIds = allowedUserIdStr
        .split(/[,\s]+/)
        .map((s) => parseInt(s.trim(), 10))
        .filter((n) => !isNaN(n));

      if (allowedUserIds.length > 0 && senderId && !allowedUserIds.includes(senderId)) {
        console.warn(`Forbidden: Message from unauthorized user ID ${senderId} (Allowed: ${allowedUserIds.join(', ')})`);

        await sendTelegramMessage(
          chatId,
          `⛔ *Access Denied*\nYour Telegram User ID (\`${senderId}\`) is not authorized to update Trust The Thumb.\n\nTo authorize your phone, add \`${senderId}\` to \`TELEGRAM_ALLOWED_USER_ID\` in Vercel settings!`
        );

        return NextResponse.json(
          { error: 'Forbidden: User not authorized' },
          { status: 403 }
        );
      }
    }

    // 4. Extract Text & Media Content
    const rawContent = message.text || message.caption || '';
    const trimmedContent = rawContent.trim();
    const command = trimmedContent.split(/\s+/)[0]?.toLowerCase();

    // Command: /start, /help, help, etc.
    if (command === '/start' || command === '/help' || command === 'help' || command === 'hello' || command === 'hi') {
      const helpText = formatHelpReply();
      await sendTelegramMessage(chatId, helpText);
      return NextResponse.json({ ok: true, command: 'help' });
    }

    // Command: /status, /stats
    if (command === '/status' || command === 'status' || command === '/stats' || command === 'stats') {
      try {
        const cfg = getTrackerConfig();
        const statusMsg =
          `📊 *Trust The Thumb — Live Website Status*\n\n` +
          `📍 *Current City:* ${cfg.liveStatus.currentCity || 'Unknown'}\n` +
          `🏷️ *Badge:* ${cfg.liveStatus.statusBadgeText || 'On the road'}\n` +
          `📝 *Note:* "${cfg.liveStatus.currentNote || 'No notes yet'}"\n\n` +
          `🛣️ *Miles Traveled:* ${(cfg.metrics.milesTraveled || 0).toLocaleString()} mi\n` +
          `🚗 *Rides Caught:* ${cfg.metrics.ridesCaught || 0}\n` +
          `☕ *Generosity Index:* ${cfg.metrics.generosityCounter || 0}\n` +
          `🕒 *Last Updated:* ${new Date(cfg.liveStatus.lastUpdated).toUTCString()}\n\n` +
          `🌐 [View Live Tracker](https://www.trustthethumb.com)`;

        await sendTelegramMessage(chatId, statusMsg);
        return NextResponse.json({ ok: true, command: 'status' });
      } catch (err: any) {
        const stats = getTripStats();
        await sendTelegramMessage(chatId, formatStatsReply(stats));
        return NextResponse.json({ ok: true, command: 'stats' });
      }
    }

    // Command: /location <City, State> [| <Road note>]
    if (command === '/location' || trimmedContent.toLowerCase().startsWith('/location')) {
      const payload = trimmedContent.replace(/^\/location/i, '').trim();
      const parts = payload.split('|').map((p) => p.trim());
      const city = parts[0] || '';
      const note = parts.slice(1).join('|').trim();

      if (!city) {
        await sendTelegramMessage(
          chatId,
          `❌ *Format error!*\n\nUse: \`/location Barstow, CA | Road note here\``
        );
        return NextResponse.json({ ok: false, error: 'Missing city parameter' });
      }

      const updateResult = await updateLocation(city, note);

      // Revalidate cache
      try {
        revalidatePath('/');
        revalidatePath('/api/tracker');
      } catch {}

      const deployNotice = updateResult.pushedToGitHub
        ? `🚀 *Pushed to live website!* (Vercel deploying now)`
        : `⚡ *Saved locally!*`;

      const waypointNotice = updateResult.matchedWaypoint
        ? `\n🎯 *Waypoint matched:* ${updateResult.matchedWaypoint.name} (Mile ${updateResult.matchedWaypoint.mileMarker})`
        : '';

      await sendTelegramMessage(
        chatId,
        `✅ *Location Updated!*\n\n` +
        `📍 *City:* ${city}\n` +
        `📝 *Note:* ${note || 'Updated'}` +
        waypointNotice +
        `\n\n${deployNotice}\n🌐 [View Site](https://www.trustthethumb.com)`
      );

      return NextResponse.json({ ok: true, city, note });
    }

    // Command: /waypoint <id> [| <driver> | <vehicle> | <story>]
    if (command === '/waypoint' || trimmedContent.toLowerCase().startsWith('/waypoint')) {
      const payload = trimmedContent.replace(/^\/waypoint/i, '').trim();
      const parts = payload.split('|').map((p) => p.trim());
      const wpId = parts[0] || '';
      const driverName = parts[1] || '';
      const vehicle = parts[2] || '';
      const story = parts[3] || '';

      if (!wpId) {
        await sendTelegramMessage(
          chatId,
          `❌ *Format error!*\n\nUse: \`/waypoint barstow | Dave | Ford F-150 | Story snippet\``
        );
        return NextResponse.json({ ok: false, error: 'Missing waypoint ID' });
      }

      const updateResult = await updateWaypoint(wpId, driverName, vehicle, story);
      if (!updateResult.ok) {
        await sendTelegramMessage(
          chatId,
          `❌ *${updateResult.error}*\nValid IDs: \`la\`, \`barstow\`, \`flagstaff\`, \`albuquerque\`, \`amarillo\`, \`okc\`, \`stlouis\`, \`indianapolis\`, \`ohio\``
        );
        return NextResponse.json({ ok: false, error: updateResult.error });
      }

      try {
        revalidatePath('/');
        revalidatePath('/api/tracker');
      } catch {}

      const deployNotice = updateResult.pushedToGitHub
        ? `🚀 *Pushed to live website!* (Vercel deploying now)`
        : `⚡ *Saved locally!*`;

      await sendTelegramMessage(
        chatId,
        `✅ *Waypoint Advanced!*\n\n` +
        `🎯 *Waypoint:* ${updateResult.waypoint?.name || wpId.toUpperCase()}\n` +
        `🚗 *Driver:* ${driverName || 'N/A'}\n` +
        `📝 *Story:* ${story || 'N/A'}\n\n` +
        `${deployNotice}\n🌐 [View Site](https://www.trustthethumb.com)`
      );

      return NextResponse.json({ ok: true, waypointId: wpId });
    }

    // Command: /update, update, upd, loc:
    const isUpdateCommand =
      command === '/update' ||
      command === 'update' ||
      command === 'upd' ||
      trimmedContent.startsWith('/update') ||
      trimmedContent.startsWith('update') ||
      trimmedContent.startsWith('loc:') ||
      trimmedContent.startsWith('location:');

    if (isUpdateCommand) {
      if (isUpdateTemplateEmpty(trimmedContent)) {
        await sendTelegramMessage(
          chatId,
          `✍️ *Ready to log a ride!*\n\nTap to copy either template below, fill in, and send:\n\n` +
          `*1. Quick Location Update:*\n` +
          `\`/location Barstow, CA | Caught an 85-mile ride!\`\n\n` +
          `*2. Full Ride & Stats Template:*\n` +
          `\`\`\`\n` +
          `/update\n` +
          `loc: Flagstaff, AZ\n` +
          `miles: 85\n` +
          `driver: Marcus | 1998 Ford F-150\n` +
          `quote: Keep following the sunset\n` +
          `gifts: 2 hot coffees\n` +
          `\`\`\`\n\n` +
          `💡 _Tip: You can also attach a photo with this in the caption!_`
        );
        return NextResponse.json({ ok: true, status: 'template_prompt_sent' });
      }

      // Optional photo attachment
      let imageUrl: string | null = null;
      const bestPhoto = getHighestResolutionPhoto(message.photo);

      if (bestPhoto) {
        imageUrl = await saveTelegramPhotoLocally(bestPhoto.file_id);
      }

      // Parse fields from message text/caption
      const parsedInput = parseUpdateMessage(trimmedContent);
      if (imageUrl) {
        parsedInput.imageUrl = imageUrl;
      }

      // Update trackerConfig and push to GitHub
      const trackerResult = await updateFromStructuredRide(parsedInput);

      // Record to SQLite database and increment counters
      const dbResult = insertWaypoint(parsedInput);

      // Invalidate Next.js cache
      try {
        revalidatePath('/');
        revalidatePath('/api/tracker');
        revalidatePath('/rides');
        revalidatePath('/wall-of-fame');
      } catch (cacheErr) {
        console.warn('Cache revalidation warning:', cacheErr);
      }

      // Build confirmation text
      const confirmationText = formatUpdateConfirmation(dbResult.waypoint, dbResult.stats);
      await sendTelegramMessage(chatId, confirmationText);

      return NextResponse.json({
        ok: true,
        waypointId: dbResult.waypointId,
        stats: dbResult.stats,
      });
    }

    // Default response for unrecognized text
    await sendTelegramMessage(
      chatId,
      `❓ *Unrecognized command.*\n\n` +
      `Here are the commands you can send:\n` +
      `• \`/location Barstow, CA | Note here\` - Quick update\n` +
      `• \`/update\` - Full template with miles, driver & photo\n` +
      `• \`/status\` - View current website location & stats\n` +
      `• \`/help\` - Show full instructions`
    );

    return NextResponse.json({ ok: true, status: 'unrecognized_command' });
  } catch (error: any) {
    console.error('Unhandled error in Telegram webhook handler:', error);

    try {
      const message = (await request.json().catch(() => ({})))?.message;
      if (message?.chat?.id) {
        await sendTelegramMessage(
          message.chat.id,
          `⚠️ *Bot Error:* ${error?.message || 'Unknown error occurred while processing update.'}`
        );
      }
    } catch {}

    return NextResponse.json(
      { ok: false, error: error?.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'online',
    service: 'Trust The Thumb - Telegram Dispatcher',
    timestamp: new Date().toISOString(),
  });
}
