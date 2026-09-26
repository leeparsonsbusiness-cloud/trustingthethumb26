#!/usr/bin/env python3
import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(viewport={"width": 1280, "height": 900})
        page = await context.new_page()
        
        print("1. Loading Liquid I.V. application page...")
        await page.goto("https://liquidiv.grin.live/AffiliatePage", wait_until="networkidle")
        await page.wait_for_timeout(6000)
        
        await page.screenshot(path="scripts/liquidiv_step1.png", full_page=True)
        print("Saved screenshot: scripts/liquidiv_step1.png")
        
        # Check all frames and shadow roots or inputs
        frames = page.frames
        print(f"Found {len(frames)} frame(s)")
        
        # Print form inputs across all frames
        for idx, f in enumerate(frames):
            print(f"--- Frame {idx}: {f.url} ---")
            inputs = await f.query_selector_all("input, select, textarea, button, div[role='button']")
            for inp in inputs:
                name = await inp.get_attribute("name")
                id_attr = await inp.get_attribute("id")
                placeholder = await inp.get_attribute("placeholder")
                type_attr = await inp.get_attribute("type")
                tag = await inp.evaluate("el => el.tagName")
                text = await inp.inner_text()
                print(f"   Tag: {tag} | Name: {name} | ID: {id_attr} | Type: {type_attr} | Placeholder: {placeholder} | Text: {text.strip()[:40]}")

if __name__ == "__main__":
    asyncio.run(main())
