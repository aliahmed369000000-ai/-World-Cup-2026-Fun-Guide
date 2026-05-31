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
