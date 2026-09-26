#!/usr/bin/env python3
import subprocess

applescript = '''
tell application "Mail"
    set msg to item 26 of (messages of inbox)
    return content of msg
end tell
'''

res = subprocess.run(["osascript", "-e", '''
tell application "Mail"
    set msg to item 26 of (messages of inbox)
    return {subject of msg, sender of msg, content of msg}
end tell
'''], capture_output=True, text=True)

print(res.stdout)
