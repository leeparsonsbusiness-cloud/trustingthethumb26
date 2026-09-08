#!/usr/bin/env python3
import subprocess
import time

outreach_newcat_batch = [
    {
        "company": "Sun Bum",
        "emails": ["hey@sunbum.com"],
        "subject": "2,000 miles under the sun: Sun protection with Sun Bum (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

Standing on roadside ramps and walking miles in high desert heat require serious sun protection and lip balm. We’d love to feature Sun Bum as our official sun care partner.

In exchange, we’ll feature your sunscreen & lip balm organically in our daily highway logs, tag @sunbum across socials, and give you full commercial rights to high-res photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address for a sun care pack to fuel the launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    {
        "company": "Goodr Sunglasses",
        "emails": ["media@goodr.co"],
        "subject": "2,000 miles on foot: Testing Goodr sunglasses across America (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

Hours under the blazing desert sun mean non-slip polarized sunglasses are essential gear. We’d love to feature Goodr sunglasses as our official eyewear partner.

In exchange, we’ll feature your sunglasses organically in our daily highway videos, tag @goodr across socials, and give you full commercial rights to high-res photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address for two pairs of Goodrs to fuel the launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    {
        "company": "Shady Rays",
        "emails": ["marketing@shadyrays.com"],
        "subject": "2,000 miles on foot: Polarized sun protection with Shady Rays (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

Walking high-desert highways means glare reduction and active polarized lenses are critical. We’d love to feature Shady Rays as our official active eyewear partner.

In exchange, we’ll feature your sunglasses organically in our daily highway videos, tag @shadyrays across socials, and give you full commercial rights to high-res photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address for two pairs of Shady Rays to fuel the launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    {
        "company": "Rumpl",
        "emails": ["marketing@rumpl.com", "press@rumpl.com", "affiliate@rumpl.com"],
        "subject": "2,000 miles off-grid: Camping with Rumpl puffy blankets (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

Sleeping in truck beds, roadside fields, and chilly desert nights require compact, weatherproof insulation. We’d love to feature Rumpl puffy blankets as our official sleep & warmth partner.

In exchange, we’ll feature your blankets organically in our daily highway logs, tag @gorumpl across socials, and give you full commercial rights to high-res photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address for a puffy blanket to fuel the launch?

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

print("🚀 Starting New Categories Sponsor Email Dispatch...")
for item in outreach_newcat_batch:
    print(f"Sending tailored email to {item['company']}...")
    send_via_applescript(item['company'], item['emails'], item['subject'], item['body'])
    time.sleep(2)

print("\n🎉 New Categories Wave Complete!")
