import sys
print("⚠️ هذا الملف معطل. استخدم ملف matches.json الرسمي بدلاً من ذلك.")
sys.exit(0)
import json
from datetime import datetime, timedelta

teams = [
    "Argentina",
    "Brazil",
    "France",
    "Germany",
    "Spain",
    "Portugal",
    "England",
    "USA",
    "Mexico",
    "Canada",
    "Japan",
    "South Korea",
    "Morocco",
    "Saudi Arabia",
    "Netherlands",
    "Belgium",
    "Croatia",
    "Uruguay",
    "Senegal",
    "Switzerland",
    "Denmark",
    "Poland",
    "Serbia",
    "Turkey",
    "Egypt",
    "Algeria",
    "Tunisia",
    "Nigeria",
    "Cameroon",
    "Ghana",
    "Ivory Coast",
    "Chile",
    "Colombia",
    "Peru",
    "Ecuador",
    "Paraguay",
    "Australia",
    "New Zealand",
    "Iran",
    "Iraq",
    "Qatar",
    "UAE",
    "Austria",
    "Sweden",
    "Norway",
    "Scotland",
    "Wales",
    "Czech Republic",
]


cities = [
    {"city": "New York", "stadium": "MetLife Stadium"},
    {"city": "Toronto", "stadium": "BMO Field"},
    {"city": "Mexico City", "stadium": "Azteca Stadium"},
    {"city": "Los Angeles", "stadium": "SoFi Stadium"},
    {"city": "Dallas", "stadium": "AT&T Stadium"},
    {"city": "Miami", "stadium": "Hard Rock Stadium"},
    {"city": "Atlanta", "stadium": "Mercedes-Benz Stadium"},
    {"city": "Vancouver", "stadium": "BC Place"},
]

matches = []

start_date = datetime(2026, 6, 11, 18, 0)

for i in range(104):

    team1 = teams[i % len(teams)]

    team2 = teams[(i + 7) % len(teams)]

    if team1 == team2:
        team2 = teams[(i + 8) % len(teams)]

    venue = cities[i % len(cities)]

    match_date = start_date + timedelta(hours=i * 5)

    match = {
        "team1": team1,
        "team2": team2,
        "time": match_date.strftime("%I:%M %p"),
        "date": match_date.strftime("%Y-%m-%dT%H:%M:%S"),
        "city": venue["city"],
        "stadium": venue["stadium"],
    }

    matches.append(match)

with open("data/matches.json", "w", encoding="utf-8") as file:

    json.dump(matches, file, ensure_ascii=False, indent=4)

print("✅ 104 matches generated successfully")
