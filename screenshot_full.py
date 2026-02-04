import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Desktop
        await page.set_viewport_size({"width": 1280, "height": 720})
        await page.goto("http://localhost:3000/")
        await asyncio.sleep(2)
        await page.screenshot(path="homepage_full_desktop.png", full_page=True)

        # Mobile
        await page.set_viewport_size({"width": 375, "height": 667})
        await page.goto("http://localhost:3000/")
        await asyncio.sleep(2)
        await page.screenshot(path="homepage_full_mobile.png", full_page=True)

        await browser.close()

asyncio.run(run())
