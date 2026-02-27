async function loadSteamGames() {
    const WORKER_URL = 'https://steam-games-1.muebleaga49.workers.dev/'; // Your new worker 
    const container = document.getElementById('steam-games-container');

    try {
        const response = await fetch(WORKER_URL);
        
        // Check if the worker is returning the Error 1101 seen in your logs [cite: 1, 10]
        if (!response.ok) {
            throw new Error(`Worker Error: ${response.status}`); 
        }

        const data = await response.json();
        
        // v1.json shows your data structure is response -> games
        if (data.response && data.response.games) {
            displayGames(data.response.games);
        } else {
            container.innerHTML = "No games found or profile is private.";
        }
    } catch (error) {
        console.error("Fetch failed:", error);
        container.innerHTML = "Failed to load Steam library.";
    }
}

function displayGames(games) {
    const container = document.getElementById('steam-games-container');
    container.innerHTML = games.map(game => `
        <div class="game-card">
            <img src="https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg" alt="${game.name}">
            <p>${game.name}</p>
        </div>
    `).join('');
}

// Run the function when the page loads
loadSteamGames();