from flask import Flask, render_template, jsonify
import json
import requests
import os

app = Flask(__name__)

with open("data/cities.json", encoding="utf-8") as f:
    cities = json.load(f)

with open("data/matches.json", encoding="utf-8") as f:
    matches = json.load(f)

with open("data/hotels.json", encoding="utf-8") as f:
    hotels = json.load(f)


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


@app.errorhandler(404)
def page_not_found(_error):
    return render_template("404.html"), 404


if __name__ == "__main__":
    app.run(debug=True)
