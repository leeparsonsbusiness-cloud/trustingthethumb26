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
        await page.wait_for_timeout(5000)
        
        await page.screenshot(path="scripts/peakdesign_step1.png", full_page=True)
        print("Saved screenshot: scripts/peakdesign_step1.png", flush=True)
        
        body_text = await page.inner_text("body")
        print(f"Page text snippet:\n{body_text[:1200]}", flush=True)
        
        # Check start button or inputs
        start_btn = page.locator("button:has-text('Start'), button:has-text('Continue'), button[data-qa*='start-button']").first
        if await start_btn.is_visible():
            print("Found Start button, clicking...", flush=True)
            await start_btn.click()
            await page.wait_for_timeout(3000)
            await page.screenshot(path="scripts/peakdesign_step2.png", full_page=True)
            print("Saved screenshot: scripts/peakdesign_step2.png", flush=True)
            body_text2 = await page.inner_text("body")
            print(f"Step 2 Page text snippet:\n{body_text2[:1200]}", flush=True)

if __name__ == "__main__":
    asyncio.run(main())
