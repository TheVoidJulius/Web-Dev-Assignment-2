const consoleBox = document.getElementById("consoleOutput");
const historyBox = document.getElementById("history");
const resultBox = document.getElementById("weatherResult");

let history = [];

/* Dummy weather database */
const weatherDB = {
    indore: {
        city: "Indore, IN",
        temp: "21.1 °C",
        weather: "Haze",
        humidity: "52%",
        wind: "5.14 m/s"
    },
    delhi: {
        city: "Delhi, IN",
        temp: "24.3 °C",
        weather: "Clear",
        humidity: "48%",
        wind: "3.20 m/s"
    }
};

/* Console log */
function log(msg) {
    const div = document.createElement("div");
    div.textContent = msg;
    consoleBox.appendChild(div);
    consoleBox.scrollTop = consoleBox.scrollHeight;
}

/* Search weather */
function getWeather(cityName) {

    const input =
        cityName ||
        document.getElementById("cityInput").value.toLowerCase();

    consoleBox.innerHTML = "";

    log("[Sync] Start");

    setTimeout(() => {

        log("[Async] Start fetching");

        Promise.resolve().then(() => {

            log("[Promise.then] (Microtask)");

            setTimeout(() => {

                log("[setTimeout] (Macrotask)");

                if (weatherDB[input]) {

                    showWeather(weatherDB[input]);
                    addHistory(input);

                    log("[Async] Data received");

                } else {
                    resultBox.innerHTML =
                        `<span style="color:red;">City not found</span>`;
                }

            }, 500);

        });

    }, 500);

    log("[Sync] End");
}

/* Show weather */
function showWeather(data) {
    resultBox.innerHTML = `
        <div><span>City</span><span>${data.city}</span></div>
        <div><span>Temp</span><span>${data.temp}</span></div>
        <div><span>Weather</span><span>${data.weather}</span></div>
        <div><span>Humidity</span><span>${data.humidity}</span></div>
        <div><span>Wind</span><span>${data.wind}</span></div>
    `;
}

/* Add history */
function addHistory(city) {
    if (history.includes(city)) return;

    history.push(city);

    const btn = document.createElement("button");

    btn.textContent =
        city.charAt(0).toUpperCase() + city.slice(1);

    btn.onclick = () => getWeather(city);

    historyBox.appendChild(btn);
}