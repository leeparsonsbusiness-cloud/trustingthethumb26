#!/usr/bin/env python3
import subprocess

applescript = '''
tell application "Mail"
    set inboxMessages to messages of inbox
    set maxCheck to 100
    if (count of inboxMessages) < maxCheck then set maxCheck to (count of inboxMessages)
    
    set outText to ""
    repeat with i from 1 to maxCheck
        set msg to item i of inboxMessages
        set msgSubj to subject of msg
        set msgSender to sender of msg
        set msgDate to (date received of msg) as text
        set msgRead to read status of msg
        
        if msgSubj contains "Re:" or msgSubj contains "Sponsor" or msgSubj contains "Partner" or msgSubj contains "Request" or msgSubj contains "Ticket" or msgSubj contains "Support" or msgSubj contains "Form" or msgSubj contains "miles" or msgSender contains "peak" or msgSender contains "dji" or msgSender contains "gopro" or msgSender contains "sony" or msgSender contains "canon" or msgSender contains "jackery" or msgSender contains "ecoflow" or msgSender contains "bluetti" or msgSender contains "nitecore" or msgSender contains "anker" or msgSender contains "biolite" or msgSender contains "goalzero" or msgSender contains "hoka" or msgSender contains "salomon" or msgSender contains "altra" or msgSender contains "cotopaxi" or msgSender contains "nemo" or msgSender contains "mystery" or msgSender contains "liquid" or msgSender contains "lmnt" or msgSender contains "yeti" or msgSender contains "chomps" or msgSender contains "beefcake" or msgSender contains "uber" or msgSender contains "lyft" or msgSender contains "koa" or msgSender contains "airbnb" or msgSender contains "hipcamp" or msgSender contains "hostelworld" then
            
            set bodyText to content of msg
            if (count of characters of bodyText) > 1000 then
                set bodyText to (text 1 thru 1000 of bodyText)
            end if
            
            set outText to outText & "----------------------------------------" & linefeed
            set outText to outText & "INDEX: " & i & linefeed
            set outText to outText & "FROM: " & msgSender & linefeed
            set outText to outText & "DATE: " & msgDate & linefeed
            set outText to outText & "SUBJECT: " & msgSubj & linefeed
            set outText to outText & "READ: " & msgRead & linefeed
            set outText to outText & "BODY:" & linefeed & bodyText & linefeed & linefeed
        end if
    end repeat
    return outText
end tell
'''

res = subprocess.run(["osascript", "-e", applescript], capture_output=True, text=True)
with open("scripts/sponsor_replies.txt", "w") as f:
    f.write(res.stdout)
print("Saved sponsor replies to scripts/sponsor_replies.txt!")
