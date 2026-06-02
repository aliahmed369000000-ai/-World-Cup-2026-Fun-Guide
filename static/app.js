// Dark Mode
const btn = document.getElementById('dark-mode-toggle');
if (btn) {
    btn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    });
}

// Countdown
const countDate = new Date("June 11, 2026 00:00:00").getTime();
setInterval(() => {
    let now = new Date().getTime();
    let gap = countDate - now;
    if (gap > 0) {
        let days = Math.floor(gap / (1000 * 60 * 60 * 24));
        let hours = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((gap % (1000 * 60)) / 1000);
        const countdownEl = document.getElementById('countdown');
        if (countdownEl) {
            countdownEl.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
    }
}, 1000);

// Favorites logic for hotels
function toggleFav(hotel) {
    let favs = JSON.parse(localStorage.getItem('favHotels') || '[]');
    if (favs.includes(hotel)) {
        favs = favs.filter(h => h !== hotel);
        alert(hotel + " removed from favorites!");
    } else {
        favs.push(hotel);
        alert(hotel + " added to favorites!");
    }
    localStorage.setItem('favHotels', JSON.stringify(favs));
}

// ========== MATCHES LOAD MORE LOGIC ==========
let allMatches = [];
let currentMatchCount = 8;
const matchesContainer = document.getElementById('matchesContainer');

// Fetch matches from JSON file
fetch('/data/matches.json')
    .then(response => response.json())
    .then(data => {
        allMatches = data;
        displayMatches(currentMatchCount);
        setupLoadMoreButton();
    })
    .catch(error => {
        console.error('Error loading matches:', error);
        if (matchesContainer) {
            matchesContainer.innerHTML = '<p style="color: red; text-align: center;">❌ Error loading matches. Please refresh the page.</p>';
        }
    });

function displayMatches(limit) {
    if (!matchesContainer) return;
    
    let matchesHtml = '';
    const displayLimit = Math.min(limit, allMatches.length);
    
    for (let i = 0; i < displayLimit; i++) {
        const match = allMatches[i];
        const matchDate = match.date ? match.date.split('T')[0] : match.date;
        
        matchesHtml += `
            <div class="match-card-large">
                <div class="match-teams">
                    <div style="text-align: center; flex: 1;">
                        <div style="font-size: 32px; margin-bottom: 8px;">🏳️</div>
                        <h3>${escapeHtml(match.team1)}</h3>
                    </div>
                    <div style="font-size: 24px; font-weight: 700; color: #fbbf24;">VS</div>
                    <div style="text-align: center; flex: 1;">
                        <div style="font-size: 32px; margin-bottom: 8px;">🏳️</div>
                        <h3>${escapeHtml(match.team2)}</h3>
                    </div>
                </div>
                <div class="match-info">
                    <div class="match-time">🕐 ${match.time}</div>
                    <div class="match-date">📅 ${matchDate}</div>
                    <div class="match-stadium">🏟 ${escapeHtml(match.stadium)}</div>
                    <div style="font-size: 12px; opacity: 0.7; margin-top: 5px;">📍 ${escapeHtml(match.city)}</div>
                </div>
                <button class="remind-btn" onclick="remindMe('${escapeHtml(match.team1)}', '${escapeHtml(match.team2)}')">🔔 Remind Me</button>
            </div>
        `;
    }
    
    matchesContainer.innerHTML = matchesHtml;
}

function setupLoadMoreButton() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (!loadMoreBtn) return;
    
    // Remove any existing listener to avoid duplicates
    const newBtn = loadMoreBtn.cloneNode(true);
    loadMoreBtn.parentNode.replaceChild(newBtn, loadMoreBtn);
    
    newBtn.addEventListener('click', () => {
        const newLimit = currentMatchCount + 8;
        
        if (newLimit >= allMatches.length) {
            displayMatches(allMatches.length);
            newBtn.textContent = '✓ All Matches Loaded';
            newBtn.disabled = true;
            newBtn.style.opacity = '0.5';
            newBtn.style.cursor = 'not-allowed';
        } else {
            currentMatchCount = newLimit;
            displayMatches(currentMatchCount);
            const remaining = allMatches.length - currentMatchCount;
            newBtn.textContent = `Load More Matches (${remaining} more)`;
        }
    });
    
    // Update button ID reference
    newBtn.id = 'loadMoreBtn';
}

function remindMe(team1, team2) {
    // Request notification permission
    if (Notification.permission === "granted") {
        new Notification("⚽ Match Reminder", { body: `${team1} vs ${team2} starts soon!` });
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                new Notification("⚽ Match Reminder", { body: `${team1} vs ${team2} starts soon!` });
            }
        });
    } else {
        alert(`🔔 Reminder set for ${team1} vs ${team2}!`);
    }
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
}
