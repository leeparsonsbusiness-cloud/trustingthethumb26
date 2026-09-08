#!/usr/bin/env python3
import subprocess
import time

outreach_protein_batch = [
    {
        "company": "Good Protein",
        "emails": ["info@goodprotein.ca", "wholesale@goodprotein.ca"],
        "subject": "2,000 miles on foot: Fueling with Good Protein (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

Hours of walking highway ramps mean clean, high-quality plant-based protein is essential for recovery. We’d love to feature Good Protein as our official protein fuel for the trip.

In exchange, we’ll feature your protein pouches organically in our daily highway videos, tag you across socials, and give you full commercial rights to high-res photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address for a pack of Good Protein to fuel the launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    {
        "company": "Barebells",
        "emails": ["marketing@barebells.com", "help@barebells.com"],
        "subject": "2,000 miles on foot: Highway fuel with Barebells (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

Long highway stands and constant walking mean high-protein, zero-added-sugar bars are essential for keeping our energy up. We’d love to feature Barebells as our official protein bar partner.

In exchange, we’ll feature your bars organically in our daily highway videos, tag you across socials, and give you full commercial rights to high-res photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address for a box of Barebells to fuel the launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    {
        "company": "Quest Nutrition",
        "emails": ["sales@quest-nutrition.com", "support@questnutrition.com"],
        "subject": "2,000 miles on foot: Fueling with Quest Protein (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

Walking miles under the sun means high-protein bars and snacks are essential for keeping our recovery going. We’d love to feature Quest Nutrition as our official protein snack partner.

In exchange, we’ll feature your bars organically in our daily highway videos, tag you across socials, and give you full commercial rights to high-res photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address for a pack of Quest bars to fuel the launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    {
        "company": "Aloha Protein",
        "emails": ["ALOHAPRTeam@greenheartcollective.com", "lani@greenheartcollective.com"],
        "subject": "2,000 miles on foot: Organic fuel with Aloha Protein (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

Hours on roadside ramps mean organic plant-based protein bars are essential for keeping our energy steady. We’d love to feature Aloha Protein bars as our organic fuel partner.

In exchange, we’ll feature your bars organically in our daily highway videos, tag you across socials, and give you full commercial rights to high-res photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address for a box of Aloha bars to fuel the launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    {
        "company": "Built Bar",
        "emails": ["marketing@built.com", "support@built.com"],
        "subject": "2,000 miles on foot: Highway protein with Built Bar (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

Walking miles across truck stops and highway ramps means lightweight, high-protein bars are essential fuel for us. We’d love to feature Built Bars as our official protein bar fuel.

In exchange, we’ll feature your bars organically in our daily highway videos, tag you across socials, and give you full commercial rights to high-res photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address for a box of Built Bars to fuel the launch?

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

print("🚀 Starting Protein Sponsor Email Dispatch...")
for item in outreach_protein_batch:
    print(f"Sending tailored email to {item['company']}...")
    send_via_applescript(item['company'], item['emails'], item['subject'], item['body'])
    time.sleep(2)

print("\n🎉 Protein Batch Complete!")
