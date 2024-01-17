// OpenWeatherMap API key
const apikey = "bd5e378503939ddaee76f12ad7a97608";

// DOM elements
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// Function to generate the API URL based on the city
const url = (city) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

// Async function to fetch weather data from the API
async function getWeatherByLocation(city) {
    // Fetch weather data with CORS enabled
    const resp = await fetch(url(city), { origin: "cors" });
    
    // Parse the JSON response
    const respData = await resp.json();

    // Log the response data to the console
    console.log(respData);

    // Update the HTML page with the weather information
    addWeatherToPage(respData);
}

// Function to add weather information to the HTML page
function addWeatherToPage(data) {
    // Convert temperature from Kelvin to Celsius
    const temp = KtoC(data.main.temp);

    // Create a new div for weather information
    const weather = document.createElement("div");
    weather.classList.add("weather");

    // Populate the div with weather information
    weather.innerHTML = `
        <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
         ${temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
        <small>${data.weather[0].main}</small>
    `;

    // Clear previous weather information
    main.innerHTML = "";

    // Append the new weather information to the main div
    main.appendChild(weather);
}

// Function to convert temperature from Kelvin to Celsius
function KtoC(K) {
    return Math.floor(K - 273.15);
}

// Event listener for the form submission
form.addEventListener("submit", (e) => {
    // Prevent the default form submission
    e.preventDefault();

    // Get the city value from the search input
    const city = search.value;

    // If a city is provided, fetch and display weather information
    if (city) {
        getWeatherByLocation(city);
    }
});
