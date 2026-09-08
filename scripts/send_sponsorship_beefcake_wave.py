#!/usr/bin/env python3
import subprocess
import time

outreach_beefcake_batch = [
    {
        "company": "Beefcake Jerky",
        "emails": ["beefcakejerky@gmail.com", "support@beefcakejerky.com"],
        "subject": "2,000 miles on foot: Highway protein with Beefcake Jerky (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

Hours under the sun waiting on roadside ramps mean high-protein beef jerky is essential fuel for keeping our energy steady. We’d love to feature Beefcake Jerky as our official highway snack fuel.

In exchange, we’ll feature your jerky organically in our daily highway videos, tag Beefcake Jerky across socials, and give you full commercial rights to high-res photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address for a pack of Beefcake Jerky to fuel the launch?

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

print("🚀 Starting Beefcake Jerky Sponsor Email Dispatch...")
for item in outreach_beefcake_batch:
    print(f"Sending tailored email to {item['company']}...")
    send_via_applescript(item['company'], item['emails'], item['subject'], item['body'])
    time.sleep(2)

print("\n🎉 Beefcake Jerky Dispatch Complete!")
