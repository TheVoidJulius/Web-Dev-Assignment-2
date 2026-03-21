// TARGET ELEMENTS
const API_KEY = "15a8822da5d5d7c6affe4e1f2c68c650";
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const hero = document.getElementById("hero");
const detailGrid = document.getElementById("detailGrid");
const historyBox = document.getElementById("history");



// WEATHER API FETCHING
async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);

    if (!response.ok) {
        alert("City not found. Please check the spelling.");
        throw new Error("City not found. Please check the spelling.");
    }

    const data = await response.json();
    return data;
}

// BUTTON CLICK
document.getElementById("searchBtn").onclick = () => {
const city = cityInput.value.trim();
if (city) {
    search(city);
}
}; 

// UI RENDERING
function renderWeather(d) {
    hero.innerHTML = `
        <div class="hero-content">
            <div class="hero-left">
                <div class="city-name">${d.name}</div>
                <div class="country">${d.sys.country}</div>
                <div class="condition">${d.weather[0].description}</div>
            </div>
            <div class="hero-right">
                <span class="big-temp">${Math.round(d.main.temp)}<span class="unit">°C</span></span>
            </div>
        </div>
    `;


    detailGrid.innerHTML = `
        <div class="detail-card">
            <div class="label">Feels Like</div>
            <div class="value">${Math.round(d.main.feels_like)}°</div>
            <div class="sub">Apparent temp</div>
        </div>
        <div class="detail-card">
            <div class="label">Humidity</div>
            <div class="value">${d.main.humidity}%</div>
            <div class="sub">Relative humidity</div>
        </div>
        <div class="detail-card">
            <div class="label">Wind</div>
            <div class="value">${d.wind.speed}</div>
            <div class="sub">m/s speed</div>
        </div>
        <div class="detail-card">
            <div class="label">Pressure</div>
            <div class="value">${d.main.pressure}</div>
            <div class="sub">hPa</div>
        </div>
    `;
}


// SAVE CITY TO LOCAL STORAGE

function saveHistory(city) {
    let history = JSON.parse(localStorage.getItem("weatherHistory")) || [];

    if (!history.includes(city)) {
        history.push(city);
        localStorage.setItem("weatherHistory", JSON.stringify(history));
    }

    showHistory();
}


// SHOW HISTORY BUTTONS
function showHistory() {
    let history = JSON.parse(localStorage.getItem("weatherHistory")) || [];
    historyBox.innerHTML = "";

    history.forEach(function(city) {
        const btn = document.createElement("button");
        btn.textContent = city;
        btn.onclick = function() {
            search(city);
        };
        historyBox.appendChild(btn);
    });
}


// SEARCH FUNCTION
async function search(city) {
    // Show loading inside hero
    hero.innerHTML = `<p class="loading">Fetching weather for "${city}"…</p>`;
    detailGrid.innerHTML = "";

    try {
        const data = await getWeather(city);
        renderWeather(data);
        saveHistory(data.name);
    } catch (error) {
        hero.innerHTML = `<p class="error">${error.message}</p>`;
    }
}



searchBtn.onclick = function() {
    const city = cityInput.value.trim();
    if (city) search(city);
};


// ENTER KEY SEARCH
cityInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        const city = cityInput.value.trim();
        if (city) search(city);
    }
});

showHistory();