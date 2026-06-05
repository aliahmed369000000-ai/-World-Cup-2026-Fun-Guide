"""
World Cup 2026 — Team to Flag Emoji Mapping
Used in Jinja2 templates via a custom filter.
"""

TEAM_FLAGS = {
    # Group A
    "Mexico": "🇲🇽",
    "South Africa": "🇿🇦",
    "Korea Republic": "🇰🇷",
    "Czechia": "🇨🇿",

    # Group B
    "Canada": "🇨🇦",
    "Bosnia and Herzegovina": "🇧🇦",
    "USA": "🇺🇸",
    "Paraguay": "🇵🇾",

    # Group C
    "Qatar": "🇶🇦",
    "Switzerland": "🇨🇭",
    "Brazil": "🇧🇷",
    "Morocco": "🇲🇦",

    # Group D
    "Haiti": "🇭🇹",
    "Scotland": "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
    "Australia": "🇦🇺",
    "Turkiye": "🇹🇷",

    # Group E
    "Germany": "🇩🇪",
    "Curacao": "🇨🇼",
    "Netherlands": "🇳🇱",
    "Japan": "🇯🇵",

    # Group F
    "Côte d'Ivoire": "🇨🇮",
    "Ecuador": "🇪🇨",
    "Sweden": "🇸🇪",
    "Tunisia": "🇹🇳",

    # Group G
    "Spain": "🇪🇸",
    "Cabo Verde": "🇨🇻",
    "Belgium": "🇧🇪",
    "Egypt": "🇪🇬",

    # Group H
    "Saudi Arabia": "🇸🇦",
    "Uruguay": "🇺🇾",
    "IR Iran": "🇮🇷",
    "New Zealand": "🇳🇿",

    # Group I
    "France": "🇫🇷",
    "Senegal": "🇸🇳",
    "Iraq": "🇮🇶",
    "Norway": "🇳🇴",

    # Group J
    "Argentina": "🇦🇷",
    "Algeria": "🇩🇿",
    "Austria": "🇦🇹",
    "Jordan": "🇯🇴",

    # Group K
    "Portugal": "🇵🇹",
    "Congo DR": "🇨🇩",
    "England": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    "Croatia": "🇭🇷",

    # Group L
    "Ghana": "🇬🇭",
    "Panama": "🇵🇦",
    "Uzbekistan": "🇺🇿",
    "Colombia": "🇨🇴",

    # Extras / possible
    "Wales": "🏴󠁧󠁢󠁷󠁬󠁳󠁿",
    "Ukraine": "🇺🇦",
    "Poland": "🇵🇱",
    "Serbia": "🇷🇸",
    "Denmark": "🇩🇰",
    "Greece": "🇬🇷",
    "Romania": "🇷🇴",
    "Hungary": "🇭🇺",
    "Slovakia": "🇸🇰",
    "Slovenia": "🇸🇮",
    "North Macedonia": "🇲🇰",
    "Albania": "🇦🇱",
    "Kosovo": "🇽🇰",
    "Iceland": "🇮🇸",
    "Finland": "🇫🇮",
    "Ireland": "🇮🇪",
    "Italy": "🇮🇹",
    "Russia": "🇷🇺",
    "Turkey": "🇹🇷",
    "China": "🇨🇳",
    "India": "🇮🇳",
    "Thailand": "🇹🇭",
    "Vietnam": "🇻🇳",
    "Indonesia": "🇮🇩",
    "Philippines": "🇵🇭",
    "Malaysia": "🇲🇾",
    "Singapore": "🇸🇬",
    "Nigeria": "🇳🇬",
    "Cameroon": "🇨🇲",
    "Kenya": "🇰🇪",
    "Ethiopia": "🇪🇹",
    "Tanzania": "🇹🇿",
    "Uganda": "🇺🇬",
    "Zambia": "🇿🇲",
    "Zimbabwe": "🇿🇼",
    "Mali": "🇲🇱",
    "Burkina Faso": "🇧🇫",
    "Ivory Coast": "🇨🇮",
    "Guinea": "🇬🇳",
    "Mozambique": "🇲🇿",
    "Angola": "🇦🇴",
    "Libya": "🇱🇾",
    "Sudan": "🇸🇩",
    "Somalia": "🇸🇴",
    "Venezuela": "🇻🇪",
    "Bolivia": "🇧🇴",
    "Peru": "🇵🇪",
    "Chile": "🇨🇱",
    "Costa Rica": "🇨🇷",
    "Honduras": "🇭🇳",
    "El Salvador": "🇸🇻",
    "Guatemala": "🇬🇹",
    "Nicaragua": "🇳🇮",
    "Cuba": "🇨🇺",
    "Jamaica": "🇯🇲",
    "Trinidad and Tobago": "🇹🇹",
    "Bahamas": "🇧🇸",
    "Barbados": "🇧🇧",
    "Guyana": "🇬🇾",
    "Suriname": "🇸🇷",
}


def get_flag(team_name: str) -> str:
    """Return flag emoji for a team name, or a white flag as fallback."""
    return TEAM_FLAGS.get(team_name, "🏳️")
