#!/usr/bin/env python3
import subprocess
import time

outreach_power_batch = [
    {
        "company": "Jackery",
        "emails": ["marketing@jackery.com", "partners@jackery.com", "hello@jackery.com"],
        "subject": "2,000 miles off-grid: Powering our 4K docuseries with Jackery (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks, 4K cameras, and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

With zero hotel reservations and zero guaranteed power outlets, Jackery portable solar generators & power stations are essential for keeping our 4K cameras running. We’d love to feature Jackery as our official solar power partner.

In exchange, we’ll feature your solar power stations organically in our daily highway videos, tag @jackeryusa across socials, and give you full commercial rights to high-res photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address for a solar power kit to fuel the launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    {
        "company": "EcoFlow",
        "emails": ["influencer@ecoflow.com", "contentpartners@ecoflow.com", "media.na@ecoflow.com"],
        "subject": "2,000 miles off-grid: Fast-charging our 4K cameras with EcoFlow (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks, 4K cameras, and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

Constant long highway stands mean fast-charging solar generators & power banks are critical for our gear. We’d love to feature EcoFlow as our official off-grid power partner.

In exchange, we’ll feature your solar generators organically in our daily highway videos, tag @ecoflowtech across socials, and give you full commercial rights to high-res photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address for a solar power generator kit to fuel the launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    {
        "company": "BLUETTI",
        "emails": ["marketing@bluetti.com", "kol@bluetti.com"],
        "subject": "2,000 miles off-grid: Powering our 4K docuseries with BLUETTI (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks, 4K cameras, and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

Sleeping in truck beds and roadside stands means reliable off-grid solar power is everything for our filming gear. We’d love to feature BLUETTI portable solar generators as our power partner.

In exchange, we’ll feature your power stations organically in our daily highway videos, tag @bluetti_official across socials, and give you full commercial rights to high-res photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address for a solar power station to fuel the launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    {
        "company": "Nitecore",
        "emails": ["info@nitecore.com", "support@nitecorestore.com"],
        "subject": "2,000 miles on foot: Testing Nitecore carbon power banks (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

Carrying heavy camera gear on foot means ultralight carbon fiber power banks and headlamps are essential. We’d love to feature Nitecore power banks & lights as our ultralight gear partner.

In exchange, we’ll feature your power banks organically in our daily highway videos, tag @nitecorestore across socials, and give you full commercial rights to high-res photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address for a power bank kit to fuel the launch?

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

print("🚀 Starting Portable Solar & Power Bank Sponsor Email Dispatch...")
for item in outreach_power_batch:
    print(f"Sending tailored email to {item['company']}...")
    send_via_applescript(item['company'], item['emails'], item['subject'], item['body'])
    time.sleep(2)

print("\n🎉 Power Batch Complete!")
