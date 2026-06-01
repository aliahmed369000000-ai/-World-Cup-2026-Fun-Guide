from flask import Flask, render_template
import json
import requests
import os


app = Flask(__name__)

# قراءة بيانات المدن
with open("data/cities.json", encoding="utf-8") as file:

    cities = json.load(file)


# قراءة بيانات المباريات
with open("data/matches.json", encoding="utf-8") as file:

    matches = json.load(file)
# قراءة الفنادق
with open("data/hotels.json", encoding="utf-8") as file:

    hotels = json.load(file)


# الصفحة الرئيسية
@app.route("/")
def home():

    return render_template("index.html", cities=cities, matches=matches[:8])




# صفحة المدينة

@app.route("/city/<name>")
def city(name):
    # فك ترميز URL (مثلاً %20 -> مسافة)
    city_name = unquote(name).strip()
    
    # إزالة المسافات المتكررة
    city_name = re.sub(r'\s+', ' ', city_name)
    
    # البحث المباشر
    city_data = cities.get(city_name)
    
    # إذا لم نجد، نحاول البحث بأحرف صغيرة (لأن بعض المدن قد تكتب بحروف مختلفة)
    if city_data is None:
        city_lower = city_name.lower()
        for key in cities:
            if key.lower() == city_lower:
                city_data = cities[key]
                city_name = key
                break
    
    if city_data is None:
        return render_template("404.html"), 404
    
    # باقي الكود كما هو...

    # فنادق المدينة
    city_hotels = hotels.get(name, [])

    # API KEY
        # API KEY من Environment Variables
    api_key = os.environ.get("OPENWEATHER_API_KEY")
    
    weather = None
    
    if api_key:
        # طلب الطقس
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
        except Exception:
            weather = None
    
    return render_template("city.html", city=city_data, city_name=name, weather=weather, hotels=city_hotels)


# صفحة About
@app.route("/about")
def about():

    return render_template("about.html")


# صفحة Contact
@app.route("/contact")
def contact():

    return render_template("contact.html")


# صفحة Privacy Policy
@app.route("/privacy")
def privacy():

    return render_template("privacy.html")


@app.route("/matches")
def matches_page():

    return render_template("matches.html", matches=matches)


@app.errorhandler(404)
def page_not_found(_error):

    return render_template("404.html"), 404


# تشغيل الموقع
if __name__ == "__main__":

    app.run(debug=True)
