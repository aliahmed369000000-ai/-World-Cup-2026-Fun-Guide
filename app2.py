from flask import Flask, render_template, jsonify
import json
import requests
import os
from team_flags import get_flag

app = Flask(__name__)

# ====== LOAD DATA ======
with open("data/cities.json", encoding="utf-8") as f:
    cities = json.load(f)

with open("data/matches.json", encoding="utf-8") as f:
    matches = json.load(f)

with open("data/hotels.json", encoding="utf-8") as f:
    hotels = json.load(f)

# ====== JINJA2 CUSTOM FILTER ======
@app.template_filter('flag')
def flag_filter(team_name):
    """Return flag emoji for a given team name."""
    return get_flag(team_name)

# ====== ROUTES ======

@app.route('/api/matches')
def api_matches():
    return jsonify(matches)


@app.route("/")
def home():
    return render_template("index.html", cities=cities, matches=matches[:8])


@app.route("/city/<path:name>")
def city(name):
    try:
        city_data = cities.get(name)
        if city_data is None:
            return render_template("404.html"), 404

        city_hotels = hotels.get(name, [])

        api_key = os.environ.get("OPENWEATHER_API_KEY")
        weather = None
        if api_key:
            url = f"https://api.openweathermap.org/data/2.5/weather?q={name}&appid={api_key}&units=metric"
            try:
                response = requests.get(url, timeout=5)
                if response.status_code == 200:
                    data = response.json()
                    weather = {
                        "temp": data["main"]["temp"],
                        "description": data["weather"][0]["description"],
                        "wind": data["wind"]["speed"],
                    }
            except Exception as e:
                print("WEATHER ERROR =", e)

        city_matches = [m for m in matches if m.get("city") == name]

        return render_template(
            "city.html",
            city=city_data,
            city_name=name,
            weather=weather,
            hotels=city_hotels,
            city_matches=city_matches
        )
    except Exception as e:
        print("CITY PAGE ERROR =", e)
        raise


@app.route("/hotels")
def hotels_page():
    return render_template("hotels.html", hotels=hotels, cities=cities)


@app.route("/matches")
def matches_page():
    return render_template("matches.html", matches=matches)


@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/contact")
def contact():
    return render_template("contact.html")


@app.route("/affiliate-disclosure")
def affiliate_disclosure():
    return render_template("affiliate_disclosure.html")


@app.route("/privacy")
def privacy():
    return render_template("privacy.html")


@app.route("/fifa-fan-id")
def fifa_fan_id():
    return render_template("fifa_fan_id.html")


@app.route("/free-tickets")
def free_tickets():
    return render_template("free_tickets.html")


@app.route("/travel-essentials")
def travel_essentials():
    return render_template("travel_essentials.html")


@app.route("/news")
def news():
    return render_template("news.html")


@app.route("/news/how-to-get-fifa-fan-id")
def news_fan_id():
    return render_template("fifa_fan_id.html")


@app.route("/news/free-tickets-world-cup-2026")
def news_free_tickets():
    return render_template("free_tickets.html")


@app.route("/news/travel-cost-from-egypt")
def news_travel_cost():
    return render_template("news_travel_cost_egypt.html")


@app.route("/news/best-translation-app-spanish")
def news_translation_app():
    return render_template("news_translation_app.html")


@app.route("/news/how-to-charge-phone-in-stadium")
def news_phone_charge():
    return render_template("news_phone_charge.html")


@app.route("/news/esim-vs-roaming-world-cup")
def news_esim():
    return render_template("news_esim.html")


@app.route("/news/halal-food-guide-usa-2026")
def news_halal():
    return render_template("news_halal.html")


@app.route("/news/best-vpn-for-world-cup")
def news_vpn():
    return render_template("news_vpn.html")


@app.errorhandler(404)
def page_not_found(_error):
    return render_template("404.html"), 404


if __name__ == "__main__":
    app.run(debug=True)
