import urllib.request
import urllib.parse
import json
import sys
import time

# --- CONFIGURATION ---
BASE_URL = "http://localhost:8080/api"
USERNAME = "admin"
PASSWORD = "admin123"

# --- HIGH-TECH PLACEMENT LEVEL QUESTION BANK ---
# These are strictly designed to match the difficulty of top-tier tech and startup aptitude tests.
# Categories: 1=Quantitative, 2=Logical, 3=Verbal
QUESTIONS_TO_SEED = [
    {
        "questionText": "Two pipes A and B can fill a cistern in 37.5 minutes and 45 minutes respectively. Both pipes are opened. The cistern will be filled in just half an hour, if pipe B is turned off after:",
        "categoryId": 1,
        "difficulty": "HARD",
        "explanationText": "Let pipe B be turned off after x minutes. Then, pipe A works for the full 30 minutes. \nPart filled by A in 30 min = 30 * (2/75) = 4/5. \nRemaining part = 1 - (4/5) = 1/5. \nNow, 1/5 part must have been filled by B before it was turned off. B fills 1 tank in 45 min. \nSo, B fills 1/5 tank in (1/5) * 45 = 9 minutes. \nTherefore, B must be turned off after exactly 9 minutes.",
        "options": [
            { "optionText": "9 min", "isCorrect": True },
            { "optionText": "5 min", "isCorrect": False },
            { "optionText": "10 min", "isCorrect": False },
            { "optionText": "15 min", "isCorrect": False }
        ]
    },
    {
        "questionText": "In a competitive exam, the probability that a student guesses the correct answer to a multiple choice question with 4 options is 1/4. If they don't guess, they know the answer with probability 'p'. What is 'p' if the overall probability of getting the correct answer is 5/8?",
        "categoryId": 1,
        "difficulty": "HARD",
        "explanationText": "Probability of getting a correct answer = Probability of knowing the answer + Probability of not knowing AND guessing correctly. \nP(Correct) = P(Knows) + [P(Does not know) * P(Guesses correctly)] \n5/8 = p + ((1 - p) * 1/4) \n5/8 = p + 1/4 - p/4 \n5/8 - 1/4 = 3p/4 \n3/8 = 3p/4 => p = 1/2.",
        "options": [
            { "optionText": "1/2", "isCorrect": True },
            { "optionText": "3/4", "isCorrect": False },
            { "optionText": "1/3", "isCorrect": False },
            { "optionText": "5/8", "isCorrect": False }
        ]
    },
    {
        "questionText": "Six people (A, B, C, D, E, F) are sitting around a circular table facing the center. A is second to the right of B. C is sitting between A and B. D is not sitting next to B. E is to the immediate right of A. Who sits to the immediate left of B?",
        "categoryId": 2,
        "difficulty": "HARD",
        "explanationText": "Let's place B at the bottom. A is 2nd to the right of B. C is between A and B (so C is 1st to the right of B). Now we have B, C, A in counter-clockwise order. E is immediate right of A, so E is next counter-clockwise. Positions so far: B, C, A, E. The two remaining spots are to the left of B. D is not next to B, so D must be next to E. This leaves F to be sitting to the immediate left of B. Reading counter-clockwise from B: B, F, D, E, A, C. The person to the immediate left of B is F.",
        "options": [
            { "optionText": "F", "isCorrect": True },
            { "optionText": "D", "isCorrect": False },
            { "optionText": "C", "isCorrect": False },
            { "optionText": "E", "isCorrect": False }
        ]
    },
    {
        "questionText": "Select the correct option that is most nearly OPPOSITE in meaning to 'OBFUSCATE':",
        "categoryId": 3,
        "difficulty": "MEDIUM",
        "explanationText": "To 'obfuscate' means to deliberately render something obscure, unclear, or unintelligible. The exact opposite is to clarify or make evident, which is 'Elucidate'.",
        "options": [
            { "optionText": "Elucidate", "isCorrect": True },
            { "optionText": "Confound", "isCorrect": False },
            { "optionText": "Envelop", "isCorrect": False },
            { "optionText": "Muddle", "isCorrect": False }
        ]
    },
    {
        "questionText": "Read the statement and identify the correct assumption: \nStatement: 'In order to increase profitability, the SaaS startup has decided to offer a 20% discount on annual subscriptions.'\nWhich of the following is implicitly assumed?",
        "categoryId": 2,
        "difficulty": "HARD",
        "explanationText": "The company's goal is to 'increase profitability' via a discount (lowering price). They are assuming that the discount will attract a sufficiently high volume of new subscribers, or increase user retention so much, that it offsets the lower margin per user, resulting in a net increase in total profit.",
        "options": [
            { "optionText": "The volume of new subscribers will offset the reduced price margin.", "isCorrect": True },
            { "optionText": "Existing users will definitely upgrade to annual subscriptions.", "isCorrect": False },
            { "optionText": "The company was operating at a major loss previously.", "isCorrect": False },
            { "optionText": "Competitors will not be able to match the 20% discount.", "isCorrect": False }
        ]
    },
    {
        "questionText": "In a 100m race, A beats B by 10m and C by 13m. In a race of 180m, B will beat C by:",
        "categoryId": 1,
        "difficulty": "HARD",
        "explanationText": "When A runs 100m, B runs 90m and C runs 87m. \nThis means B and C's speed ratio is 90:87. \nWhen B runs 90m, C runs 87m.\nWhen B runs 180m, C runs (87/90) * 180 = 87 * 2 = 174m. \nTherefore, B covers 180m while C covers 174m. B beats C by 180 - 174 = 6m.",
        "options": [
            { "optionText": "6m", "isCorrect": True },
            { "optionText": "5.4m", "isCorrect": False },
            { "optionText": "4.5m", "isCorrect": False },
            { "optionText": "6.5m", "isCorrect": False }
        ]
    },
    {
        "questionText": "Out of 7 consonants and 4 vowels, how many different strings (words) of 3 consonants and 2 vowels can be formed?",
        "categoryId": 1,
        "difficulty": "HARD",
        "explanationText": "Number of ways of selecting 3 consonants from 7 = 7C3 = 35. \nNumber of ways of selecting 2 vowels from 4 = 4C2 = 6. \nNumber of ways of selecting the 5 letters = 35 * 6 = 210. \nEach group of 5 letters can be arranged amongst themselves in 5! (120) ways. \nTotal number of strings = 210 * 120 = 25200.",
        "options": [
            { "optionText": "25200", "isCorrect": True },
            { "optionText": "210", "isCorrect": False },
            { "optionText": "25000", "isCorrect": False },
            { "optionText": "21400", "isCorrect": False }
        ]
    },
    {
        "questionText": "In a certain corporate code, '134' means 'agile development workflow', '478' means 'implement agile patterns' and '729' means 'patterns are scalable'. Which of the following digits precisely stands for 'implement'?",
        "categoryId": 2,
        "difficulty": "MEDIUM",
        "explanationText": "In '134' and '478', the common word is 'agile' and the common digit is '4'. So, 4 = agile. \nIn '478' and '729', the common word is 'patterns' and common digit is '7'. So, 7 = patterns. \nIn '478', we know 4 = agile, 7 = patterns. The remaining word is 'implement' and the remaining digit is '8'. Therefore, 8 stands for 'implement'.",
        "options": [
            { "optionText": "8", "isCorrect": True },
            { "optionText": "9", "isCorrect": False },
            { "optionText": "2", "isCorrect": False },
            { "optionText": "1", "isCorrect": False }
        ]
    },
    {
        "questionText": "Two trains running in opposite directions cross a man standing on the platform in 27 seconds and 17 seconds respectively. They cross each other in 23 seconds. The ratio of their speeds is:",
        "categoryId": 1,
        "difficulty": "HARD",
        "explanationText": "Let the speeds of the two trains be x m/s and y m/s respectively. \nLength of first train = 27x meters. Length of second train = 17y meters. \nWhen they cross each other, relative speed = (x + y) m/s. \nTime taken to cross = (27x + 17y) / (x + y) = 23 \n27x + 17y = 23x + 23y \n4x = 6y \nx/y = 6/4 = 3/2. Ratio is 3:2.",
        "options": [
            { "optionText": "3:2", "isCorrect": True },
            { "optionText": "1:3", "isCorrect": False },
            { "optionText": "3:4", "isCorrect": False },
            { "optionText": "None of these", "isCorrect": False }
        ]
    },
    {
        "questionText": "Find the grammatically sound sentence replacing the underlined portion: \nHe is 'not only a great software architect, but also' an inspiring engineering manager.",
        "categoryId": 3,
        "difficulty": "MEDIUM",
        "explanationText": "The correlative conjunctions 'not only... but also' must be used with parallel grammatical structures. Here they correctly qualify two distinct noun phrases ('a great software architect' and 'an inspiring engineering manager'). The original sentence is perfectly parallel and grammatically sound.",
        "options": [
            { "optionText": "No improvement required", "isCorrect": True },
            { "optionText": "not only is a great software architect, but also is", "isCorrect": False },
            { "optionText": "a great software architect not only, but also", "isCorrect": False },
            { "optionText": "not only great software architect, but also", "isCorrect": False }
        ]
    }
]

def make_request(url, method="GET", data=None, token=None):
    req_data = None
    if data:
        req_data = json.dumps(data).encode('utf-8')
    
    req = urllib.request.Request(url, data=req_data, method=method)
    req.add_header('Content-Type', 'application/json')
    if token:
        req.add_header('Authorization', f'Bearer {token}')
        
    try:
        with urllib.request.urlopen(req) as response:
            if response.status == 204:
                return True
            response_body = response.read()
            if not response_body:
                return True
            return json.loads(response_body.decode())
    except urllib.error.HTTPError as e:
        if e.code == 201: # Handle 201 Created if the API returns it differently
            return True
            
        error_msg = e.read().decode()
        print(f"HTTP Error {e.code}: {error_msg}")
        return None
    except Exception as e:
        print(f"Error: {e}")
        return None

def main():
    print("="*60)
    print(" AptitudePro - Premium Tech Round Question Generator ")
    print("="*60)
    
    print("\n[1] Authenticating as admin...")
    login_data = {"username": USERNAME, "password": PASSWORD}
    auth_response = make_request(f"{BASE_URL}/auth/signin", method="POST", data=login_data)
    
    if not auth_response or 'token' not in auth_response:
        print("❌ Login failed. Please check if your Spring Boot server is running and credentials are correct.")
        sys.exit(1)
        
    token = auth_response['token']
    print("✅ Authenticated successfully.")
    
    print("\n[2] Fetching existing questions to prevent duplicates...")
    existing_questions = make_request(f"{BASE_URL}/questions", method="GET", token=token)
    
    existing_texts = set()
    if existing_questions and isinstance(existing_questions, list):
        existing_texts = {q.get('questionText', '').strip() for q in existing_questions}
        print(f"-> Found {len(existing_texts)} questions currently in the database.")
    else:
        print("-> Could not fetch existing questions. Will proceed anyway.")

    print("\n[3] Seeding high-tier company aptitude questions...")
    success_count = 0
    skipped_count = 0
    
    for i, q in enumerate(QUESTIONS_TO_SEED):
        sys.stdout.write(f"  -> Processing question {i+1}/{len(QUESTIONS_TO_SEED)}... ")
        sys.stdout.flush()
        
        # Duplicate verification Check
        if q['questionText'].strip() in existing_texts:
            print("⏭️  Skipped (Already exists)")
            skipped_count += 1
            continue
            
        response = make_request(f"{BASE_URL}/questions", method="POST", data=q, token=token)
        
        if response is not None:
            print("✅ Success")
            success_count += 1
        else:
            print("❌ Failed")
            
        time.sleep(0.1) # Small delay to not overwhelm the local server
        
    print("\n" + "="*60)
    print(f"🎉 Done! Successfully added {success_count} new challenging questions.")
    if skipped_count > 0:
        print(f"   Skipped {skipped_count} questions that were already in the database.")
    print(f"Refresh your Admin Dashboard to see the highest tier questions!")
    print("="*60)

if __name__ == "__main__":
    main()
