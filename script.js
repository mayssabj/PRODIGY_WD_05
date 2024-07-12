function fetchWeather() {
    const location = document.getElementById('location-input').value.trim();
    if (!location) {
        alert('Please enter a location');
        return;
    }

    const apiKey = '8cd75c69926b4866aaa231313240907'; // Replace YOUR_API_KEY with your actual API key from WeatherAPI.com
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                throw new Error(data.error.message);
            }
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
            alert('Failed to retrieve data: ' + error.message);
        });
}

function displayWeather(data) {
    const weatherDataDiv = document.getElementById('weather-data');
    const current = data.current;
    weatherDataDiv.innerHTML = `
        <p>Location: ${data.location.name}, ${data.location.country}</p>
        <p>Temperature: ${current.temp_c} °C</p>
        <p>Weather: ${current.condition.text}</p>
        <p>Humidity: ${current.humidity}%</p>
        <p>Wind Speed: ${current.wind_kph} km/h</p>
    `;
}
