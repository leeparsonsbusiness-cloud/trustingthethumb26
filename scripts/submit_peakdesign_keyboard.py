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
            
        print("2. Navigating through questions...", flush=True)
        
        answers = [
            "Lee", # First Name
            "Parsons", # Last Name
            "leeparsonsbusiness@gmail.com", # Email
            "https://trustthethumb.com", # Project / Organization / Website
            "https://instagram.com/theleeparsons", # Social handle
            "My brother Jake and I are hitchhiking 2,000 miles across America from Los Angeles to Ohio starting October 1st, 2026 (https://trustthethumb.com). Documenting the journey daily on TikTok, IG Reels, and YouTube Shorts as a live experiment testing real-world American kindness. Carrying 4K camera gear on foot means quick-release Capture Clips and weatherproof camera bags are essential. We’d love to feature Peak Design as our official camera carry partner in exchange for organic daily video placement, social tags (@peakdesign), and full commercial rights to high-res photo/video assets.", # Proposal
            "Los Angeles, CA, United States" # Location
        ]
        
        for idx, ans in enumerate(answers):
            await page.wait_for_timeout(1500)
            text_content = await page.inner_text("body")
            print(f"\n--- Question {idx + 1} ---", flush=True)
            print("Snippet:", text_content.strip().replace('\n', ' ')[:250], flush=True)
            
            # Find active focused element or visible input
            active_input = page.locator("input:visible, textarea:visible").first
            if await active_input.is_visible():
                await active_input.fill(ans)
                await page.wait_for_timeout(500)
                await page.keyboard.press("Enter")
                print(f"Submitted answer: {ans[:40]}...", flush=True)
            else:
                print("No input visible, pressing Enter...", flush=True)
                await page.keyboard.press("Enter")
                
            await page.screenshot(path=f"scripts/peakdesign_q{idx+1}.png")
            
        # Final submit press if button available
        await page.wait_for_timeout(2000)
        submit_btn = page.locator("button:has-text('Submit'), button[data-qa*='submit']").first
        if await submit_btn.is_visible():
            print("Clicking final Submit button...", flush=True)
            await submit_btn.click()
            await page.wait_for_timeout(4000)
            
        await page.screenshot(path="scripts/peakdesign_final.png", full_page=True)
        print("Saved final screenshot: scripts/peakdesign_final.png", flush=True)
        final_text = await page.inner_text("body")
        print("\n--- FINAL TYPEFORM SCREEN TEXT ---")
        print(final_text[:1000], flush=True)

if __name__ == "__main__":
    asyncio.run(main())
