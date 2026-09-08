#!/usr/bin/env python3
import subprocess
import time

outreach_batch2 = [
    {
        "company": "YETI",
        "emails": ["media@yeti.com"],
        "subject": "2,000 miles on foot: Rugged hydration with YETI (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

Hours under the desert sun and long highway stands mean indestructible hydration gear is everything for us. We’d love to feature YETI Rambler bottles as our official hydration gear for the trip.

In exchange, we’ll feature your bottles organically in our daily highway videos, tag you across socials, and give you full commercial rights to high-res photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address for two Rambler bottles to fuel the launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    {
        "company": "Smartwool",
        "emails": ["customerservice@smartwool.com"],
        "subject": "2,000 miles, 0 booked rides: Testing Smartwool merino (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

Walking miles on concrete highway ramps in hot desert temperatures means merino wool performance is everything. We’d love to feature Smartwool socks & base layers through a 2,000-mile highway test.

In exchange, we’ll feature your gear organically in our daily highway videos, tag you across socials, and give you full commercial rights to high-res photo and video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address and sizes for a few pairs of socks to fuel the launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    {
        "company": "BioLite",
        "emails": ["support@bioliteenergy.com"],
        "subject": "2,000 miles off-grid: Charging our gear with BioLite (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks, 4K cameras, and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

Since we have zero hotel reservations and zero guaranteed outlets, solar panels and off-grid power banks are essential for our camera gear. We’d love to feature BioLite solar panels & power banks as our off-grid energy partner.

In exchange, we’ll feature your solar gear organically in our daily highway videos, tag you across socials, and give you full commercial rights to high-res photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address for a solar power kit to fuel the launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    {
        "company": "Jack Link's",
        "emails": ["media@jacklinks.com"],
        "subject": "2,000 miles on foot: Highway protein with Jack Link's (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

Hours waiting on roadside ramps mean fast, high-protein snacks are essential for keeping our energy up. We’d love to feature Jack Link's Beef Jerky as our official highway snack fuel.

In exchange, we’ll feature your jerky packs organically in our daily highway videos, tag you across socials, and give you full commercial rights to high-res photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address for a pack of jerky to fuel the launch?

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

print("🚀 Starting Batch 2 Sponsor Email Dispatch...")
for item in outreach_batch2:
    print(f"Sending tailored email to {item['company']}...")
    send_via_applescript(item['company'], item['emails'], item['subject'], item['body'])
    time.sleep(2)

print("\n🎉 Batch 2 Complete!")
