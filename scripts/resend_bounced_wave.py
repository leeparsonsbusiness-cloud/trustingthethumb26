#!/usr/bin/env python3
import subprocess
import time

resend_batch = [
    {
        "company": "Sony Alpha (PRO Support)",
        "emails": ["joinprosupport@am.sony.com"],
        "subject": "2,000 miles on foot: Filming our 4K docuseries with Sony Alpha (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

As filmmakers, we shoot in raw 4K 60fps and need low-light performance for nighttime highway stands and truck stops. We’d love to feature Sony FX3 / A7IV cameras as our official cinema gear for the trip.

In exchange, we’ll feature your cameras organically in our daily highway videos, tag @sonyalpha across socials, and give you full commercial rights to high-res photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address for a camera kit to fuel the launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    {
        "company": "Chomps (Primary Team)",
        "emails": ["team@chomps.com"],
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
        print(f"✅ [SUCCESS] Re-sent email to {company} ({', '.join(emails)})")
        return True
    except Exception as e:
        print(f"❌ [ERROR] Failed to re-send email to {company}: {e}")
        return False

print("🚀 Starting Re-send of Bounced Brands...")
for item in resend_batch:
    print(f"Re-sending tailored email to {item['company']}...")
    send_via_applescript(item['company'], item['emails'], item['subject'], item['body'])
    time.sleep(2)

print("\n🎉 Re-send Complete!")
