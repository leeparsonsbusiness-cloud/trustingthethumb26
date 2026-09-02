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
      // Return 200 for other update types (e.g. inline queries, poll answers)
      return NextResponse.json({ ok: true, ignored: true });
    }

    const chatId = message.chat.id;
    const senderId = message.from?.id;

    // 3. User Authorization Check
    const allowedUserIdStr = process.env.TELEGRAM_ALLOWED_USER_ID;
    if (allowedUserIdStr) {
      const allowedUserId = parseInt(allowedUserIdStr, 10);
      if (senderId !== allowedUserId) {
        console.warn(`Forbidden: Message from unauthorized user ID ${senderId} (Expected: ${allowedUserId})`);

        // Send a polite unauthorized notice to the sender
        await sendTelegramMessage(
          chatId,
          `⛔ *Access Denied*\nYour Telegram User ID (\`${senderId}\`) is not authorized to update Trust The Thumb.`
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

    // Check for commands
    if (command === '/start' || command === '/help' || command === 'help' || command === 'hello' || command === 'hi') {
      const helpText = formatHelpReply();
      await sendTelegramMessage(chatId, helpText);
      return NextResponse.json({ ok: true, command: 'help' });
    }

    if (command === '/stats' || command === 'stats') {
      const stats = getTripStats();
      const statsText = formatStatsReply(stats);
      await sendTelegramMessage(chatId, statsText);
      return NextResponse.json({ ok: true, command: 'stats' });
    }

    const isUpdateCommand =
      command === '/update' ||
      command === 'update' ||
      command === 'upd' ||
      trimmedContent.startsWith('/update') ||
      trimmedContent.startsWith('update') ||
      trimmedContent.startsWith('loc:') ||
      trimmedContent.startsWith('location:');

    if (isUpdateCommand) {
      // If the template is empty (e.g. user just tapped /update or typed upd without filling details)
      if (isUpdateTemplateEmpty(trimmedContent)) {
        await sendTelegramMessage(
          chatId,
          `✍️ *Ready to log a ride!*\n\nTap to copy the template below, fill in your details, and send:\n\n` +
          `\`\`\`\n` +
          `/update\n` +
          `loc: City, State\n` +
          `miles: 0\n` +
          `driver: Name | Vehicle\n` +
          `quote: Driver quote or road note\n` +
          `gifts: 0\n` +
          `\`\`\`\n\n` +
          `💡 _Tip: You can also attach a photo with this template in the caption!_`
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

      // Record to SQLite database and increment counters
      const result = insertWaypoint(parsedInput);

      // Invalidate Next.js cache for real-time site updates
      try {
        revalidatePath('/');
        revalidatePath('/rides');
        revalidatePath('/wall-of-fame');
      } catch (cacheErr) {
        console.warn('Cache revalidation warning:', cacheErr);
      }

      // Send confirmation message to Telegram
      const confirmationText = formatUpdateConfirmation(result.waypoint, result.stats);
      await sendTelegramMessage(chatId, confirmationText);

      return NextResponse.json({
        ok: true,
        waypointId: result.waypointId,
        stats: result.stats,
      });
    }

    // Default response for unrecognized text
    await sendTelegramMessage(
      chatId,
      `❓ Unrecognized command.\n\nType \`/help\` to see the formatting template or send \`/update\` to log a ride.`
    );

    return NextResponse.json({ ok: true, status: 'unrecognized_command' });
  } catch (error: any) {
    console.error('Unhandled error in Telegram webhook handler:', error);

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
