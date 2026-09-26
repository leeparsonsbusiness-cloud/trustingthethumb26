#!/usr/bin/env python3
import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        
        print("Navigating to Liquid I.V. Affiliate Application Page...")
        await page.goto("https://liquidiv.grin.live/AffiliatePage", wait_until="networkidle")
        await page.wait_for_timeout(3000)
        
        # Take initial screenshot
        await page.screenshot(path="scripts/liquidiv_form_initial.png")
        print("Saved initial screenshot: scripts/liquidiv_form_initial.png")
        
        # Print page title and available inputs
        title = await page.title()
        print(f"Page Title: {title}")
        
        # Inspect inputs
        inputs = await page.query_selector_all("input, select, textarea, button")
        print(f"Total interactive elements found: {len(inputs)}")
        
        # Let's inspect text content of form fields
        body_text = await page.inner_text("body")
        print("Page text snippet:\n", body_text[:1000])

if __name__ == "__main__":
    asyncio.run(main())
