import os
from html.parser import HTMLParser

class ChunkingParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack = []
        # Wrapper tags that we are allowed to split inside of
        self.ignored_tags = {'html', 'body', 'head', 'div', 'style'}
        # Standard HTML void elements that don't need closing tags
        self.void_elements = {
            'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'
        }

    def handle_starttag(self, tag, attrs):
        if tag not in self.void_elements:
            self.stack.append(tag)

    def handle_endtag(self, tag):
        # Handle tags by popping from stack until we find the matching start tag
        # This handles cases where intermediate tags might be unclosed (malformed HTML)
        if tag in self.stack:
             while self.stack and self.stack[-1] != tag:
                 self.stack.pop()
             # Pop the tag itself
             if self.stack:
                 self.stack.pop()

    def handle_startendtag(self, tag, attrs):
        pass

    def is_safe_to_split(self):
        # Safe if stack is empty or contains only the ignored wrapper tags
        # This ensures we don't split inside a div, script, etc.
        return all(t in self.ignored_tags for t in self.stack)

def split_file(filepath, chunk_size=1000, output_dir="split_chunks"):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    print(f"Reading {filepath}...")
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    parser = ChunkingParser()
    
    current_chunk = []
    chunk_index = 1
    
    print(f"Total lines: {len(lines)}")
    
    for i, line in enumerate(lines):
        current_chunk.append(line)
        parser.feed(line)
        
        # Check if we should split
        # criteria: enough lines AND safe place to split
        if len(current_chunk) >= chunk_size:
            if parser.is_safe_to_split():
                filename = f"index_part_{chunk_index:03d}.html"
                path = os.path.join(output_dir, filename)
                with open(path, 'w', encoding='utf-8') as f_out:
                    f_out.writelines(current_chunk)
                
                print(f"Created {filename}: {len(current_chunk)} lines. (Line {i+1} of file)")
                
                current_chunk = []
                chunk_index += 1
            # else: keep accumulating lines until we close the tags
    
    # Write any remaining lines
    if current_chunk:
        filename = f"index_part_{chunk_index:03d}.html"
        path = os.path.join(output_dir, filename)
        with open(path, 'w', encoding='utf-8') as f_out:
            f_out.writelines(current_chunk)
        print(f"Created {filename}: {len(current_chunk)} lines. (End of file)")

if __name__ == "__main__":
    split_file("sannis_module_backup/index.html")
