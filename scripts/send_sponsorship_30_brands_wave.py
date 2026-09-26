#!/usr/bin/env python3
import subprocess
import time

expansion_30_batch = [
    # 1. Jetboil
    {
        "company": "Jetboil",
        "emails": ["info@jetboil.com", "info@darbycommunications.com"],
        "subject": "2,000 miles on foot: Compact highway cooking with Jetboil (LA ➔ Ohio)",
        "body": """Hi,

Starting October 1st, 2026, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as a live experiment testing real-world American kindness.

Boiling water for hot coffee and campsite dinners on roadside ramps requires fast, compact cooking systems like Jetboil. We’d love to feature Jetboil as our official highway cooking system partner.

In exchange, we’ll feature Jetboil organically in our daily highway vlogs, tag @jetboil across socials, and grant full commercial rights to photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address for a compact Jetboil stove system to fuel the launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    # 2. MSR Gear
    {
        "company": "MSR Gear (Mountain Safety Research)",
        "emails": ["cdi@verdepr.com", "consumer@cascadedesigns.com"],
        "subject": "2,000 miles on foot: Water filtration & stoves with MSR Gear (LA ➔ Ohio)",
        "body": """Hi,

Starting October 1st, 2026, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as a live experiment testing real-world American kindness.

Surviving desert stretches and backcountry highway stops requires reliable MSR water purifiers and compact camp gear. We’d love to feature MSR Gear as our official water filtration & safety partner.

In exchange, we’ll feature MSR gear organically in our daily episodes, tag @msr_gear across socials, and grant full commercial rights to high-res photo/video assets.

Could MSR provide a Trail Shot filter & ultralight stove kit for our cross-country trip?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    # 3. Hydro Flask
    {
        "company": "Hydro Flask",
        "emails": ["hydroflask@turnerpr.com", "info@hydroflask.com"],
        "subject": "2,000 miles on foot: Cold hydration with Hydro Flask (LA ➔ Ohio)",
        "body": """Hi,

Starting October 1st, 2026, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as a live experiment testing real-world American kindness.

Hours waiting in 90-degree heat on desert highway ramps mean vacuum-insulated Hydro Flask bottles are vital for keeping our water cold all day. We’d love to feature Hydro Flask as our official hydration flask partner.

In exchange, we’ll feature Hydro Flask bottles organically in our daily vlogs, tag @hydroflask across socials, and grant full commercial rights to photo/video assets shot across 2,000 miles of heartland America.

Can we send over our shipping address for a pair of Hydro Flask bottles to fuel the launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    # 4. Stanley 1913
    {
        "company": "Stanley 1913",
        "emails": ["Press@stanley1913.com"],
        "subject": "2,000 miles on foot: Highway hydration & camp coffee with Stanley (LA ➔ Ohio)",
        "body": """Hi,

Starting October 1st, 2026, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as a live experiment testing real-world American kindness.

Rugged, ice-cold drinkware and hot camp coffee thermos gear are central to our daily highway routine. We’d love to feature Stanley 1913 as our official highway drinkware partner.

In exchange, we’ll feature Stanley gear organically in our daily vlogs, tag @stanley_brand across socials, and grant full commercial rights to photo/video assets shot along our 2,000-mile journey.

Could Stanley provide a pair of rugged tumblers/thermoses to fuel our launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    # 5. CamelBak
    {
        "company": "CamelBak",
        "emails": ["massimo@outsidepr.com", "customercare@camelbak.com"],
        "subject": "2,000 miles on foot: Hands-free hydration with CamelBak (LA ➔ Ohio)",
        "body": """Hi,

Starting October 1st, 2026, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as a live experiment testing real-world American kindness.

Walking 15 miles a day on highway shoulders carrying heavy camera gear makes CamelBak hydration reservoirs essential for instant, hands-free water access. We’d love to feature CamelBak as our official hydration reservoir partner.

In exchange, we’ll feature CamelBak gear organically in our daily vlogs, tag @camelbak across socials, and grant full commercial rights to photo/video assets.

Can we send over our shipping address for a pair of hydration bladders to fuel the launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    # 6. Petzl
    {
        "company": "Petzl",
        "emails": ["info@petzl.com", "usa@petzl.com"],
        "subject": "2,000 miles on foot: Night headlamps & safety lighting with Petzl (LA ➔ Ohio)",
        "body": """Hi,

Starting October 1st, 2026, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as a live experiment testing real-world American kindness.

Hitchhiking into dusk and setting up camp in pitch-black desert spots require ultra-reliable Petzl headlamps for hands-free lighting and visibility. We’d love to feature Petzl as our official headlamp & safety lighting partner.

In exchange, we’ll feature Petzl headlamps organically in our night vlogs, tag @petzl_official across socials, and grant full commercial rights to photo/video assets.

Could Petzl provide a pair of rechargeable headlamps to fuel our trip?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    # 7. Black Diamond Equipment
    {
        "company": "Black Diamond Equipment",
        "emails": ["corporate@bdel.com", "info@bdel.com"],
        "subject": "2,000 miles on foot: Mountain gear & headlamps with Black Diamond (LA ➔ Ohio)",
        "body": """Hi,

Starting October 1st, 2026, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as a live experiment testing real-world American kindness.

Trekking across high elevation passes and highway exits requires rugged headlamps, trekking poles, and weather-resistant gear. We’d love to feature Black Diamond as our official mountain gear partner.

In exchange, we’ll feature Black Diamond gear organically in our daily episodes, tag @blackdiamond across socials, and grant full commercial rights to photo/video assets.

Can we send over our shipping address for headlamps & trekking poles to fuel the launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    # 8. Olight
    {
        "company": "Olight",
        "emails": ["cs@olightstore.com", "marketing@olightstore.com"],
        "subject": "2,000 miles on foot: High-lumen tactical flashlights with Olight (LA ➔ Ohio)",
        "body": """Hi,

Starting October 1st, 2026, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as a live experiment testing real-world American kindness.

Navigating unlit highway ramps at night and signaling oncoming traffic requires high-lumen, rechargeable Olight EDC flashlights. We’d love to feature Olight as our official flashlight & signal lighting partner.

In exchange, we’ll feature Olight flashlights organically in our night vlogs, tag @olightworld across socials, and grant full commercial rights to photo/video assets.

Can we send over our shipping address for a pair of rechargeable EDC lights to fuel the launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    # 9. RØDE Microphones
    {
        "company": "RØDE Microphones",
        "emails": ["press@rode.com", "marketing@rode.com", "info@rode.com"],
        "subject": "2,000 miles on foot: Highway audio & wireless mics with RØDE (LA ➔ Ohio)",
        "body": """Hi,

Starting October 1st, 2026, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as a live experiment testing real-world American kindness.

Filming interview-style conversations with everyday drivers on windy highway exits requires crystal-clear wireless audio. We’d love to feature RØDE Wireless PRO lavalier mics as our official audio partner.

In exchange, we’ll feature RØDE mics organically in our daily highway videos, tag @rodemic across socials, and grant full commercial rights to high-res photo/video assets shot across 2,000 miles of American landscapes.

Can we set up a RØDE Wireless mic kit to fuel our documentary production?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    # 10. Hollyland Technology
    {
        "company": "Hollyland Technology",
        "emails": ["pr-001@hollyland.com", "marketing@hollyland.com"],
        "subject": "2,000 miles on foot: Compact wireless audio with Hollyland (LA ➔ Ohio)",
        "body": """Hi,

Starting October 1st, 2026, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as a live experiment testing real-world American kindness.

Capturing dialogue inside moving trucks and on noisy highway ramps requires compact wireless microphones like the Hollyland Lark Max. We’d love to feature Hollyland as our official wireless audio partner.

In exchange, we’ll feature Hollyland mics organically in our daily vlogs, tag @hollylandtech across socials, and grant full commercial rights to photo/video assets.

Can we send over our shipping address for a Lark Max wireless audio kit?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    # 11. Shure
    {
        "company": "Shure",
        "emails": ["pr@shure.com", "info@shure.com"],
        "subject": "2,000 miles on foot: Broadcast audio quality with Shure (LA ➔ Ohio)",
        "body": """Hi,

Starting October 1st, 2026, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as a live experiment testing real-world American kindness.

Recording high-quality voiceovers and roadside interviews on dusty highways requires legendary Shure mobile microphones. We’d love to feature Shure as our official audio capture partner.

In exchange, we’ll feature Shure mics organically in our daily vlogs, tag @shure across socials, and grant full commercial rights to photo/video assets.

Could Shure provide a MV7+ or MoveMic wireless kit to fuel our audio production?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    # 12. Columbia Sportswear
    {
        "company": "Columbia Sportswear",
        "emails": ["publicrelations@columbia.com", "mglynn@columbia.com"],
        "subject": "2,000 miles on foot: All-weather outerwear with Columbia Sportswear (LA ➔ Ohio)",
        "body": """Hi,

Starting October 1st, 2026, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as a live experiment testing real-world American kindness.

Facing desert heat, mountain winds, and sudden downpours requires durable Omni-Tech rain jackets and sun hoodies. We’d love to feature Columbia Sportswear as our official outerwear partner.

In exchange, we’ll feature Columbia apparel organically in our daily highway vlogs, tag @columbia1938 across socials, and grant full commercial rights to photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address for rain shells & sun hoodies to fuel the launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    # 13. Patagonia
    {
        "company": "Patagonia",
        "emails": ["pr@patagonia.com", "customer.service@patagonia.com"],
        "subject": "2,000 miles on foot: Sustainable trail apparel with Patagonia (LA ➔ Ohio)",
        "body": """Hi,

Starting October 1st, 2026, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as a live experiment testing real-world American kindness.

Hitchhiking across America's heartland with zero environmental footprint aligns deeply with Patagonia's mission. We’d love to feature Patagonia as our official sustainable apparel partner.

In exchange, we’ll feature Patagonia fleeces & jackets organically in our daily episodes, tag @patagonia across socials, and grant full commercial rights to photo/video assets.

Could Patagonia support our trip with a pair of lightweight fleece layers & rain shells?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    # 14. Outdoor Research
    {
        "company": "Outdoor Research",
        "emails": ["info@outdoorresearch.com", "media@outdoorresearch.com"],
        "subject": "2,000 miles on foot: Technical sun & rain gear with Outdoor Research (LA ➔ Ohio)",
        "body": """Hi,

Starting October 1st, 2026, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as a live experiment testing real-world American kindness.

Enduring 14 days of harsh sun and highway rain requires technical sun hats, Ferrosi pants, and Helium rain jackets. We’d love to feature Outdoor Research as our official technical apparel partner.

In exchange, we’ll feature Outdoor Research apparel organically in our daily vlogs, tag @outdoorresearch across socials, and grant full commercial rights to photo/video assets.

Can we send over our shipping address for a sun hat & rain jacket kit?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    # 15. Arc'teryx
    {
        "company": "Arc'teryx",
        "emails": ["media@arcteryx.com", "info@arcteryx.com"],
        "subject": "2,000 miles on foot: Extreme weather shells with Arc'teryx (LA ➔ Ohio)",
        "body": """Hi,

Starting October 1st, 2026, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as a live experiment testing real-world American kindness.

Standing on exposed highway ramps through desert storms and mountain cold demands unmatched weather protection like Arc'teryx Beta jackets. We’d love to feature Arc'teryx as our official alpine protection partner.

In exchange, we’ll feature Arc'teryx gear organically in our daily episodes, tag @arcteryx across socials, and grant full commercial rights to high-res photo/video assets.

Can we explore a shell jacket sponsorship for our 2,000-mile cross-country trip?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    # 16. Buc-ee's
    {
        "company": "Buc-ee's",
        "emails": ["comments@buc-ees.com", "media@buc-ees.com"],
        "subject": "2,000 miles on foot: Highway stops & Beaver Nuggets with Buc-ee's (LA ➔ Ohio)",
        "body": """Hi Buc-ee's Team,

Starting October 1st, 2026, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as a live experiment testing real-world American kindness.

Stopping at Buc-ee's for fresh brisket, Beaver Nuggets, and cold drinks is the ultimate highway milestone for every American traveler. We’d love to feature Buc-ee's as our official highway rest stop partner.

In exchange, we’ll feature Buc-ee's organically in our viral daily highway vlogs, tag @bucees across socials, and grant full commercial rights to photo/video assets shot at Buc-ee's locations.

Could Buc-ee's provide travel gift cards or snack vouchers for our 2,000-mile trip?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    # 17. Waffle House
    {
        "company": "Waffle House",
        "emails": ["media@wafflehouse.com", "customer_service@wafflehouse.com"],
        "subject": "2,000 miles on foot: Late night highway meals at Waffle House (LA ➔ Ohio)",
        "body": """Hi Waffle House Team,

Starting October 1st, 2026, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as a live experiment testing real-world American kindness.

After 14-hour days on the road, walking into a 24/7 Waffle House for hot waffles and scattered-smothered-covered hashbrowns is the true heart of American hospitality. We’d love to feature Waffle House as our official roadside diner partner.

In exchange, we’ll feature Waffle House meals organically in our daily episodes, tag @wafflehouse across socials, and grant full commercial rights to photo/video assets.

Could Waffle House provide meal gift cards to fuel our late-night roadside stops?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    # 18. In-N-Out Burger
    {
        "company": "In-N-Out Burger",
        "emails": ["press@in-n-out.com", "customer_service@in-n-out.com"],
        "subject": "2,000 miles on foot: Launching from LA with In-N-Out Burger (LA ➔ Ohio)",
        "body": """Hi In-N-Out Team,

Starting October 1st, 2026, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re launching our journey directly from Santa Monica / Los Angeles, and starting our 2,000-mile trip with Double-Doubles is an absolute requirement for us. We’d love to feature In-N-Out as our official launch meal partner.

In exchange, we’ll feature In-N-Out organically in our launch day vlogs, tag @innout across socials, and grant full commercial rights to photo/video assets.

Could In-N-Out grant meal vouchers or gift cards for our trip launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    # 19. Culver's
    {
        "company": "Culver's",
        "emails": ["mediainquiries@culvers.com", "feedback@culvers.com"],
        "subject": "2,000 miles on foot: ButterBurgers & heartland stops with Culver's (LA ➔ Ohio)",
        "body": """Hi Culver's Team,

Starting October 1st, 2026, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as a live experiment testing real-world American kindness.

As we reach the Midwest and heartland corridors, stopping at Culver's for ButterBurgers and Fresh Frozen Custard is our favorite highlight. We’d love to feature Culver's as our official heartland dining partner.

In exchange, we’ll feature Culver's organically in our daily highway vlogs, tag @culvers across socials, and grant full commercial rights to photo/video assets.

Could Culver's support our trip with meal gift cards for our Midwest stops?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    # 20. Red Bull
    {
        "company": "Red Bull",
        "emails": ["media@redbull.com", "info@redbull.com"],
        "subject": "2,000 miles on foot: Giving wings to hitchhikers with Red Bull (LA ➔ Ohio)",
        "body": """Hi Red Bull Team,

Starting October 1st, 2026, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as a live experiment testing real-world American kindness.

Standing 12 hours a day on desert highway ramps demands high-energy focus. We’d love to feature Red Bull as our official energy fuel partner for the trip.

In exchange, we’ll feature Red Bull cans organically in our daily highway videos, tag @redbull across socials, and grant full commercial rights to photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address for a Red Bull energy pack to fuel our launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    # 21. Monster Energy
    {
        "company": "Monster Energy",
        "emails": ["media@monsterenergy.com", "info@monsterenergy.com"],
        "subject": "2,000 miles on foot: Highway energy with Monster Energy (LA ➔ Ohio)",
        "body": """Hi Monster Energy Team,

Starting October 1st, 2026, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as a live experiment testing real-world American kindness.

Long highway stands and late-night editing sessions mean maximum energy is everything for us. We’d love to feature Monster Energy as our official highway energy drink partner.

In exchange, we’ll feature Monster Energy cans organically in our daily vlogs, tag @monsterenergy across socials, and grant full commercial rights to photo/video assets.

Can we send over our shipping address for a case of Monster Energy to fuel the launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    # 22. Stok Cold Brew
    {
        "company": "Stok Cold Brew",
        "emails": ["media@danone.com"],
        "subject": "2,000 miles on foot: Highway cold brew fuel with Stok (LA ➔ Ohio)",
        "body": """Hi Stok Team,

Starting October 1st, 2026, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as a live experiment testing real-world American kindness.

Early morning highway starts in desert heat demand strong, smooth cold brew coffee. We’d love to feature Stok Cold Brew as our official morning coffee fuel partner.

In exchange, we’ll feature Stok organically in our daily morning highway vlogs, tag @stokcoldbrew across socials, and grant full commercial rights to photo/video assets.

Could Stok provide coffee vouchers or a launch pack for our cross-country trip?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    # 23. Clif Bar
    {
        "company": "Clif Bar",
        "emails": ["press@clifbar.com", "info@clifbar.com"],
        "subject": "2,000 miles on foot: Sustained energy with Clif Bar (LA ➔ Ohio)",
        "body": """Hi Clif Bar Team,

Starting October 1st, 2026, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as a live experiment testing real-world American kindness.

Walking miles between highway exits requires sustained carbohydrate energy. We’d love to feature Clif Bar as our official highway energy bar partner.

In exchange, we’ll feature Clif Bars organically in our daily highway vlogs, tag @clifbar across socials, and grant full commercial rights to photo/video assets shot across 2,000 miles of American landscapes.

Can we send over our shipping address for a box of Clif Bars to fuel our launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    # 24. RXBAR
    {
        "company": "RXBAR",
        "emails": ["info@rxbar.com", "media@rxbar.com"],
        "subject": "2,000 miles on foot: Real food protein with RXBAR (LA ➔ Ohio)",
        "body": """Hi RXBAR Team,

Starting October 1st, 2026, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as a live experiment testing real-world American kindness.

Simple, real-ingredient protein bars are vital for keeping us fueled without sugar crashes on long highway stands. We’d love to feature RXBAR as our official clean protein bar partner.

In exchange, we’ll feature RXBARs organically in our daily vlogs, tag @rxbar across socials, and grant full commercial rights to photo/video assets.

Can we send over our shipping address for a box of RXBARs to fuel the launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    # 25. SanDisk / Western Digital
    {
        "company": "SanDisk / Western Digital",
        "emails": ["press@wdc.com", "support@sandisk.com"],
        "subject": "2,000 miles on foot: Rugged 4K media backup with SanDisk (LA ➔ Ohio)",
        "body": """Hi SanDisk Team,

Starting October 1st, 2026, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts in full 4K video.

Shooting terabytes of 4K footage in rain, dust, and heat requires water/drop-resistant SanDisk Extreme Pro SSDs and SD cards. We’d love to feature SanDisk as our official rugged media storage partner.

In exchange, we’ll feature SanDisk drives organically in our daily editing vlogs, tag @sandisk across socials, and grant full commercial rights to photo/video assets.

Could SanDisk sponsor a 4TB Extreme Portable SSD & SD cards for our documentary production?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    # 26. Garmin (inReach)
    {
        "company": "Garmin (inReach)",
        "emails": ["media.relations@garmin.com", "press@garmin.com"],
        "subject": "2,000 miles on foot: Satellite safety & live tracking with Garmin inReach (LA ➔ Ohio)",
        "body": """Hi Garmin Team,

Starting October 1st, 2026, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as a live experiment testing real-world American kindness.

Hitchhiking through remote desert highway corridors means satellite SOS & real-time GPS tracking via Garmin inReach Mini 2 is our top safety priority. We’d love to feature Garmin as our official satellite tracking partner.

In exchange, we’ll embed your live satellite map widget on https://trustthethumb.com, feature Garmin inReach in our vlogs, tag @garminoutdoor across socials, and grant full commercial rights to photo/video assets.

Could Garmin sponsor an inReach Mini 2 unit & satellite subscription for our trip?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    # 27. Combat Wipes
    {
        "company": "Combat Wipes",
        "emails": ["info@combatwipes.com", "support@combatwipes.com"],
        "subject": "2,000 miles on foot: Outdoor trail hygiene with Combat Wipes (LA ➔ Ohio)",
        "body": """Hi Combat Wipes Team,

Starting October 1st, 2026, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as a live experiment testing real-world American kindness.

14 consecutive days waiting on dusty highway ramps and camping without running water make biodegradable Combat Wipes essential for staying clean. We’d love to feature Combat Wipes as our official outdoor hygiene partner.

In exchange, we’ll feature Combat Wipes organically in our daily vlogs, tag @combatwipes across socials, and grant full commercial rights to photo/video assets.

Can we send over our shipping address for a supply of outdoor wipes to fuel the launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    # 28. Dr. Squatch
    {
        "company": "Dr. Squatch",
        "emails": ["support@drsquatch.com", "communityfund@drsquatch.com"],
        "subject": "2,000 miles on foot: Natural soap for hitchhikers with Dr. Squatch (LA ➔ Ohio)",
        "body": """Hi Dr. Squatch Team,

Starting October 1st, 2026, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as a live experiment testing real-world American kindness.

Washing up at truck stops and campsite streams after long days on the road demands natural, manly soap. We’d love to feature Dr. Squatch as our official natural soap partner.

In exchange, we’ll feature Dr. Squatch soap bars organically in our daily vlogs, tag @drsquatch across socials, and grant full commercial rights to hilarious photo/video assets.

Can we send over our shipping address for a soap bar bundle to fuel the launch?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    # 29. Airalo (eSIM Data)
    {
        "company": "Airalo (eSIM Data)",
        "emails": ["affiliates@airalo.com", "partnerships@airalo.com"],
        "subject": "2,000 miles on foot: Highway cellular data & connectivity with Airalo (LA ➔ Ohio)",
        "body": """Hi Airalo Team,

Starting October 1st, 2026, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as a live experiment testing real-world American kindness.

Uploading daily 4K video vlogs and live streaming on highway shoulders requires uninterrupted mobile data connectivity. We’d love to feature Airalo as our official mobile data & connectivity partner.

In exchange, we’ll feature Airalo organically in our daily tech vlogs, tag @airalocom across socials, and grant full commercial rights to photo/video assets.

Could Airalo sponsor mobile data eSIM packages for our cross-country trip?

Best,

Lee & Jake Parsons
https://trustthethumb.com
leeparsonsbusiness@gmail.com | parsonsjacob30@gmail.com
Instagram: @theleeparsons"""
    },
    # 30. NordVPN
    {
        "company": "NordVPN",
        "emails": ["press@nordvpn.com", "affiliate@nordvpn.com"],
        "subject": "2,000 miles on foot: Truck stop Wi-Fi security with NordVPN (LA ➔ Ohio)",
        "body": """Hi NordVPN Team,

Starting October 1st, 2026, my brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio with only backpacks and thumbs out (https://trustthethumb.com).

We’re documenting the entire 14-day journey daily on TikTok, IG Reels, and YouTube Shorts as a live experiment testing real-world American kindness.

Editing and uploading daily video footage over public Wi-Fi networks at truck stops, diners, and gas stations requires high-speed VPN encryption. We’d love to feature NordVPN as our official digital security partner.

In exchange, we’ll feature NordVPN organically in our daily editing vlogs, tag @nordvpn across socials, and grant full commercial rights to photo/video assets.

Could NordVPN partner with us for our 2,000-mile cross-country journey?

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

print("🚀 Starting 30 Brand Expansion Wave Email Dispatch...")
for idx, item in enumerate(expansion_30_batch, 1):
    print(f"[{idx}/30] Sending tailored email to {item['company']}...")
    send_via_applescript(item['company'], item['emails'], item['subject'], item['body'])
    time.sleep(2)

print("\n🎉 30 Brand Expansion Wave Complete!")
