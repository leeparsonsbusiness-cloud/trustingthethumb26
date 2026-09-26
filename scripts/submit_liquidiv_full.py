#!/usr/bin/env python3
import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(viewport={"width": 1280, "height": 900})
        page = await context.new_page()
        
        print("1. Loading Liquid I.V. application page...", flush=True)
        await page.goto("https://liquidiv.grin.live/AffiliatePage", wait_until="networkidle")
        await page.wait_for_timeout(4000)
        
        print("2. Filling Step 1: Email & Terms Checkbox...", flush=True)
        email_input = page.locator("input[type='email'], input[placeholder*='email'], input[name='email']").first
        await email_input.fill("leeparsonsbusiness@gmail.com")
        
        # Click label for checkbox
        checkbox_label = page.locator(".el-checkbox, label:has(input[type='checkbox'])").first
        await checkbox_label.click()
        
        await page.screenshot(path="scripts/liquidiv_step1_filled.png")
        print("Saved screenshot: scripts/liquidiv_step1_filled.png", flush=True)
        
        # Click Get Started button
        btn = page.locator("button:has-text('Get Started')").first
        await btn.click()
        print("Clicked 'Get Started'!", flush=True)
        
        await page.wait_for_timeout(6000)
        await page.screenshot(path="scripts/liquidiv_step2_loaded.png", full_page=True)
        print("Saved screenshot: scripts/liquidiv_step2_loaded.png", flush=True)
        
        body_text = await page.inner_text("body")
        print(f"Step 2 Page text snippet (first 1000 chars):\n{body_text[:1000]}", flush=True)

if __name__ == "__main__":
    asyncio.run(main())
