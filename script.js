async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();

    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    // Call the local Flask backend instead of the OpenWeather API directly
    const url = `http://127.0.0.1:5000/weather?city=${city}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Handle errors from the backend or API
        if (response.status !== 200 || data.cod === "404") {
            alert(data.message || data.error || "City not found!");
            return;
        }

        displayWeather(data);
    } catch (error) {
        alert("Error fetching weather data. Make sure your Flask backend is running!");
        console.error("Fetch error:", error);
    }
}

function displayWeather(data) {
    const weatherInfo = document.getElementById("weatherInfo");

    weatherInfo.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <h3>${data.weather[0].description}</h3>
        <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon" class="weather-icon">
        <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
        <p><strong>Feels Like:</strong> ${data.main.feels_like}°C</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    `;
}

// Listen for the "Enter" key to trigger the search
document.getElementById("cityInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        getWeather();
    }
});
