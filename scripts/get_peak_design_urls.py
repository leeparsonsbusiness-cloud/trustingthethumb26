#!/usr/bin/env python3
import subprocess
import re

applescript = '''
tell application "Mail"
    set msg to item 26 of (messages of inbox)
    return source of msg
end tell
'''

res = subprocess.run(["osascript", "-e", applescript], capture_output=True, text=True)
urls = re.findall(r'https?://[^\s<>"\']+', res.stdout)
print("Found URLs in Peak Design Email:")
for url in set(urls):
    print("-", url)
