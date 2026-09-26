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
            
        print("2. Stepping through questions...", flush=True)
        
        for step in range(1, 20):
            await page.wait_for_timeout(2000)
            text_content = await page.inner_text("body")
            
            if "thank" in text_content.lower() or "submitted" in text_content.lower() or "received" in text_content.lower() or "submit" in text_content.lower() and "success" in text_content.lower():
                print("🎉 SUCCESS! Peak Design form submission complete!", flush=True)
                await page.screenshot(path="scripts/peakdesign_success.png", full_page=True)
                break
                
            print(f"\n--- Step {step} ---")
            snippet = text_content.strip().replace('\n', '  ')
            print("Snippet:", snippet[:300], flush=True)
            await page.screenshot(path=f"scripts/peakdesign_step_{step}.png")
            
            # Find active focused element or visible inputs
            inputs = await page.query_selector_all("input:visible, textarea:visible")
            if inputs:
                # Find the currently active/focused input or last visible input
                inp = inputs[0]
                val = await inp.evaluate("el => el.value")
                
                lower_text = text_content.lower()
                fill_val = "Lee"
                if "first name" in lower_text:
                    fill_val = "Lee"
                elif "last name" in lower_text:
                    fill_val = "Parsons"
                elif "email" in lower_text:
                    fill_val = "leeparsonsbusiness@gmail.com"
                elif "website" in lower_text or "organization" in lower_text or "url" in lower_text or "link" in lower_text:
                    fill_val = "https://trustthethumb.com"
                elif "social" in lower_text or "instagram" in lower_text or "handle" in lower_text:
                    fill_val = "https://instagram.com/theleeparsons | https://tiktok.com/@Jake_thedrummer26"
                elif "address" in lower_text or "city" in lower_text or "country" in lower_text or "location" in lower_text:
                    fill_val = "Los Angeles, CA, United States"
                else:
                    fill_val = "My brother Jake and I are hitchhiking 2,000 miles from LA to Ohio starting Oct 1st (https://trustthethumb.com). Documenting the journey daily on socials. We'd love to feature Peak Design camera clips and bags as our official carry gear!"
                
                print(f"Filling: {fill_val[:40]}...", flush=True)
                await inp.fill(fill_val)
                await page.wait_for_timeout(500)
                
                # Click Continue button or press Enter
                continue_btn = page.locator("button:has-text('Continue'), button:has-text('OK'), button:has-text('Submit'), button[data-qa*='submit']").first
                if await continue_btn.is_visible():
                    print("Clicking Continue button...", flush=True)
                    await continue_btn.click()
                else:
                    print("Pressing Enter...", flush=True)
                    await page.keyboard.press("Enter")
            else:
                # Click any button like OK / Submit / Continue
                btn = page.locator("button:has-text('Continue'), button:has-text('OK'), button:has-text('Submit'), button[data-qa*='submit']").first
                if await btn.is_visible():
                    print("Clicking button...", flush=True)
                    await btn.click()
                else:
                    print("Pressing Enter...", flush=True)
                    await page.keyboard.press("Enter")

if __name__ == "__main__":
    asyncio.run(main())
