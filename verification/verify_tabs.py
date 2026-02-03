from playwright.sync_api import sync_playwright
import time

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    page.goto("http://localhost:8000/sannis_module/newterminal.html")
    page.wait_for_load_state("networkidle")

    page.click("#tab-wallet")
    time.sleep(1)

    display = page.eval_on_selector("#wallet-view", "e => getComputedStyle(e).display")
    print(f"Display: {display}")

    visibility = page.eval_on_selector("#wallet-view", "e => getComputedStyle(e).visibility")
    print(f"Visibility: {visibility}")

    main_box = page.locator("#main-layout").bounding_box()
    print(f"Main layout box: {main_box}")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
