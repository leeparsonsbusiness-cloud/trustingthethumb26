#!/usr/bin/env python3
import subprocess
import time

outreach_electronics_batch = [
    {
        "company": "DJI",
        "emails": ["pr.us@dji.com", "KOL@influencer.dji.com", "marketing@dji.com"],
        "subject": "2,000 miles on foot: Filming our 4K docuseries with DJI Osmo & Drones (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks, 4K cameras, and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

Filming on foot and moving between vehicles requires compact stabilization and crisp audio. We’d love to feature the DJI Osmo Pocket 3, DJI Action 4, and DJI Mic 2 as our official mobile filming setup.

In exchange, we’ll feature your gear organically in our daily highway videos, tag @djiglobal across socials, and give you full commercial rights to high-res 4K photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address for a camera & mic kit to fuel the launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    {
        "company": "Insta360",
        "emails": ["marketing@insta360.com", "pr@insta360.com"],
        "subject": "2,000 miles on foot: 360-degree highway logs with Insta360 (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

Capturing truck rides, roadside stands, and unexpected highway moments requires 360-degree third-person perspective filming. We’d love to feature the Insta360 X4 & GO 3S as our action camera gear.

In exchange, we’ll feature your cameras organically in our daily highway videos, tag @insta360 across socials, and give you full commercial rights to high-res 360/4K photo and video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address for a camera kit to fuel the launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    {
        "company": "Peak Design",
        "emails": ["info@peakdesign.com"],
        "subject": "2,000 miles on foot: Field testing Peak Design camera gear (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks, 4K cameras, and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

Carrying 4K cameras on foot for 2,000 miles means quick-release Capture Clips and weatherproof camera bags are essential. We’d love to feature Peak Design as our official camera carry & clip partner.

In exchange, we’ll feature your clips and bags organically in our daily highway videos, tag @peakdesign across socials, and give you full commercial rights to high-res photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address for a clip & bag kit to fuel the launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    {
        "company": "JOBY",
        "emails": ["marketing@joby.com", "service@joby.com"],
        "subject": "2,000 miles on foot: Highway filming with JOBY GorillaPod (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks, 4K cameras, and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

Setting up fast camera shots on guardrails, truck beds, and highway shoulders requires flexible, rugged tripods. We’d love to feature JOBY GorillaPods as our mobile filming support setup.

In exchange, we’ll feature your tripods organically in our daily highway videos, tag @jobyinc across socials, and give you full commercial rights to high-res photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address for a GorillaPod kit to fuel the launch?

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

print("🚀 Starting Electronics & Video Tech Sponsor Email Dispatch...")
for item in outreach_electronics_batch:
    print(f"Sending tailored email to {item['company']}...")
    send_via_applescript(item['company'], item['emails'], item['subject'], item['body'])
    time.sleep(2)

print("\n🎉 Electronics Batch Complete!")
