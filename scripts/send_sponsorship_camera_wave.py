#!/usr/bin/env python3
import subprocess
import time

outreach_camera_batch = [
    {
        "company": "Apple (iPhone PR)",
        "emails": ["media.help@apple.com"],
        "subject": "2,000 miles on foot: Filming our 4K docuseries on iPhone (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks, iPhone 4K video, and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

We are shooting the entire cross-country documentary on iPhone in 4K 60fps to capture authentic roadside stories. We’d love to feature iPhone 15 Pro Max as our official filming & video device.

In exchange, we’ll feature the phone organically in our daily highway logs, tag @apple across socials, and provide full commercial rights to 4K B-roll footage shot across 2,000 miles of American highways.

Can we send over our shipping address for a filming device to fuel the launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    {
        "company": "Sony Cameras (Sony Alpha)",
        "emails": ["marketinginquiries@sonyusa.com"],
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
        "company": "Canon USA",
        "emails": ["pr@cusa.canon.com"],
        "subject": "2,000 miles on foot: Shooting our 4K docuseries with Canon (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

We shoot everything in crisp 4K and need rugged video cameras that handle rain, dust, and highway truck beds. We’d love to feature Canon Cinema / EOS R cameras as our official filming gear.

In exchange, we’ll feature your cameras organically in our daily highway videos, tag @canonusa across socials, and give you full commercial rights to high-res photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address for a camera kit to fuel the launch?

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

print("dir Starting Camera & Smartphone Sponsor Email Dispatch...")
for item in outreach_camera_batch:
    print(f"Sending tailored email to {item['company']}...")
    send_via_applescript(item['company'], item['emails'], item['subject'], item['body'])
    time.sleep(2)

print("\n🎉 Camera & Smartphone Batch Complete!")
