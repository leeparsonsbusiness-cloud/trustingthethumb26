#!/usr/bin/env python3
import subprocess
import time

outreach_batch = [
    {
        "company": "Liquid I.V.",
        "emails": ["info@liquid-iv.com", "press@liquid-iv.com"],
        "subject": "2,000 miles on foot: Hydrating with Liquid I.V. (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

Walking miles on hot highway ramps and desert heat means electrolyte hydration is everything for us. We’d love to feature Liquid I.V. as our official hydration fuel for the trip.

In exchange, we’ll feature your sticks & bottles organically in our daily highway videos, tag you across socials, and give you full commercial rights to high-res photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address for a pack of sticks to fuel the launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    {
        "company": "Darn Tough Vermont",
        "emails": ["support@darntough.com", "darntough@finnpartners.com"],
        "subject": "2,000 miles, 0 booked rides: Field testing Darn Tough (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

Putting 2,000 highway miles on our boots means sock durability is everything. We’d love to put Darn Tough socks through the ultimate real-world highway torture test.

In exchange, we’ll feature your socks organically in our daily videos, tag you across socials, and give you full commercial rights to high-res photo and video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address and shoe sizes for a few pairs to fuel the launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    {
        "company": "Anker Innovations",
        "emails": ["influencer@anker.com", "marketing@anker.com", "pr@anker.com"],
        "subject": "2,000 miles off-grid: Powering our 4K docuseries with Anker (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks, 4K cameras, and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

Since we have zero hotel reservations and zero guaranteed outlets, portable power banks and solar charging are everything for our gear. We’d love to feature Anker power banks & solar gear as our official power partner.

In exchange, we’ll feature your gear organically in our daily highway videos, tag you across socials, and give you full commercial rights to high-res photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address for a power kit to fuel the launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    {
        "company": "GoPro",
        "emails": ["pr@gopro.com"],
        "subject": "2,000 miles on foot: Shooting our 4K docuseries with GoPro (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

We shoot everything in raw 4K 60fps and need camera gear that can handle rain, dust, and highway truck beds. We’d love to feature GoPro as our official action camera partner for the trip.

In exchange, we’ll feature your cameras organically in our daily highway videos, tag you across socials, and give you full commercial rights to high-res 4K photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address for a gear kit to fuel the launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    {
        "company": "LMNT",
        "emails": ["hello@drinklmnt.com"],
        "subject": "2,000 miles on foot: Salty hydration with LMNT (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

Hours under the desert sun and long highway stands mean electrolyte replacement is everything for us. We’d love to feature LMNT as our official electrolyte fuel for the trip.

In exchange, we’ll feature your packets organically in our daily highway videos, tag you across socials, and give you full commercial rights to high-res photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address for a box of LMNT to fuel the launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    }
]

def send_via_applescript(company, emails, subject, body):
    recipient_applescript = "\n".join([
        f'        make new to recipient at end of to recipients with properties {{address:"{addr}"}}'
        for addr in emails
    ])
    
    # Escape quotes and backslashes for AppleScript
    clean_body = body.replace('\\', '\\\\').replace('"', '\\"')
    clean_subject = subject.replace('\\', '\\\\').replace('"', '\\"')
    
    script = f'''
tell application "Mail"
    set newMessage to make new outgoing message with properties {{subject:"{clean_subject}", content:"{clean_body}", visible:true}}
    tell newMessage
{recipient_applescript}
        send
    end tell
end tell
'''
    try:
        res = subprocess.run(["osascript", "-e", script], capture_output=True, text=True, check=True)
        print(f"✅ [SUCCESS] Sent email to {company} ({', '.join(emails)})")
        return True
    except Exception as e:
        print(f"❌ [ERROR] Failed to send email to {company}: {e}")
        return False

print("🚀 Starting Batch 1 Sponsor Email Dispatch...")
for item in outreach_batch:
    print(f"Sending tailored email to {item['company']}...")
    send_via_applescript(item['company'], item['emails'], item['subject'], item['body'])
    time.sleep(2)

print("\n🎉 Batch 1 Complete!")
