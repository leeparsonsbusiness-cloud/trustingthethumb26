#!/usr/bin/env python3
import subprocess
import email
import quopri
import re

applescript = '''
tell application "Mail"
    set msg to item 26 of (messages of inbox)
    return source of msg
end tell
'''

res = subprocess.run(["osascript", "-e", applescript], capture_output=True, text=True)
decoded = quopri.decodestring(res.stdout).decode('utf-8', errors='ignore')

typeform_links = re.findall(r'https?://[^\s<>"]*typeform[^\s<>"]*', decoded)
print("Decoded Typeform Links:")
for link in typeform_links:
    print(link)
