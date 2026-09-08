#!/usr/bin/env python3
import subprocess
import time

outreach_batch3 = [
    {
        "company": "Chomps",
        "emails": ["marketingteam@chomps.com", "team@chomps.com"],
        "subject": "2,000 miles on foot: Highway protein with Chomps (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

Hours under the sun on highway ramps mean clean, high-protein meat sticks are essential for keeping our energy up. We’d love to feature Chomps as our official highway snack fuel.

In exchange, we’ll feature your beef sticks organically in our daily highway videos, tag you across socials, and give you full commercial rights to high-res photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address for a box of Chomps to fuel the launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    {
        "company": "Merrell",
        "emails": ["megan.mccarl@wwwinc.com", "miranda.young@wwwinc.com"],
        "subject": "2,000 miles, 0 booked rides: Field testing Merrell trail boots (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

Putting 2,000 miles on foot across desert highways and concrete truck stops means boot comfort and durability are everything. We’d love to put Merrell footwear through the ultimate real-world highway torture test.

In exchange, we’ll feature your boots organically in our daily highway videos, tag you across socials, and give you full commercial rights to high-res photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address and shoe sizes for a pair of boots to fuel the launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    {
        "company": "Carhartt",
        "emails": ["spencer.stewart@zenogroup.com", "wes.richter@zenogroup.com"],
        "subject": "2,000 miles on foot: Testing Carhartt jackets on the highway (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

Sleeping in truck beds, roadside stands, and unpredictable weather require rugged durability. We’d love to feature Carhartt jackets & canvas gear as our official outerwear partner.

In exchange, we’ll feature your jackets organically in our daily highway videos, tag you across socials, and give you full commercial rights to high-res photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address and sizes for jackets to fuel the launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    {
        "company": "Goal Zero",
        "emails": ["pr@goalzero.com"],
        "subject": "2,000 miles off-grid: Charging our 4K cameras with Goal Zero (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks, 4K cameras, and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

With zero hotel reservations and zero guaranteed power outlets, Goal Zero solar chargers and power banks are essential for keeping our cameras running. We’d love to feature Goal Zero as our official solar energy partner.

In exchange, we’ll feature your gear organically in our daily highway videos, tag you across socials, and give you full commercial rights to high-res photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address for a solar power kit to fuel the launch?

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

print("🚀 Starting Batch 3 Sponsor Email Dispatch...")
for item in outreach_batch3:
    print(f"Sending tailored email to {item['company']}...")
    send_via_applescript(item['company'], item['emails'], item['subject'], item['body'])
    time.sleep(2)

print("\n🎉 Batch 3 Complete!")
