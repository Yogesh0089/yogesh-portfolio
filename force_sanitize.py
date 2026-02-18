import os

def sanitize_file(filepath):
    try:
        with open(filepath, 'rb') as f:
            content = f.read()
        
        # Remove null bytes
        sanitized = content.replace(b'\x00', b'')
        
        # If content changed, write it back as UTF-8
        if sanitized != content:
            # Try to decode what's left
            try:
                text = sanitized.decode('utf-8')
            except UnicodeDecodeError:
                # If it's still messy, try utf-16
                try:
                    text = content.decode('utf-16').encode('utf-8').decode('utf-8')
                except:
                    print(f"Failed to decode {filepath} even after null removal")
                    return

            with open(filepath, 'w', encoding='utf-8', newline='\n') as f:
                f.write(text)
            print(f"Sanitized: {filepath}")
    except Exception as e:
        print(f"Error processing {filepath}: {e}")

# Directories to search
targets = ['frontend', 'backend']
extensions = ['.py', '.tsx', '.ts', '.css', '.json']

for target in targets:
    if not os.path.exists(target): continue
    for root, dirs, files in os.walk(target):
        if 'node_modules' in dirs:
            dirs.remove('node_modules')
        if '.next' in dirs:
            dirs.remove('.next')
            
        for file in files:
            if any(file.endswith(ext) for ext in extensions):
                sanitize_file(os.path.join(root, file))

# Also root files
for file in os.listdir('.'):
    if os.path.isfile(file) and any(file.endswith(ext) for ext in extensions):
        sanitize_file(file)
