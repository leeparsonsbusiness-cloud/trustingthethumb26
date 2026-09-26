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
            
        print("2. Loop filling Peak Design Typeform fields...", flush=True)
        
        proposal_text = "My brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio starting October 1st (https://trustthethumb.com). Documenting the journey daily on TikTok, IG Reels, and YouTube Shorts as a live experiment testing real-world American kindness. Carrying 4K cameras on foot for 2,000 miles means quick-release Capture Clips and weatherproof camera bags are essential. We’d love to feature Peak Design as our official camera carry partner in exchange for organic daily video placement, social tags (@peakdesign), and full commercial rights to high-res photo/video assets."
        
        for iteration in range(1, 20):
            await page.wait_for_timeout(1500)
            text_content = await page.inner_text("body")
            
            if "thank" in text_content.lower() or "submitted" in text_content.lower() or "received" in text_content.lower() or "submission" in text_content.lower():
                print("🎉 SUCCESS! Peak Design form submission complete!", flush=True)
                await page.screenshot(path="scripts/peakdesign_success.png", full_page=True)
                print("Final Page Text:\n", text_content[:1000], flush=True)
                break
                
            print(f"\n--- Iteration {iteration} ---", flush=True)
            snippet = text_content.strip().replace('\n', ' ')
            print("Current Question Snippet:", snippet[:350], flush=True)
            
            # Find empty input field
            inputs = await page.query_selector_all("input:visible, textarea:visible")
            target_input = None
            for inp in inputs:
                val = await inp.evaluate("el => el.value")
                if not val or val.strip() == "":
                    target_input = inp
                    break
            
            if target_input:
                parent_text = await target_input.evaluate("el => el.closest('div[data-qa*=\"block\"]').innerText") if await target_input.evaluate("el => !!el.closest('div[data-qa*=\"block\"]')") else snippet
                parent_text = parent_text.lower()
                
                fill_val = proposal_text
                if "first name" in parent_text or "first" in parent_text:
                    fill_val = "Lee"
                elif "last name" in parent_text or "last" in parent_text:
                    fill_val = "Parsons"
                elif "email" in parent_text:
                    fill_val = "leeparsonsbusiness@gmail.com"
                elif "website" in parent_text or "url" in parent_text or "organization" in parent_text or "company" in parent_text:
                    fill_val = "https://trustthethumb.com"
                elif "social" in parent_text or "instagram" in parent_text or "handle" in parent_text:
                    fill_val = "https://instagram.com/theleeparsons | https://tiktok.com/@Jake_thedrummer26"
                elif "address" in parent_text or "city" in parent_text or "country" in parent_text or "location" in parent_text:
                    fill_val = "Los Angeles, CA, United States"
                
                print(f"Filling field with: {fill_val[:50]}...", flush=True)
                await target_input.fill(fill_val)
                await page.wait_for_timeout(300)
                await target_input.press("Tab")
                await page.keyboard.press("Enter")
                await page.wait_for_timeout(1000)
            else:
                ok_btn = page.locator("button:has-text('OK'), button:has-text('Submit'), button:has-text('Continue')").first
                if await ok_btn.is_visible():
                    print("Clicking OK/Submit/Continue button...", flush=True)
                    await ok_btn.click()
                else:
                    print("Pressing Enter...", flush=True)
                    await page.keyboard.press("Enter")

if __name__ == "__main__":
    asyncio.run(main())
