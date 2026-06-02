// Dark Mode
const btn = document.getElementById('dark-mode-toggle');
if (btn) {
    btn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', document.body.classList.contains('dark-mode'));
    });
}

// Countdown
const countDate = new Date('June 11, 2026 00:00:00').getTime();
setInterval(() => {
    let now = new Date().getTime();
    let gap = countDate - now;
    if (gap > 0) {
        let days = Math.floor(gap / (1000 * 60 * 60 * 24));
        let hours = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((gap % (1000 * 60)) / 1000);
        
        const countdownElement = document.getElementById('countdown');
        if (countdownElement) {
            countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
    }
}, 1000);

// Global variables
let allMatches = [];
let currentMatchCount = 8;
let matchesContainer = document.getElementById('matchesContainer');

// Fetch matches from Flask API
fetch('/api/matches')
    .then(response => response.json())
    .then(data => {
        allMatches = data;
        displayMatches(currentMatchCount);
        setupLoadMoreButton();
    })
    .catch(error => {
        console.error('Error loading matches:', error);
        if (matchesContainer) {
            matchesContainer.innerHTML = '<p style="color: red; text-align: center;">Error loading matches. Please refresh the page.</p>';
        }
    });

// Function to display matches
function displayMatches(limit) {
    if (!matchesContainer) return;
    
    let matchesHtml = '';
    const displayLimit = Math.min(limit, allMatches.length);
    
    for (let i = 0; i < displayLimit; i++) {
        const match = allMatches[i];
        const matchDate = match.date.split('T')[0];
        
        matchesHtml += `
            <div class="match-card">
                <div class="match-teams">
                    <div class="team">
                        <span class="team-name">${escapeHtml(match.team1)}</span>
                    </div>
                    <div class="vs">VS</div>
                    <div class="team">
                        <span class="team-name">${escapeHtml(match.team2)}</span>
                    </div>
                </div>
                <div class="match-info">
                    <div class="match-time">🕐 ${match.time}</div>
                    <div class="match-date">📅 ${matchDate}</div>
                    <div class="match-stadium">🏟 ${escapeHtml(match.stadium)}</div>
                    <div class="match-city">📍 ${escapeHtml(match.city)}</div>
                </div>
                <button class="remind-btn" onclick="remindMe('${escapeHtml(match.team1)}', '${escapeHtml(match.team2)}')">🔔 Remind Me</button>
            </div>
        `;
    }
    
    matchesContainer.innerHTML = matchesHtml;
}

// Helper function to prevent XSS
function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

// Function to setup load more button
function setupLoadMoreButton() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (!loadMoreBtn) return;
    
    loadMoreBtn.addEventListener('click', () => {
        const newLimit = currentMatchCount + 8;
        
        if (newLimit >= allMatches.length) {
            displayMatches(allMatches.length);
            loadMoreBtn.textContent = '✓ All Matches Loaded';
            loadMoreBtn.disabled = true;
            loadMoreBtn.style.opacity = '0.5';
            loadMoreBtn.style.cursor = 'not-allowed';
        } else {
            currentMatchCount = newLimit;
            displayMatches(currentMatchCount);
            const remaining = allMatches.length - currentMatchCount;
            loadMoreBtn.textContent = `Load More Matches (${remaining} remaining)`;
        }
    });
}

// Remind Me function
function remindMe(team1, team2) {
    alert(`🔔 Reminder set for ${team1} vs ${team2}!`);
}

// Favorites logic for hotels
function toggleFavs(hotel) {
    let favs = JSON.parse(localStorage.getItem('favs') || '[]');
    if (favs.includes(hotel)) {
        favs = favs.filter(h => h !== hotel);
        alert(`${hotel} removed from favorites!`);
    } else {
        favs.push(hotel);
        alert(`${hotel} added to favorites!`);
    }
    localStorage.setItem('favs', JSON.stringify(favs));
}

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'true') {
    document.body.classList.add('dark-mode');
}
