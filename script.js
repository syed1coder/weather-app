const apiKey = "ca2cd9c3047cfd1f7011900a288c1bd2"; 

async function getWeather() {
    const city = document.getElementById("cityInput").value;
    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === "404") {
            alert("City not found!");
            return;
        }

 async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    
    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    const url = `http://localhost:5000/weather?city=${city}`;  // Change to Flask or Node.js backend URL

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.status !== 200) {
            alert(data.message || "City not found!");
            return;
        }

        displayWeather(data);
    } catch (error) {
        alert("Error fetching weather data. Please try again later.");
        console.error(error);
    }
}

function displayWeather(data) {
    const weatherInfo = document.getElementById("weatherInfo");
    
    weatherInfo.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <h3>${data.weather[0].description}</h3>
        <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon">
        <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
        <p><strong>Feels Like:</strong> ${data.main.feels_like}°C</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    `;
}

// Add event listener to call getWeather() when user presses Enter
document.getElementById("cityInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        getWeather();
    }
});
       displayWeather(data);
    } catch (error) {
        alert("Error fetching weather data.");
        console.error(error);
    }
}

function displayWeather(data) {
    const weatherInfo = document.getElementById("weatherInfo");
    weatherInfo.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <h3>${data.weather[0].main}</h3>
        <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather Icon">
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}
