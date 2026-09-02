#!/usr/bin/env python3
"""
Trust The Thumb - Live Telegram Highway Bot
Run this bot on your laptop or server to update your live website map in real time directly from Telegram text messages!

Usage:
  python3 scripts/telegram_highway_bot.py --token YOUR_TELEGRAM_BOT_TOKEN
"""

import os
import sys
import json
import time
import subprocess
import urllib.request
import urllib.parse
from datetime import datetime

# Path to trackerConfig.json
PROJECT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONFIG_PATH = os.path.join(PROJECT_DIR, "data", "trackerConfig.json")

def load_config():
    with open(CONFIG_PATH, "r", encoding="utf-8") as f:
        return json.load(f)

def save_config(data):
    with open(CONFIG_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

def git_push_update(commit_message):
    try:
        subprocess.run(["git", "add", CONFIG_PATH], cwd=PROJECT_DIR, check=True)
        subprocess.run(["git", "commit", "-m", commit_message], cwd=PROJECT_DIR, check=True)
        subprocess.run(["git", "push", "origin", "main"], cwd=PROJECT_DIR, check=True)
        return True
    except Exception as e:
        print(f"Git push error: {e}")
        return False

def send_telegram_message(bot_token, chat_id, text):
    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    payload = json.dumps({
        "chat_id": chat_id,
        "text": text,
        "parse_mode": "HTML"
    }).encode("utf-8")
    req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"})
    try:
        urllib.request.urlopen(req)
    except Exception as e:
        print(f"Error sending Telegram message: {e}")

def get_updates(bot_token, offset=None):
    url = f"https://api.telegram.org/bot{bot_token}/getUpdates?timeout=30"
    if offset:
        url += f"&offset={offset}"
    try:
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            return data.get("result", [])
    except Exception as e:
        print(f"Error fetching updates: {e}")
        return []

def process_message(bot_token, msg):
    chat_id = msg["chat"]["id"]
    text = msg.get("text", "").strip()

    if not text:
        return

    print(f"Received command: {text} from chat_id: {chat_id}")

    if text.startswith("/start") or text.startswith("/help"):
        help_text = (
            "<b>👍 Trust The Thumb Telegram Highway Bot Active!</b>\n\n"
            "Text these commands from your phone to update your live website map:\n\n"
            "📍 <b>Update Location & Road Note:</b>\n"
            "<code>/location Barstow, CA | Caught a 115-mile ride with Dave in an F-150!</code>\n\n"
            "🚗 <b>Update Waypoint & Driver Story:</b>\n"
            "<code>/waypoint barstow | Dave | 1998 Ford F-150 | Cruised across High Desert.</code>\n\n"
            "📊 <b>Check Website Status:</b>\n"
            "<code>/status</code>"
        )
        send_telegram_message(bot_token, chat_id, help_text)

    elif text.startswith("/status"):
        cfg = load_config()
        status_msg = (
            f"<b>Current Website Status:</b>\n"
            f"📍 <b>City:</b> {cfg['liveStatus'].get('currentCity', 'N/A')}\n"
            f"📝 <b>Note:</b> {cfg['liveStatus'].get('currentNote', 'N/A')}\n"
            f"🚀 <b>Launch Date:</b> {cfg.get('launchDate', 'N/A')}\n"
            f"🌐 <b>Live URL:</b> https://trustthethumb.com"
        )
        send_telegram_message(bot_token, chat_id, status_msg)

    elif text.startswith("/location"):
        payload = text.replace("/location", "").strip()
        parts = [p.strip() for p in payload.split("|")]
        city = parts[0] if parts else ""
        note = parts[1] if len(parts) > 1 else ""

        if not city:
            send_telegram_message(bot_token, chat_id, "❌ Format error! Use: <code>/location Barstow, CA | Road note here</code>")
            return

        cfg = load_config()
        cfg["liveStatus"]["state"] = "active"
        cfg["liveStatus"]["currentCity"] = city
        if note:
            cfg["liveStatus"]["currentNote"] = note
        cfg["liveStatus"]["lastUpdated"] = datetime.utcnow().isoformat() + "Z"
        save_config(cfg)

        pushed = git_push_update(f"Live highway update from Telegram: {city}")
        status = "pushed live to https://trustthethumb.com! 🚀" if pushed else "saved locally (git push pending)."
        send_telegram_message(bot_token, chat_id, f"✅ <b>Location Updated!</b>\n📍 <b>City:</b> {city}\n📝 <b>Note:</b> {note or 'Updated'}\n\nUpdate {status}")

    elif text.startswith("/waypoint"):
        payload = text.replace("/waypoint", "").strip()
        parts = [p.strip() for p in payload.split("|")]
        wp_id = parts[0] if parts else ""
        driver_name = parts[1] if len(parts) > 1 else ""
        vehicle = parts[2] if len(parts) > 2 else ""
        story = parts[3] if len(parts) > 3 else ""

        if not wp_id:
            send_telegram_message(bot_token, chat_id, "❌ Format error! Use: <code>/waypoint barstow | Dave | Ford F-150 | Story snippet</code>")
            return

        cfg = load_config()
        found = False
        for wp in cfg.get("waypoints", []):
            if wp["id"].lower() == wp_id.lower():
                found = True
                wp["status"] = "current"
                if driver_name: wp["driverName"] = driver_name
                if vehicle: wp["rideVehicle"] = vehicle
                if story: wp["storySnippet"] = story
                cfg["liveStatus"]["currentCity"] = wp["name"]
                cfg["liveStatus"]["currentCoordinates"] = wp["coordinates"]
                break

        if found:
            save_config(cfg)
            pushed = git_push_update(f"Live waypoint update from Telegram: {wp_id}")
            status = "pushed live to https://trustthethumb.com! 🚀" if pushed else "saved locally."
            send_telegram_message(bot_token, chat_id, f"✅ <b>Waypoint '{wp_id.upper()}' Updated!</b>\n🚗 Driver: {driver_name or 'N/A'}\n\nUpdate {status}")
        else:
            send_telegram_message(bot_token, chat_id, f"❌ Waypoint ID '{wp_id}' not found. Valid IDs: la, barstow, flagstaff, albuquerque, amarillo, okc, stlouis, indianapolis, ohio")

def main():
    token = os.environ.get("TELEGRAM_BOT_TOKEN")
    if len(sys.argv) > 1 and sys.argv[1].startswith("re_") or "--token" in sys.argv:
        for i, arg in enumerate(sys.argv):
            if arg == "--token" and i + 1 < len(sys.argv):
                token = sys.argv[i+1]

    if not token:
        print("Usage: python3 scripts/telegram_highway_bot.py --token YOUR_TELEGRAM_BOT_TOKEN")
        print("Or export TELEGRAM_BOT_TOKEN in your environment.")
        return

    print("🤖 Trust The Thumb Telegram Bot Listening for Highway Messages...")
    offset = None

    while True:
        try:
            updates = get_updates(token, offset)
            for u in updates:
                offset = u["update_id"] + 1
                msg = u.get("message") or u.get("edited_message")
                if msg:
                    process_message(token, msg)
        except KeyboardInterrupt:
            print("\nBot stopped.")
            break
        except Exception as e:
            print(f"Polling loop error: {e}")
            time.sleep(5)

if __name__ == "__main__":
    main()
