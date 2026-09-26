#!/usr/bin/env python3
import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(viewport={"width": 1280, "height": 1000})
        page = await context.new_page()
        
        print("1. Loading Liquid I.V. application page...", flush=True)
        await page.goto("https://liquidiv.grin.live/AffiliatePage", wait_until="networkidle")
        await page.wait_for_timeout(4000)
        
        print("2. Submitting Step 1 (Email & Agreement)...", flush=True)
        email_input = page.locator("input[name='email']").first
        await email_input.fill("leeparsonsbusiness@gmail.com")
        
        checkbox_label = page.locator(".el-checkbox, label:has(input[type='checkbox'])").first
        await checkbox_label.click()
        await page.wait_for_timeout(1000)
        
        get_started_btn = page.locator("button:has-text('Get Started')").first
        await get_started_btn.click()
        print("Clicked 'Get Started'!", flush=True)
        
        await page.wait_for_timeout(5000)
        
        print("3. Filling Step 2 details...", flush=True)
        # First Name
        fn_input = page.locator("input[name='given-name']").first
        if await fn_input.is_visible():
            await fn_input.fill("Lee")
            print("Filled First Name: Lee", flush=True)
            
        # Last Name
        ln_input = page.locator("input[name='family-name']").first
        if await ln_input.is_visible():
            await ln_input.fill("Parsons")
            print("Filled Last Name: Parsons", flush=True)
            
        # Address
        addr_input = page.locator("input[data-testid='address']").first
        if await addr_input.is_visible():
            await addr_input.fill("Los Angeles, CA")
            print("Filled Address: Los Angeles, CA", flush=True)
            
        # City
        city_input = page.locator("input[name='address-level2']").first
        if await city_input.is_visible():
            await city_input.fill("Los Angeles")
            print("Filled City: Los Angeles", flush=True)
            
        # Gender (Male)
        gender_radio = page.locator("input[value='Male'] + span, label:has-text('Male')").first
        if await gender_radio.is_visible():
            await gender_radio.click()
            print("Selected Gender: Male", flush=True)
            
        # Category (Travel)
        cat_radio = page.locator("input[value='Travel'] + span, label:has-text('Travel')").first
        if await cat_radio.is_visible():
            await cat_radio.click()
            print("Selected Category: Travel", flush=True)
            
        await page.screenshot(path="scripts/liquidiv_step2_filled.png", full_page=True)
        print("Saved screenshot: scripts/liquidiv_step2_filled.png", flush=True)
        
        # Click Save and Continue
        save_btn = page.locator("button:has-text('Save and Continue')").first
        if await save_btn.is_visible():
            print("Clicking 'Save and Continue'...", flush=True)
            await save_btn.click()
            await page.wait_for_timeout(6000)
            
        await page.screenshot(path="scripts/liquidiv_final_confirmation.png", full_page=True)
        print("Saved final screenshot: scripts/liquidiv_final_confirmation.png", flush=True)
        
        final_text = await page.inner_text("body")
        print("\n--- FINAL CONFIRMATION PAGE TEXT ---")
        print(final_text[:1200], flush=True)

if __name__ == "__main__":
    asyncio.run(main())
