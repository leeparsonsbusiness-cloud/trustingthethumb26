#!/usr/bin/env python3
import subprocess
import time

outreach_outdoor_batch = [
    {
        "company": "Cotopaxi",
        "emails": ["pr@cotopaxi.com", "llamas@cotopaxi.com"],
        "subject": "2,000 miles on foot: Testing Cotopaxi travel packs (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

Carrying all our gear across highway ramps and truck beds requires durable, vibrant travel packs. We’d love to feature Cotopaxi backpacks as our official travel gear partner.

In exchange, we’ll feature your packs organically in our daily highway videos, tag @cotopaxi across socials, and give you full commercial rights to high-res photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address for two packs to fuel the launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    {
        "company": "NEMO Equipment",
        "emails": ["kate@revolutionhousemedia.com", "affiliates@nemoequipment.com", "journey@nemoequipment.com"],
        "subject": "2,000 miles off-grid: Camping with NEMO Equipment (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

With zero hotel reservations, sleeping on roadside fields and truck stops means ultralight tents & sleeping pads are essential. We’d love to feature NEMO Equipment as our official shelter & sleep partner.

In exchange, we’ll feature your gear organically in our daily highway videos, tag @nemoequipment across socials, and give you full commercial rights to high-res photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address for a sleep kit to fuel the launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    {
        "company": "Mystery Ranch",
        "emails": ["erin@insideout-pr.com", "elisa@insideout-pr.com"],
        "subject": "2,000 miles on foot: Testing Mystery Ranch expedition packs (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

Carrying 2,000 miles worth of gear and 4K cameras on foot requires indestructible load-bearing pack architecture. We’d love to feature Mystery Ranch as our official backpack partner.

In exchange, we’ll feature your packs organically in our daily highway videos, tag @mysteryranch across socials, and give you full commercial rights to high-res photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address for two packs to fuel the launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    {
        "company": "Gregory Mountain Products",
        "emails": ["becca@verdepr.com"],
        "subject": "2,000 miles on foot: Testing Gregory trekking packs (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

Putting 2,000 miles on foot across concrete and desert heat requires ergonomic backpacking suspension. We’d love to feature Gregory packs as our official trekking pack partner.

In exchange, we’ll feature your packs organically in our daily highway videos, tag @gregorypacks across socials, and give you full commercial rights to high-res photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address for two packs to fuel the launch?

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

print("🚀 Starting Outdoor Gear & Backpacks Sponsor Email Dispatch...")
for item in outreach_outdoor_batch:
    print(f"Sending tailored email to {item['company']}...")
    send_via_applescript(item['company'], item['emails'], item['subject'], item['body'])
    time.sleep(2)

print("\n🎉 Outdoor Batch Complete!")
