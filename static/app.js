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
    let days = Math.floor(gap / (1000 * 60 * 60 * 24));
    let hours = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((gap % (1000 * 60)) / 1000);
    
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
}, 1000);

// Global variables
let allMatches = [];
let currentMatchCount = 8;
let matchesContainer = document.getElementById('matchesContainer');

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
            matchesContainer.innerHTML = '<p style="color: red;">Error loading matches. Please try again later.</p>';
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
                        <span class="team-name">${match.team1}</span>
                    </div>
                    <div class="vs">VS</div>
                    <div class="team">
                        <span class="team-name">${match.team2}</span>
                    </div>
                </div>
                <div class="match-info">
                    <div class="match-time">🕐 ${match.time}</div>
                    <div class="match-date">📅 ${matchDate}</div>
                    <div class="match-stadium">🏟 ${match.stadium}</div>
                    <div class="match-city">📍 ${match.city}</div>
                </div>
                <button class="remind-btn" onclick="remindMe('${match.team1}', '${match.team2}')">🔔 Remind Me</button>
            </div>
        `;
    }
    
    matchesContainer.innerHTML = matchesHtml;
}

// Function to setup load more button
function setupLoadMoreButton() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (!loadMoreBtn) return;
    
    loadMoreBtn.addEventListener('click', () => {
        const newLimit = currentMatchCount + 8;
        
        if (newLimit >= allMatches.length) {
            displayMatches(allMatches.length);
            loadMoreBtn.textContent = 'All Matches Loaded';
            loadMoreBtn.disabled = true;
            loadMoreBtn.style.opacity = '0.5';
            loadMoreBtn.style.cursor = 'not-allowed';
        } else {
            currentMatchCount = newLimit;
            displayMatches(currentMatchCount);
            loadMoreBtn.textContent = `Load More Matches (${allMatches.length - currentMatchCount} remaining)`;
        }
    });
}

// Remind Me function
function remindMe(team1, team2) {
    alert(`Reminder set for ${team1} vs ${team2}!`);
    // You can enhance this to save to localStorage or send notification
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

// Search functionality (if needed)
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredMatches = allMatches.filter(match => 
            match.city.toLowerCase().includes(searchTerm) ||
            match.team1.toLowerCase().includes(searchTerm) ||
            match.team2.toLowerCase().includes(searchTerm)
        );
        
        if (searchTerm.length > 0) {
            displayFilteredMatches(filteredMatches);
        } else {
            displayMatches(currentMatchCount);
        }
    });
}

function displayFilteredMatches(filteredMatches) {
    if (!matchesContainer) return;
    
    let matchesHtml = '';
    for (let i = 0; i < filteredMatches.length; i++) {
        const match = filteredMatches[i];
        const matchDate = match.date.split('T')[0];
        
        matchesHtml += `
            <div class="match-card">
                <div class="match-teams">
                    <div class="team">
                        <span class="team-name">${match.team1}</span>
                    </div>
                    <div class="vs">VS</div>
                    <div class="team">
                        <span class="team-name">${match.team2}</span>
                    </div>
                </div>
                <div class="match-info">
                    <div class="match-time">🕐 ${match.time}</div>
                    <div class="match-date">📅 ${matchDate}</div>
                    <div class="match-stadium">🏟 ${match.stadium}</div>
                    <div class="match-city">📍 ${match.city}</div>
                </div>
                <button class="remind-btn" onclick="remindMe('${match.team1}', '${match.team2}')">🔔 Remind Me</button>
            </div>
        `;
    }
    
    matchesContainer.innerHTML = matchesHtml;
}

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'true') {
    document.body.classList.add('dark-mode');
}
