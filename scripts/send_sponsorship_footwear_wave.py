#!/usr/bin/env python3
import subprocess
import time

outreach_footwear_batch = [
    {
        "company": "HOKA",
        "emails": ["hoka@rygr.us", "miranda.young@hoka.com"],
        "subject": "2,000 miles on foot: Testing HOKA cushioning on the highway (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

Walking miles on concrete highway ramps and asphalt roadside stands means maximum cushioning and joint support are everything. We’d love to put HOKA trail footwear through a 2,000-mile highway torture test.

In exchange, we’ll feature your shoes organically in our daily highway videos, tag @hoka across socials, and give you full commercial rights to high-res photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address and shoe sizes for a pair of HOKAs to fuel the launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    {
        "company": "Salomon",
        "emails": ["communications@salomon.com"],
        "subject": "2,000 miles, 0 booked rides: Field testing Salomon trail boots (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

Putting 2,000 highway miles on foot across desert heat, dust, and rain requires technical trail durability. We’d love to feature Salomon hiking boots as our official footwear partner for the trip.

In exchange, we’ll feature your boots organically in our daily highway videos, tag @salomon across socials, and give you full commercial rights to high-res photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address and shoe sizes for a pair of boots to fuel the launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    {
        "company": "Altra Running",
        "emails": ["altra_customerservice@vfc.com"],
        "subject": "2,000 miles on foot: Testing Altra zero-drop footwear (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

Walking miles on roadside ramps means natural toe box comfort and zero-drop foot health are essential. We’d love to put Altra trail running shoes through a 2,000-mile real-world highway test.

In exchange, we’ll feature your shoes organically in our daily highway videos, tag @altrarunning across socials, and give you full commercial rights to high-res photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address and shoe sizes for a pair of Altras to fuel the launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    {
        "company": "Danner Boots",
        "emails": ["info@danner.com", "customerservice@danner.com"],
        "subject": "2,000 miles on foot: Testing Danner boots across America (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

Sleeping in truck beds, roadside stands, and unpredictable weather require rugged American boot craftsmanship. We’d love to feature Danner boots as our official footwear partner.

In exchange, we’ll feature your boots organically in our daily highway videos, tag @dannerboots across socials, and give you full commercial rights to high-res photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address and boot sizes for a pair of Danners to fuel the launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    {
        "company": "KEEN Footwear",
        "emails": ["marketing.us@keenfootwear.com", "info@keenfootwear.com"],
        "subject": "2,000 miles on foot: Field testing KEEN hiking boots (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

Hours on concrete highway ramps and desert heat require toe protection and rugged durability. We’d love to feature KEEN boots as our official outdoor footwear partner.

In exchange, we’ll feature your boots organically in our daily highway videos, tag @keenfootwear across socials, and give you full commercial rights to high-res photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address and shoe sizes for a pair of KEENs to fuel the launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    {
        "company": "Feetures Socks",
        "emails": ["hello@feetures.com"],
        "subject": "2,000 miles on foot: Testing Feetures socks across America (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

Putting 2,000 highway miles on foot means blister prevention and sock compression are everything. We’d love to feature Feetures socks through the ultimate real-world highway test.

In exchange, we’ll feature your socks organically in our daily highway videos, tag @feetures across socials, and give you full commercial rights to high-res photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address and sock sizes for a few pairs of Feetures to fuel the launch?

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

print("🚀 Starting Footwear & Socks Sponsor Email Dispatch...")
for item in outreach_footwear_batch:
    print(f"Sending tailored email to {item['company']}...")
    send_via_applescript(item['company'], item['emails'], item['subject'], item['body'])
    time.sleep(2)

print("\n🎉 Footwear & Socks Batch Complete!")
