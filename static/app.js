// Dark Mode
const btn = document.getElementById('dark-mode-toggle');
btn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Countdown
const countDate = new Date("June 11, 2026 00:00:00").getTime();
setInterval(() => {
    let now = new Date().getTime();
    let gap = countDate - now;
    let days = Math.floor(gap / (1000 * 60 * 60 * 24));
    document.getElementById('countdown').innerText = `Countdown to Kickoff: ${days} Days`;
}, 1000);

// Favorites logic
function toggleFav(hotel) {
    let favs = JSON.parse(localStorage.getItem('favHotels') || '[]');
    if(favs.includes(hotel)) favs = favs.filter(h => h !== hotel);
    else favs.push(hotel);
    localStorage.setItem('favHotels', JSON.stringify(favs));
    alert(hotel + " updated in favorites!");
}
let allMatches = [];
let currentMatchCount = 8;
let matchesContainer = document.getElementById('matchesContainer');

// تحميل البيانات من ملف JSON
fetch('/data/matches.json')
    .then(response => response.json())
    .then(data => {
        allMatches = data;
        displayMatches(currentMatchCount);
        setupLoadMoreButton();
    })
    .catch(error => console.error('Error loading matches:', error));

function displayMatches(limit) {
    let matchesHtml = '';
    for (let i = 0; i < limit && i < allMatches.length; i++) {
        const match = allMatches[i];
        matchesHtml += `
            <div class="match-card">
                <div class="teams">
                    <span class="team">${match.team1}</span>
                    <span class="vs">VS</span>
                    <span class="team">${match.team2}</span>
                </div>
                <div class="match-details">
                    <span class="time">${match.time}</span>
                    <span class="date">${match.date.split('T')[0]}</span>
                    <span class="stadium">🏟 ${match.stadium}</span>
                    <span class="city">📍 ${match.city}</span>
                </div>
                <button class="remind-btn">🔔 Remind Me</button>
            </div>
        `;
    }
    matchesContainer.innerHTML = matchesHtml;
}

function setupLoadMoreButton() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            const newLimit = currentMatchCount + 8;
            if (newLimit >= allMatches.length) {
                displayMatches(allMatches.length);
                loadMoreBtn.style.display = 'none';
            } else {
                currentMatchCount = newLimit;
                displayMatches(currentMatchCount);
            }
        });
    }
}
