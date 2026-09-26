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
            
        print("2. Filling sequential Typeform fields...", flush=True)
        
        # Step 1: First Name
        fn = page.locator("input:visible").first
        await fn.fill("Lee")
        print("Filled First Name: Lee", flush=True)
        await fn.press("Enter")
        await page.wait_for_timeout(1500)
        
        # Step 2: Last Name
        ln = page.locator("input:visible").first
        await ln.fill("Parsons")
        print("Filled Last Name: Parsons", flush=True)
        await ln.press("Enter")
        await page.wait_for_timeout(1500)
        
        # Step 3: Email
        em = page.locator("input:visible").first
        await em.fill("leeparsonsbusiness@gmail.com")
        print("Filled Email: leeparsonsbusiness@gmail.com", flush=True)
        await em.press("Enter")
        await page.wait_for_timeout(1500)
        
        # Step 4: Continue / Next section
        await page.screenshot(path="scripts/peakdesign_after_email.png")
        text_after_email = await page.inner_text("body")
        print("\n--- Text after email ---\n", text_after_email.strip().replace('\n', ' ')[:600], flush=True)

        for s in range(4, 15):
            await page.wait_for_timeout(1500)
            curr_text = await page.inner_text("body")
            if "thank" in curr_text.lower() or "submitted" in curr_text.lower() or "received" in curr_text.lower():
                print("🎉 SUCCESS! Peak Design form submission complete!", flush=True)
                await page.screenshot(path="scripts/peakdesign_success.png", full_page=True)
                break
                
            inp = page.locator("input:visible, textarea:visible").first
            if await inp.is_visible():
                lower = curr_text.lower()
                fill_val = "My brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio starting October 1st (https://trustthethumb.com). Documenting the journey daily on TikTok, IG Reels, and YouTube Shorts as a live experiment testing real-world American kindness. Carrying 4K cameras on foot for 2,000 miles means quick-release Capture Clips and weatherproof camera bags are essential. We’d love to feature Peak Design as our official camera carry partner in exchange for organic daily video placement, social tags (@peakdesign), and full commercial rights to high-res photo/video assets."
                if "url" in lower or "website" in lower or "link" in lower or "project" in lower:
                    fill_val = "https://trustthethumb.com"
                elif "social" in lower or "instagram" in lower or "handle" in lower:
                    fill_val = "https://instagram.com/theleeparsons | https://tiktok.com/@Jake_thedrummer26"
                elif "address" in lower or "city" in lower or "location" in lower or "country" in lower:
                    fill_val = "Los Angeles, CA, United States"
                    
                print(f"Step {s}: Filling field with: {fill_val[:45]}...", flush=True)
                await inp.fill(fill_val)
                await page.wait_for_timeout(300)
                await inp.press("Enter")
            else:
                ok = page.locator("button:has-text('OK'), button:has-text('Continue'), button:has-text('Submit')").first
                if await ok.is_visible():
                    print(f"Step {s}: Clicking OK/Continue...", flush=True)
                    await ok.click(force=True)
                else:
                    print(f"Step {s}: Pressing Enter...", flush=True)
                    await page.keyboard.press("Enter")

if __name__ == "__main__":
    asyncio.run(main())
