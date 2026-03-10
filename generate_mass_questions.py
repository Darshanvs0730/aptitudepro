import urllib.request
import urllib.parse
import json
import sys
import time
import random
import math

# --- CONFIGURATION ---
BASE_URL = "http://localhost:8080/api"
USERNAME = "admin"
PASSWORD = "admin123"

NAMES = ["A", "B", "C", "D", "Alice", "Bob", "Charlie", "David", "Suresh", "Ramesh", "Priya", "Rahul"]
OBJECTS = ["apples", "oranges", "books", "pens", "laptops", "tickets", "toffees"]
CITIES = ["New York", "London", "Tokyo", "Mumbai", "Delhi", "Sydney", "Paris", "Berlin"]
VEHICLES = ["train", "car", "bus", "truck"]

def get_wrong_options(correct_val, is_float=False, is_percent=False, num_options=3):
    options = []
    modifiers = [0.9, 1.1, 0.8, 1.2, 0.5, 1.5, 0.75, 1.25]
    random.shuffle(modifiers)
    
    for i in range(num_options):
        if is_float:
            wrong = round(correct_val * modifiers[i], 2)
            if wrong == correct_val: wrong += 1.5
            if is_percent:
                options.append(f"{wrong}%")
            else:
                options.append(f"{wrong}")
        else:
            wrong = int(correct_val * modifiers[i])
            if wrong == correct_val: wrong += random.randint(1, 5)
            if is_percent:
                options.append(f"{wrong}%")
            else:
                options.append(f"{wrong}")
    return options

# --- QUANTITATIVE GENERATORS ---
def gen_time_work():
    a_days = random.randint(10, 30)
    b_days = random.choice([x for x in range(12, 40) if x != a_days])
    work_days = random.randint(2, min(a_days, b_days) - 2)
    name1 = random.choice(NAMES[:4])
    name2 = random.choice(NAMES[4:])
    
    a_rate = 1.0 / a_days
    b_rate = 1.0 / b_days
    work_done = (a_rate + b_rate) * work_days
    work_left = 1.0 - work_done
    
    # Let's keep it simple and just do it conceptually with string fraction matching to avoid float inaccuracies
    lcm = math.lcm(a_days, b_days)
    a_eff = lcm // a_days
    b_eff = lcm // b_days
    total_eff = a_eff + b_eff
    work_done_units = total_eff * work_days
    work_left_units = lcm - work_done_units
    
    if work_left_units <= 0:
        return gen_time_work() # retry
        
    gcd = math.gcd(work_left_units, lcm)
    num = work_left_units // gcd
    den = lcm // gcd
    correct_str = f"{num}/{den}"
    
    wrong_1 = f"{num + 1}/{den}"
    wrong_2 = f"{num}/{den+1}"
    wrong_3 = f"{abs(num - 1)}/{den}"
    if wrong_3 == "0/1": wrong_3 = f"{num}/{den+2}"
    
    return {
        "questionText": f"{name1} can do a piece of work in {a_days} days and {name2} in {b_days} days. If they work on it together for {work_days} days, then the fraction of the work that is left is:",
        "categoryId": 1,
        "difficulty": random.choice(["EASY", "MEDIUM"]),
        "explanationText": f"Total work assumed as LCM({a_days}, {b_days}) = {lcm} units. {name1}'s efficiency = {a_eff} units/day. {name2}'s efficiency = {b_eff} units/day. Total efficiency = {total_eff} units/day. Work done in {work_days} days = {work_days} * {total_eff} = {work_done_units}. Work left = {lcm} - {work_done_units} = {work_left_units}. Fraction left = {work_left_units}/{lcm} = {correct_str}.",
        "options": [
            { "optionText": correct_str, "isCorrect": True },
            { "optionText": wrong_1, "isCorrect": False },
            { "optionText": wrong_2, "isCorrect": False },
            { "optionText": wrong_3, "isCorrect": False }
        ]
    }

def gen_trains():
    l1 = random.randint(10, 30) * 10
    l2 = random.randint(10, 30) * 10
    s1_kmph = random.randint(40, 100)
    s2_kmph = random.choice([x for x in range(30, 90) if x != s1_kmph])
    direction = random.choice(["opposite", "same"])
    
    rel_speed_kmph = (s1_kmph + s2_kmph) if direction == "opposite" else abs(s1_kmph - s2_kmph)
    rel_speed_ms = rel_speed_kmph * (5/18.0)
    total_length = l1 + l2
    
    time_taken = total_length / rel_speed_ms
    time_taken = round(time_taken, 2)
    
    correct_str = f"{time_taken} seconds"
    wrong = get_wrong_options(time_taken, is_float=True)
    
    return {
        "questionText": f"Two trains of lengths {l1} m and {l2} m are running on parallel tracks in the {'same' if direction == 'same' else 'opposite'} direction at {s1_kmph} km/hr and {s2_kmph} km/hr respectively. In what time will they pass each other?",
        "categoryId": 1,
        "difficulty": random.choice(["MEDIUM", "HARD"]),
        "explanationText": f"Relative speed = {'Sum' if direction == 'opposite' else 'Difference'} of speeds = {rel_speed_kmph} km/hr. In m/s = {rel_speed_kmph} * 5/18 = {round(rel_speed_ms,2)} m/s. Total distance = {total_length} m. Time = D / S = {total_length} / {round(rel_speed_ms,2)} = {time_taken} seconds.",
        "options": [
            { "optionText": correct_str, "isCorrect": True },
            { "optionText": f"{wrong[0]} seconds", "isCorrect": False },
            { "optionText": f"{wrong[1]} seconds", "isCorrect": False },
            { "optionText": f"{wrong[2]} seconds", "isCorrect": False }
        ]
    }

def gen_profit_loss():
    cp = random.randint(100, 5000)
    profit_pct = random.randint(5, 40)
    sp = cp * (1 + profit_pct/100.0)
    discount_pct = random.randint(5, 25)
    mp = sp / (1 - discount_pct/100.0)
    
    mp = round(mp, 2)
    sp = round(sp, 2)
    
    markup_pct = ((mp - cp) / cp) * 100
    markup_pct = round(markup_pct, 2)
    
    correct_str = f"{markup_pct}%"
    wrong = get_wrong_options(markup_pct, is_float=True, is_percent=True)
    
    return {
        "questionText": f"A shopkeeper wants to allow a discount of {discount_pct}% on his goods and still earn a profit of {profit_pct}%. What percent above the cost price should he mark his goods?",
        "categoryId": 1,
        "difficulty": "HARD",
        "explanationText": f"Let CP be 100. Profit is {profit_pct}%, so SP = {100 + profit_pct}. Discount is {discount_pct}%. So, SP = Marked Price (MP) * (1 - {discount_pct}/100) -> {100+profit_pct} = MP * {100-discount_pct}/100. MP = {(100+profit_pct)*100/(100-discount_pct)}. The markup is MP - 100, which evaluates to {markup_pct}%.",
        "options": [
            { "optionText": correct_str, "isCorrect": True },
            { "optionText": wrong[0], "isCorrect": False },
            { "optionText": wrong[1], "isCorrect": False },
            { "optionText": wrong[2], "isCorrect": False }
        ]
    }

def gen_mixtures():
    # Milk and water mixture replacement
    total_L = random.choice([40, 50, 60, 80, 100, 120])
    draw_L = random.choice([5, 10, 15, 20])
    repeats = random.choice([2, 3])
    
    # Formula: Final amount of milk = Initial * (1 - draw/total)^repeats
    final_milk = total_L * ((1 - draw_L/total_L) ** repeats)
    final_milk = round(final_milk, 2)
    
    correct_str = f"{final_milk} Liters"
    wrong = get_wrong_options(final_milk, is_float=True)
    
    return {
        "questionText": f"A container contains {total_L} liters of pure milk. From this container, {draw_L} liters of milk was taken out and replaced by water. This process was repeated further {repeats-1} times (total {repeats} times). How much milk is now contained by the container?",
        "categoryId": 1,
        "difficulty": random.choice(["MEDIUM", "HARD"]),
        "explanationText": f"The formula is: Final Quantity = Initial Quantity * (1 - x/c)^n, where x is drawn amount ({draw_L}), c is capacity ({total_L}), n is number of times ({repeats}). Final = {total_L} * (1 - {draw_L}/{total_L})^{repeats} = {final_milk} liters.",
        "options": [
            { "optionText": correct_str, "isCorrect": True },
            { "optionText": f"{wrong[0]} Liters", "isCorrect": False },
            { "optionText": f"{wrong[1]} Liters", "isCorrect": False },
            { "optionText": f"{wrong[2]} Liters", "isCorrect": False }
        ]
    }


# --- LOGICAL GENERATORS ---
def gen_seating():
    n = random.choice([5, 6, 7, 8])
    people = random.sample(NAMES, n)
    # create a simple circular constraint puzzle
    q = f"{n} corporate executives {', '.join(people)} are sitting in a circle facing the center. "
    
    correct = people[1]
    wrong = people[2:5]
    
    return {
        "questionText": q + f"{people[0]} is facing {people[1]}. {people[2]} is immediate right of {people[0]}. {people[3]} is immediate left of {people[1]}. Who is sitting opposite to {people[0]}?",
        "categoryId": 2,
        "difficulty": "EASY",
        "explanationText": f"The problem explicitly states '{people[0]} is facing {people[1]}'. Therefore, {people[1]} is opposite.",
        "options": [
            { "optionText": correct, "isCorrect": True },
            { "optionText": wrong[0], "isCorrect": False },
            { "optionText": wrong[1], "isCorrect": False },
            { "optionText": wrong[2], "isCorrect": False }
        ]
    }

def gen_coding():
    words = random.sample(["SYSTEM", "SERVER", "CLOUD", "AGILE", "PROXY", "ROUTER", "DEBUG", "TOKEN"], 2)
    w1, w2 = words
    
    shift = random.randint(1, 5)
    code_w1 = "".join([chr(((ord(c) - 65 + shift) % 26) + 65) for c in w1])
    code_w2 = "".join([chr(((ord(c) - 65 + shift) % 26) + 65) for c in w2])
    
    wrong1 = "".join([chr(((ord(c) - 65 + shift + 1) % 26) + 65) for c in w2])
    wrong2 = "".join([chr(((ord(c) - 65 - shift) % 26) + 65) for c in w2])
    wrong3 = code_w2[::-1]
    
    return {
        "questionText": f"In a certain encryption algorithm, '{w1}' is written as '{code_w1}'. How will '{w2}' be written in that same algorithm?",
        "categoryId": 2,
        "difficulty": "MEDIUM",
        "explanationText": f"Each letter is shifted forward by {shift} places in the English alphabet. Therefore, applying a +{shift} shift to '{w2}' gives '{code_w2}'.",
        "options": [
            { "optionText": code_w2, "isCorrect": True },
            { "optionText": wrong1, "isCorrect": False },
            { "optionText": wrong2, "isCorrect": False },
            { "optionText": wrong3, "isCorrect": False }
        ]
    }

def gen_blood_relations():
    pairs = [
        ("X is the brother of Y", "Y is the brother of Z", "Z is the father of W", "Uncle"),
        ("A is the sister of B", "B is the father of C", "C is the son of D", "Aunt"),
        ("M is the mother of N", "N is the sister of O", "O is the daughter of P", "Wife"),
    ]
    p = random.choice(pairs)
    return {
        "questionText": f"Read the relations: 1) {p[0]}. 2) {p[1]}. 3) {p[2]}. What is the relationship of the first person to the last person mentioned?",
        "categoryId": 2,
        "difficulty": random.choice(["EASY", "MEDIUM"]),
        "explanationText": "By tracing the relationship tree step by step, the specific relation evaluates definitively.",
        "options": [
            { "optionText": p[3], "isCorrect": True },
            { "optionText": "Cousin", "isCorrect": False },
            { "optionText": "Grandfather", "isCorrect": False },
            { "optionText": "Nephew", "isCorrect": False }
        ]
    }

# --- VERBAL GENERATORS ---
def gen_vocab():
    pairs = [
        ("EPHEMERAL", "Transient", "Eternal"),
        ("MITIGATE", "Alleviate", "Aggravate"),
        ("PROLIFIC", "Abundant", "Scarce"),
        ("LUCID", "Clear", "Obscure"),
        ("VINDICATE", "Acquit", "Blame"),
        ("ACUMEN", "Astuteness", "Ignorance"),
        ("PERNICIOUS", "Harmful", "Beneficial"),
        ("UBIQUITOUS", "Omnipresent", "Rare")
    ]
    p = random.choice(pairs)
    is_synonym = random.choice([True, False])
    
    word = p[0]
    if is_synonym:
        q = f"Which of the following is the closest SYNONYM to the word '{word}'?"
        correct = p[1]
        wrong = p[2]
    else:
        q = f"Which of the following is the closest ANTONYM to the word '{word}'?"
        correct = p[2]
        wrong = p[1]
        
    filler1 = random.choice([x[1] for x in pairs if x[1] != correct and x[1] != wrong])
    filler2 = random.choice([x[2] for x in pairs if x[2] != correct and x[2] != wrong])
    
    return {
        "questionText": q,
        "categoryId": 3,
        "difficulty": random.choice(["MEDIUM", "HARD"]),
        "explanationText": f"The word {word} relates strongly to {p[1]} (synonym) and {p[2]} (antonym). Hence {correct} is the exact answer requested.",
        "options": [
            { "optionText": correct, "isCorrect": True },
            { "optionText": wrong, "isCorrect": False },
            { "optionText": filler1, "isCorrect": False },
            { "optionText": filler2, "isCorrect": False }
        ]
    }


def generate_question_pool(count=400):
    gens = [gen_time_work, gen_trains, gen_profit_loss, gen_mixtures, gen_seating, gen_coding, gen_blood_relations, gen_vocab]
    
    questions = []
    seen = set()
    
    for i in range(count):
        while True:
            generator = random.choice(gens)
            q = generator()
            
            opts = q['options']
            random.shuffle(opts)
            q['options'] = opts
            
            # Simple unique hash
            hash_str = q['questionText']
            if hash_str not in seen:
                seen.add(hash_str)
                questions.append(q)
                break
                
    return questions

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
            if response.status == 204: return True
            b = response.read()
            if not b: return True
            return json.loads(b.decode())
    except urllib.error.HTTPError as e:
        if e.code == 201: return True
        print(f"HTTP Error {e.code}: {e.read().decode()}")
        return None
    except Exception as e:
        print(f"Error: {e}")
        return None

def main():
    print("======================================================")
    print(" 🚀 AptitudePro - MASSIVE QUESTION GENERATOR SCRIPT 🚀 ")
    print("======================================================")
    
    print("\n[1] Authenticating as admin...")
    login_data = {"username": USERNAME, "password": PASSWORD}
    auth_response = make_request(f"{BASE_URL}/auth/signin", method="POST", data=login_data)
    
    if not auth_response or 'token' not in auth_response:
        print("❌ Login failed. Exiting.")
        sys.exit(1)
        
    token = auth_response['token']
    print("✅ Authenticated successfully.")
    
    print("\n[2] Generating 400 unique, complex procedural questions locally...")
    questions = generate_question_pool(400)
    print(f"✅ Generated {len(questions)} high-quality questions in memory.")
    
    print("\n[3] Fetching existing DB questions to prevent duplicates...")
    existing = make_request(f"{BASE_URL}/questions", method="GET", token=token)
    existing_texts = set()
    if existing and isinstance(existing, list):
        existing_texts = {q.get('questionText', '').strip() for q in existing}
    print(f"-> DB currently holds {len(existing_texts)} questions.")

    print("\n[4] Uploading to database... (This might take a minute)")
    success_count = 0
    skipped_count = 0
    
    for i, q in enumerate(questions):
        if i % 20 == 0:
            sys.stdout.write(f"\n  -> Batch progress: {i}/400 ")
        
        if q['questionText'].strip() in existing_texts:
            sys.stdout.write("S") # Skipped
            sys.stdout.flush()
            skipped_count += 1
            continue
            
        res = make_request(f"{BASE_URL}/questions", method="POST", data=q, token=token)
        if res is not None:
            sys.stdout.write(".") # Success
            success_count += 1
        else:
            sys.stdout.write("x") # Fail
        sys.stdout.flush()
        
    print("\n\n======================================================")
    print(f"🎉 OPERATION COMPLETE! 🎉")
    print(f"✅ Successfully inserted: {success_count} questions")
    print(f"⏭️  Skipped (duplicates): {skipped_count} questions")
    print("Refresh your Admin Dashboard to see hundreds of new questions!")
    print("======================================================")

if __name__ == "__main__":
    main()
