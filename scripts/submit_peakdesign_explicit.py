#!/usr/bin/env python3
import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(viewport={"width": 1280, "height": 900})
        page = await context.new_page()
        
        print("1. Loading Peak Design Typeform...", flush=True)
        await page.goto("https://peakdesign.typeform.com/collab-sponsors", wait_until="networkidle")
        await page.wait_for_timeout(4000)
        
        start_btn = page.locator("button:has-text('Start'), button[data-qa*='start-button']").first
        if await start_btn.is_visible():
            await start_btn.click()
            await page.wait_for_timeout(2000)
            
        print("2. Filling First Name, Last Name, Email...", flush=True)
        
        # Fill inputs cleanly in order
        inputs = await page.query_selector_all("input:visible, textarea:visible")
        print(f"Found {len(inputs)} visible inputs on step 1")
        if len(inputs) >= 1:
            await inputs[0].fill("Lee")
            print("Filled input 0: Lee", flush=True)
        if len(inputs) >= 2:
            await inputs[1].fill("Parsons")
            print("Filled input 1: Parsons", flush=True)
        if len(inputs) >= 3:
            await inputs[2].fill("leeparsonsbusiness@gmail.com")
            print("Filled input 2: leeparsonsbusiness@gmail.com", flush=True)
            
        # Click OK / Continue button on block 1
        btn = page.locator("button:has-text('OK'), button:has-text('Continue')").first
        if await btn.is_visible():
            await btn.click(force=True)
            await page.wait_for_timeout(3000)
            
        print("3. Stepping through remaining blocks...", flush=True)
        
        proposal_text = "My brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio starting October 1st (https://trustthethumb.com). Documenting the journey daily on TikTok, IG Reels, and YouTube Shorts as a live experiment testing real-world American kindness. Carrying 4K cameras on foot for 2,000 miles means quick-release Capture Clips and weatherproof camera bags are essential. We’d love to feature Peak Design as our official camera carry partner in exchange for organic daily video placement, social tags (@peakdesign), and full commercial rights to high-res photo/video assets."
        
        for step in range(1, 12):
            await page.wait_for_timeout(2000)
            text_content = await page.inner_text("body")
            
            if "thank" in text_content.lower() or "submitted" in text_content.lower() or "received" in text_content.lower():
                print("🎉 SUCCESS! Peak Design form submission complete!", flush=True)
                await page.screenshot(path="scripts/peakdesign_success.png", full_page=True)
                print("Final Page Text:\n", text_content[:1000], flush=True)
                break
                
            print(f"\n--- Block Step {step} ---", flush=True)
            print("Snippet:", text_content.strip().replace('\n', ' ')[:300], flush=True)
            
            # Find next empty input or textarea
            curr_inputs = await page.query_selector_all("input:visible, textarea:visible")
            for inp in curr_inputs:
                val = await inp.evaluate("el => el.value")
                if not val or val.strip() == "":
                    # Check text label
                    fill_val = proposal_text
                    ph = await inp.get_attribute("placeholder") or ""
                    if "url" in ph.lower() or "website" in text_content.lower() or "link" in text_content.lower():
                        fill_val = "https://trustthethumb.com"
                    elif "instagram" in text_content.lower() or "social" in text_content.lower() or "handle" in text_content.lower():
                        fill_val = "https://instagram.com/theleeparsons | https://tiktok.com/@Jake_thedrummer26"
                    elif "address" in text_content.lower() or "city" in text_content.lower() or "location" in text_content.lower():
                        fill_val = "Los Angeles, CA, United States"
                        
                    print(f"Filling input: {fill_val[:50]}...", flush=True)
                    await inp.fill(fill_val)
                    await page.wait_for_timeout(300)
                    
            next_btn = page.locator("button:has-text('OK'), button:has-text('Continue'), button:has-text('Submit')").first
            if await next_btn.is_visible():
                print("Clicking Next/OK/Submit button...", flush=True)
                await next_btn.click(force=True)
            else:
                await page.keyboard.press("Enter")

if __name__ == "__main__":
    asyncio.run(main())
