from playwright.sync_api import sync_playwright
import os

def verify_ui():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1280, "height": 800})
        page = context.new_page()

        print("Navigating to Terminal page...")
        page.goto("http://localhost:3000/terminal")

        # Take screenshot of the balance area in the header
        os.makedirs("verification", exist_ok=True)
        page.screenshot(path="verification/terminal_balance_update.png")
        print("Screenshot saved.")

        # Switch to Wallet tab to verify table balance
        print("Switching to Wallet tab...")
        page.get_by_role("button", name="Wallet").click()
        page.screenshot(path="verification/wallet_table_balance_update.png")
        print("Wallet table screenshot saved.")

        browser.close()

if __name__ == "__main__":
    import subprocess
    import time

    # Start dev server if not running
    try:
        subprocess.check_call(["lsof", "-i", ":3000"])
        print("Dev server already running.")
    except subprocess.CalledProcessError:
        print("Starting dev server...")
        subprocess.Popen(["bash", "-c", "cd sannis_module && __VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS=.com npm run dev -- --port 3000 --host 0.0.0.0 > /tmp/dev_server_verify.log 2>&1"], start_new_session=True)
        time.sleep(10)

    verify_ui()
