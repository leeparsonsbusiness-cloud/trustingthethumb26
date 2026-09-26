#!/usr/bin/env python3
import subprocess

company = "NEMO Equipment"
emails = ["social@nemoequipment.com"]
subject = "2,000 miles on foot: Sponsorship Proposal with NEMO Equipment (LA ➔ Ohio) [Ref #224440]"
body = """Hi NEMO Team,

Following up on support ticket #224440, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out starting October 1st, 2026 (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as a live sociological experiment testing real-world American kindness.

Surviving 2,000 miles of highway ramps, desert wind, and sudden weather requires ultralight, durable shelter and sleep systems. We’d love to feature NEMO Equipment as our official tent & sleep system partner.

Project Website & Media Kit: https://trustthethumb.com
Social Channels:
• Instagram: https://instagram.com/theleeparsons | https://instagram.com/Jake_thedrummer26
• YouTube & TikTok: @Jake_thedrummer26

In exchange, we’ll feature NEMO gear organically in our daily highway vlogs, tag @nemoequipment across all platforms, and grant full commercial rights to high-res photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address for a 2-person ultralight tent & sleep system to fuel the launch?

Best regards,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com"""

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
except Exception as e:
    print(f"❌ [ERROR] Failed to send email to {company}: {e}")
