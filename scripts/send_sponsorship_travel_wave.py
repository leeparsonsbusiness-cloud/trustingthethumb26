#!/usr/bin/env python3
import subprocess
import time

travel_batch = [
    # 1. Uber
    {
        "company": "Uber",
        "emails": ["press@uber.com", "business-support@uber.com"],
        "subject": "2,000 miles on foot: Safety & emergency rides with Uber (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

When highway legs stall or safety requires getting off dangerous highway ramps at night, having Uber ride credits keeps our journey moving safely. We’d love to feature Uber as our official emergency transport connection partner.

In exchange, we’ll feature Uber organically in our daily highway videos, tag @uber across socials, and give you full commercial rights to high-res photo/video assets shot across 2,000 miles of American landscapes.

Can we set up travel ride credits or gift cards to support our emergency highway connections?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    # 2. Lyft
    {
        "company": "Lyft",
        "emails": ["press@lyft.com", "advertising@lyft.com"],
        "subject": "2,000 miles on foot: Highway connection rides with Lyft (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

Navigating long stretches between towns and dangerous highway exits requires reliable rideshare backup to stay safe and keep moving. We’d love to feature Lyft as our official safety ride partner.

In exchange, we’ll feature Lyft organically in our daily highway videos, tag @lyft across socials, and give you full commercial rights to high-res photo/video assets shot across 2,000 miles of American landscapes.

Can we set up ride credits to fuel our emergency travel connections on the road?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    # 3. KOA Kampgrounds
    {
        "company": "KOA Kampgrounds",
        "emails": ["newsroom@koa.net", "feedback@koa.net"],
        "subject": "2,000 miles on foot: Highway camping stays with KOA (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

After 12-hour days on the road along major interstate corridors like Route 66 and I-40, KOA Kampgrounds offer the safe haven we need to pitch our tent, charge camera gear, and shower. We’d love to feature KOA as our official highway campsite partner.

In exchange, we’ll feature KOA campgrounds organically in our daily vlog episodes, tag @koakampgrounds across socials, and give you full commercial rights to photo/video assets.

Could KOA provide campground stay vouchers or host passes along our route?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    # 4. Airbnb
    {
        "company": "Airbnb",
        "emails": ["contact.press@airbnb.com"],
        "subject": "2,000 miles on foot: Emergency stay sponsorship with Airbnb (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

During extreme weather or deep editing nights, having Airbnb stay credits allows us to connect with local hosts and recharge safely. We’d love to feature Airbnb as our official lodging partner.

In exchange, we’ll highlight our host experiences organically in daily episodes, tag @airbnb across socials, and provide full commercial rights to high-res photo/video assets from our trip.

Can we explore a coupon/stay credit grant to support our emergency lodging on the road?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    # 5. Hipcamp
    {
        "company": "Hipcamp",
        "emails": ["press@hipcamp.com", "support@hipcamp.com"],
        "subject": "2,000 miles on foot: Off-grid campsite stays with Hipcamp (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

Pitching camp on unique outdoor land across heartland America is central to our adventure. We’d love to feature Hipcamp as our official outdoor stay partner.

In exchange, we’ll showcase Hipcamp spots in our daily highway vlogs, tag @hipcamp across socials, and grant full commercial rights to high-res photo/video assets shot at campsites along our route.

Could Hipcamp grant booking credits or host connections for our 2,000-mile journey?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    # 6. Hostelworld
    {
        "company": "Hostelworld",
        "emails": ["corporate@hostelworld.com", "partnerships@hostelworld.com"],
        "subject": "2,000 miles on foot: Budget hostel stays with Hostelworld (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

Connecting with fellow travellers at budget hostels along our route is key to our journey's community focus. We’d love to feature Hostelworld as our official travel accommodation partner.

In exchange, we’ll feature Hostelworld stays in our daily vlogs, tag @hostelworld across socials, and provide full commercial rights to high-res photo/video assets.

Could Hostelworld provide booking credits or host accommodations for our cross-country trip?

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

print("🚀 Starting Rideshare & Camping Travel Wave Email Dispatch...")
for item in travel_batch:
    print(f"Sending tailored email to {item['company']}...")
    send_via_applescript(item['company'], item['emails'], item['subject'], item['body'])
    time.sleep(2)

print("\n🎉 Rideshare & Camping Travel Wave Complete!")
