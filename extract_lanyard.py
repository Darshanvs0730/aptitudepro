import json

with open('/Users/darshan/.gemini/antigravity-ide/brain/c5167eec-c015-4a43-ba36-c16dc7b59651/.system_generated/logs/transcript_full.jsonl', 'r') as f:
    for line in f:
        data = json.loads(line)
        if data.get('type') == 'USER_INPUT' and 'Component: Lanyard' in data.get('content', ''):
            with open('lanyard_content.txt', 'w') as out:
                out.write(data['content'])
            print("Extracted to lanyard_content.txt")
            break
