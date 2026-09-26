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
            
        print("2. Filling section 1: Name & Email...", flush=True)
        
        # Fill First Name, Last Name, Email
        inputs = await page.query_selector_all("input:visible")
        print(f"Found {len(inputs)} visible inputs on section 1")
        if len(inputs) >= 1:
            await inputs[0].fill("Lee")
            print("Filled First Name: Lee", flush=True)
        if len(inputs) >= 2:
            await inputs[1].fill("Parsons")
            print("Filled Last Name: Parsons", flush=True)
        if len(inputs) >= 3:
            await inputs[2].fill("leeparsonsbusiness@gmail.com")
            print("Filled Email: leeparsonsbusiness@gmail.com", flush=True)
            
        await page.screenshot(path="scripts/peakdesign_sec1_filled.png")
        
        # Press Tab and Enter to advance to Section 2
        print("Advancing to Section 2...", flush=True)
        await page.keyboard.press("Tab")
        await page.keyboard.press("Enter")
        await page.wait_for_timeout(3000)
        
        await page.screenshot(path="scripts/peakdesign_sec2_loaded.png", full_page=True)
        text2 = await page.inner_text("body")
        print("\n--- Section 2 Text Snippet ---")
        print(text2.strip().replace('\n', ' ')[:600], flush=True)

if __name__ == "__main__":
    asyncio.run(main())
