#!/usr/bin/env python3
import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(viewport={"width": 1280, "height": 900})
        page = await context.new_page()
        
        await page.goto("https://liquidiv.grin.live/AffiliatePage", wait_until="networkidle")
        await page.wait_for_timeout(3000)
        
        email_input = page.locator("input[type='email'], input[placeholder*='email'], input[name='email']").first
        await email_input.fill("leeparsonsbusiness@gmail.com")
        
        checkbox_label = page.locator(".el-checkbox, label:has(input[type='checkbox'])").first
        await checkbox_label.click()
        await page.wait_for_timeout(1000)
        
        btn = page.locator("button:has-text('Get Started')").first
        await btn.click()
        await page.wait_for_timeout(6000)
        
        # Print all visible input fields, labels, selects, and textareas
        elements = await page.query_selector_all("input:visible, select:visible, textarea:visible, button:visible, div.el-form-item")
        print(f"Total elements found after Get Started: {len(elements)}")
        for el in elements:
            html = await el.evaluate("el => el.outerHTML")
            text = await el.inner_text()
            print("----------------------------------------")
            print("TEXT:", text.strip().replace('\n', ' '))
            print("HTML:", html[:250])

if __name__ == "__main__":
    asyncio.run(main())
