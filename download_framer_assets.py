import os
import re
import requests
import time
from urllib.parse import urlparse

# Configuration
SOURCE_FILE = 'sannis_module_backup/index.html'
OUTPUT_DIR = 'framer_assets'
FONTS_DIR = os.path.join(OUTPUT_DIR, 'fonts')
IMAGES_DIR = os.path.join(OUTPUT_DIR, 'images')
DATA_DIR = os.path.join(OUTPUT_DIR, 'data')
CSS_FILE = os.path.join(OUTPUT_DIR, 'local_fonts.css')

# Ensure directories exist
for directory in [FONTS_DIR, IMAGES_DIR, DATA_DIR]:
    os.makedirs(directory, exist_ok=True)

def download_file(url, text_content=False):
    try:
        response = requests.get(url, stream=True)
        response.raise_for_status()
        
        parsed_url = urlparse(url)
        filename = os.path.basename(parsed_url.path)
        
        # Determine destination
        ext = os.path.splitext(filename)[1].lower()
        if ext in ['.woff2', '.woff', '.ttf', '.otf']:
            dest_dir = FONTS_DIR
        elif ext in ['.png', '.jpg', '.jpeg', '.svg', '.gif', '.webp']:
            dest_dir = IMAGES_DIR
        elif ext in ['.json']:
            dest_dir = DATA_DIR
        else:
            dest_dir = OUTPUT_DIR # Fallback
            
        filepath = os.path.join(dest_dir, filename)
        
        if os.path.exists(filepath):
            print(f"Skipping (already exists): {filename}")
            return filepath, True

        print(f"Downloading: {filename}")
        with open(filepath, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        
        return filepath, True
    except Exception as e:
        print(f"Failed to download {url}: {e}")
        return None, False

def main():
    if not os.path.exists(SOURCE_FILE):
        print(f"Error: Source file '{SOURCE_FILE}' not found.")
        return

    with open(SOURCE_FILE, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find all framerusercontent URLs
    # Pattern to capture full URL
    url_pattern = r'https://framerusercontent\.com/[a-zA-Z0-9/_.-]+'
    urls = set(re.findall(url_pattern, content))

    print(f"Found {len(urls)} unique Framer URLs.")

    url_map = {} # map old_url -> new_local_path

    success_count = 0
    for url in urls:
        # Removing quotes or closing parenthesis if they got captured (regex should be safe but just in case)
        clean_url = url.strip('"\'')
        print(f"Processing: {clean_url}")
        local_path, success = download_file(clean_url)
        if success:
            success_count += 1
            # Make path relative to where it will be used (e.g. from css file)
            # Assuming css file is in framer_assets/, we need paths like ./fonts/file.woff2
            # But wait, the user wants "dedicated files for reuse by this codebase"
            # If we import the css, paths should be correct relative to the css file.
            rel_path = os.path.relpath(local_path, OUTPUT_DIR)
            url_map[clean_url] = rel_path
        
        # Be nice to the server
        time.sleep(0.1)

    print(f"Downloaded {success_count} files.")

    # Generate local_fonts.css
    # We will extract the @font-face blocks and replace URLs
    # Simple strategy: Find all @font-face { ... } blocks in the original content?
    # Or just replace all found URLs in the collected CSS parts.
    
    # Let's extract the style blocks that contain font-face
    style_pattern = r'<style data-framer-font-css="">(.*?)</style>'
    font_styles = re.findall(style_pattern, content, re.DOTALL)
    
    if font_styles:
        print("Generating local_fonts.css...")
        full_css = ""
        for style_block in font_styles:
            # Replace URLs
            processed_block = style_block
            for url, rel_path in url_map.items():
                processed_block = processed_block.replace(url, rel_path)
            
            # Also replace google fonts if any? 
            # The prompt showed some fonts.gstatic.com URLs for 'Redacted' font.
            # We should probably handle those too if we want a complete offline setup.
            # But the request specifically said "open all the framerusercontent links".
            # I'll stick to framer links unless I see google links being critical.
            # The prompt example shows: src: url(https://fonts.gstatic.com/...)
            # I will assume only framer links for now as requested.
            
            full_css += processed_block + "\n"
        
        with open(CSS_FILE, 'w', encoding='utf-8') as f:
            f.write("/* Auto-generated local fonts */\n")
            f.write(full_css)
        print(f"Created {CSS_FILE}")
    else:
        print("No font styles found to process.")

if __name__ == "__main__":
    main()
