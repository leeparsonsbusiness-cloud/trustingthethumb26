#!/usr/bin/env python3
import subprocess
import time

expansion_batch = [
    # 1. Country Archer Jerky
    {
        "company": "Country Archer Jerky",
        "emails": ["hi@archerjerky.com", "marketing@countryarcher.com", "press@archerjerky.com"],
        "subject": "2,000 miles on foot: Highway protein with Country Archer (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

Hours under the sun waiting on roadside ramps mean grass-fed beef jerky & meat sticks are essential fuel for keeping our energy steady. We’d love to feature Country Archer as our official highway snack fuel.

In exchange, we’ll feature your jerky organically in our daily highway videos, tag @countryarcher across socials, and give you full commercial rights to high-res photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address for a pack of Country Archer to fuel the launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    # 2. Tillamook Country Smoker
    {
        "company": "Tillamook Country Smoker",
        "emails": ["customercare@tcsjerky.com", "info@tcsjerky.com"],
        "subject": "2,000 miles on foot: Highway protein with Tillamook Country Smoker (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

Hours under the sun waiting on roadside ramps mean hardwood smoked beef jerky is essential fuel for keeping our energy up. We’d love to feature Tillamook Country Smoker as our official highway snack fuel.

In exchange, we’ll feature your jerky organically in our daily highway videos, tag @tcsjerky across socials, and give you full commercial rights to high-res photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address for a pack of jerky to fuel the launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    # 3. Celsius Energy
    {
        "company": "Celsius Energy",
        "emails": ["press@celsius.com", "ambassadors@celsius.com"],
        "subject": "2,000 miles on foot: Essential energy with Celsius (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

Hours on our feet and long highway stands mean essential active energy is everything for us. We’d love to feature Celsius as our official energy fuel for the trip.

In exchange, we’ll feature your cans organically in our daily highway videos, tag @celsiusofficial across socials, and give you full commercial rights to high-res photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address for a pack of Celsius to fuel the launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    # 4. EPIC Provisions
    {
        "company": "EPIC Provisions",
        "emails": ["info@epicbar.com"],
        "subject": "2,000 miles on foot: Real food protein with EPIC Provisions (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

Walking miles on highway ramps means real-food venison & bison protein bars are essential for keeping our recovery going. We’d love to feature EPIC Provisions as our official protein bar partner.

In exchange, we’ll feature your bars organically in our daily highway videos, tag @epicbar across socials, and give you full commercial rights to high-res photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address for a box of EPIC bars to fuel the launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    # 5. ONE Bar
    {
        "company": "ONE Bar",
        "emails": ["support@one1brand.com"],
        "subject": "2,000 miles on foot: Highway protein with ONE Bar (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

Walking miles under the desert sun means 20g protein low-sugar bars are essential fuel for keeping our energy steady. We’d love to feature ONE Bars as our official protein bar fuel.

In exchange, we’ll feature your bars organically in our daily highway videos, tag @one1brand across socials, and give you full commercial rights to high-res photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address for a box of ONE Bars to fuel the launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    # 6. Vasque Footwear
    {
        "company": "Vasque Footwear",
        "emails": ["customerservice@vasque.com"],
        "subject": "2,000 miles on foot: Field testing Vasque hiking boots (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

Putting 2,000 highway miles on foot across desert heat, concrete truck stops, and rain requires technical hiking boot durability. We’d love to feature Vasque boots as our official footwear partner.

In exchange, we’ll feature your boots organically in our daily highway videos, tag @vasquefootwear across socials, and give you full commercial rights to high-res photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address and boot sizes for a pair of Vasque boots to fuel the launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    # 7. LOWA Boots
    {
        "company": "LOWA Boots",
        "emails": ["info@lowaboots.com"],
        "subject": "2,000 miles on foot: Testing LOWA boots across America (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

Carrying heavy packs and standing on roadside ramps require handcrafted outdoor boot stability. We’d love to put LOWA hiking boots through a 2,000-mile real-world highway test.

In exchange, we’ll feature your boots organically in our daily highway videos, tag @lowaboots across socials, and give you full commercial rights to high-res photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address and boot sizes for a pair of LOWAs to fuel the launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    # 8. Hyperlite Mountain Gear
    {
        "company": "Hyperlite Mountain Gear",
        "emails": ["support@hyperlitemountaingear.com"],
        "subject": "2,000 miles on foot: Ultralight backpacking with Hyperlite (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

Carrying all our gear and 4K cameras on foot for 2,000 miles requires ultralight waterproof Dyneema backpacks. We’d love to feature Hyperlite Mountain Gear as our official backpack partner.

In exchange, we’ll feature your packs organically in our daily highway videos, tag @hyperlite_mountain_gear across socials, and give you full commercial rights to high-res photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address for two packs to fuel the launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    # 9. Big Agnes
    {
        "company": "Big Agnes",
        "emails": ["info@bigagnes.com"],
        "subject": "2,000 miles off-grid: Camping with Big Agnes tents (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

With zero hotel reservations, sleeping on roadside fields and truck stops requires ultralight tents and sleeping pads. We’d love to feature Big Agnes as our official shelter and sleep partner.

In exchange, we’ll feature your tents organically in our daily highway videos, tag @bigagnes across socials, and give you full commercial rights to high-res photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address for an ultralight tent kit to fuel the launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    # 10. SmallRig
    {
        "company": "SmallRig",
        "emails": ["marketing@smallrig.com"],
        "subject": "2,000 miles on foot: Rigging our 4K cameras with SmallRig (LA ➔ Ohio)",
        "body": """Hi,

Starting September 8th, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks, 4K cameras, and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as we test real-world American kindness.

Filming on foot and mounting cameras on guardrails and truck beds require rugged camera cages, phone rigs, and mounts. We’d love to feature SmallRig as our official camera rigging partner.

In exchange, we’ll feature your rigs organically in our daily highway videos, tag @smallrig.global across socials, and give you full commercial rights to high-res photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address for a camera cage & rigging kit to fuel the launch?

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

print("🚀 Starting Expansion Wave Sponsor Email Dispatch...")
for item in expansion_batch:
    print(f"Sending tailored email to {item['company']}...")
    send_via_applescript(item['company'], item['emails'], item['subject'], item['body'])
    time.sleep(2)

print("\n🎉 Expansion Wave Complete!")
