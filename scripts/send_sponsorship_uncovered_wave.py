#!/usr/bin/env python3
import subprocess
import time

uncovered_batch = [
    # 1. Love's Travel Stops
    {
        "company": "Love's Travel Stops",
        "emails": ["lauren.daniels@loves.com", "LovesMediaGroup@loves.com"],
        "subject": "2,000 miles on foot: Highway stop fuel & shower sponsorship with Love's (LA ➔ Ohio)",
        "body": """Hi,

Starting October 1st, 2026, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as a live sociological experiment testing real-world American kindness.

As we traverse Interstate 40, I-44, and I-70, Love's Travel Stops are our primary roadside lifeline for fresh water, hot meals, showers, and gear recharges between hitchhiking legs. We’d love to feature Love's as our official highway lifeline partner.

In exchange, we’ll feature Love's locations organically in our daily highway vlogs, tag @lovestravelstops across socials, and give you full commercial rights to high-res photo/video assets shot at Love's stops across 2,000 miles of American highways.

Could Love's provide travel gift cards or shower passes to support our cross-country trip?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    # 2. Pilot Flying J
    {
        "company": "Pilot Flying J",
        "emails": ["Media.Relations@pilottravelcenters.com"],
        "subject": "2,000 miles on foot: Highway rest & dining sponsorship with Pilot Flying J (LA ➔ Ohio)",
        "body": """Hi,

Starting October 1st, 2026, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as a live sociological experiment testing real-world American kindness.

Hours under the sun waiting on dangerous highway ramps make Pilot Flying J travel centers our essential stops for hot food, showers, and gear charging. We’d love to feature Pilot Flying J as our official highway rest partner.

In exchange, we’ll feature Pilot Flying J centers organically in our daily vlogs, tag @pilotflyingj across socials, and grant full commercial rights to photo/video assets shot along our 2,000-mile route.

Can we set up travel gift cards to fuel our meals and shower stops on the road?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    # 3. Dude Wipes
    {
        "company": "Dude Wipes",
        "emails": ["help@dudeproducts.com"],
        "subject": "2,000 miles on foot: Highway hygiene with Dude Wipes (LA ➔ Ohio)",
        "body": """Hi,

Starting October 1st, 2026, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

Spending 14 straight days on dusty highway ramps and roadside camps without guaranteed showers means DUDE Wipes are our single most important hygiene lifeline on the road. We’d love to feature DUDE Wipes as our official highway shower in a pack.

In exchange, we’ll feature DUDE Wipes organically in our hilarious daily highway vlogs, tag @dudewipes across socials, and grant full commercial rights to photo/video assets from our trip.

Can we send over our shipping address for a supply of DUDE Wipes to fuel the launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    # 4. Peak Refuel
    {
        "company": "Peak Refuel",
        "emails": ["info@peakrefuel.com"],
        "subject": "2,000 miles on foot: High-protein campsite meals with Peak Refuel (LA ➔ Ohio)",
        "body": """Hi,

Starting October 1st, 2026, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as a live experiment testing real-world American kindness.

After 12-hour days walking highway ramps, high-protein freeze-dried meals like Peak Refuel are essential for hot, real-meat dinners at our campsite every night. We’d love to feature Peak Refuel as our official trail dinner partner.

In exchange, we’ll feature your meals organically in our nightly campsite vlog scenes, tag @peakrefuel across socials, and grant full commercial rights to high-res photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address for a meal pack to fuel the launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    # 5. ZOLEO Satellite
    {
        "company": "ZOLEO Satellite",
        "emails": ["klayne@roadpost.com"],
        "subject": "2,000 miles on foot: Satellite safety & route tracking with ZOLEO (LA ➔ Ohio)",
        "body": """Hi,

Starting October 1st, 2026, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as a live experiment testing real-world American kindness.

Hitchhiking off-grid desert highways means reliable satellite messaging & SOS tracking are critical for safety and live map updates when cell service drops. We’d love to feature ZOLEO as our official satellite safety partner.

In exchange, we’ll feature ZOLEO organically in our daily episodes, tag @zoleolife across socials, and grant full commercial rights to photo/video assets shot along our 2,000-mile journey.

Could ZOLEO sponsor a satellite communicator unit & data plan for our cross-country trip?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    # 6. Lume Cube
    {
        "company": "Lume Cube",
        "emails": ["support@lumecube.com"],
        "subject": "2,000 miles on foot: Portable night filming lights with Lume Cube (LA ➔ Ohio)",
        "body": """Hi,

Starting October 1st, 2026, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as a live experiment testing real-world American kindness.

Filming on foot, at night on dark highway exits, and inside tents requires compact, ultra-rugged LED video lights. We’d love to feature Lume Cube as our official mobile lighting partner.

In exchange, we’ll feature Lume Cube lights organically in our night vlogs, tag @lumecube across socials, and grant full commercial rights to high-res photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address for a compact lighting kit to fuel the launch?

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

print("🚀 Starting Uncovered Opportunity Wave Email Dispatch...")
for item in uncovered_batch:
    print(f"Sending tailored email to {item['company']}...")
    send_via_applescript(item['company'], item['emails'], item['subject'], item['body'])
    time.sleep(2)

print("\n🎉 Uncovered Opportunity Wave Complete!")
