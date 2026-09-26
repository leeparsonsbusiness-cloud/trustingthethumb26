#!/usr/bin/env python3
import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(viewport={"width": 1280, "height": 900})
        page = await context.new_page()
        
        await page.goto("https://peakdesign.typeform.com/collab-sponsors", wait_until="networkidle")
        await page.wait_for_timeout(3000)
        
        start_btn = page.locator("button:has-text('Start'), button[data-qa*='start-button']").first
        if await start_btn.is_visible():
            await start_btn.click()
            await page.wait_for_timeout(2000)
            
        print("Filling First Name, Last Name, Email...")
        fn = page.locator("input[name*='first'], input[placeholder*='First']").first
        if await fn.is_visible():
            await fn.fill("Lee")
        
        # Press Tab
        await page.keyboard.press("Tab")
        await page.keyboard.type("Parsons")
        await page.keyboard.press("Tab")
        await page.keyboard.type("leeparsonsbusiness@gmail.com")
        await page.keyboard.press("Enter")
        await page.wait_for_timeout(2000)
        
        await page.screenshot(path="scripts/peakdesign_verify_step1.png")
        text = await page.inner_text("body")
        print("Verified text:\n", text[:800])

if __name__ == "__main__":
    asyncio.run(main())
