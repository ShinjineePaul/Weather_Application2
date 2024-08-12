const inputBox = document.querySelector(".input-box");
const searchBtn = document.querySelector(".btn");
const weather_img = document.querySelector(".weather-pic");
const temp = document.querySelector(".temp");
const desc = document.querySelector(".desc");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const location_not_found = document.querySelector(".location-not-found");
const weather_body = document.querySelector('.weatherbody');
let body = document.querySelector("body");
let light = document.querySelector("#light");
let dark = document.querySelector("#dark");
let head = document.querySelector("#head");

async function checkWeather(city) {
    const api_key = "583d3ff59ede62e5189b59166f1d815e";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    const weather_data = await fetch(`${url}`).then(response => response.json());
    
    if (weather_data.cod === `404`) {
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("Error");
        return;
    }
    
    console.log("run");
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";
    temp.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    desc.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind.innerHTML = `${weather_data.wind.speed}Kmph`;
    
    switch (weather_data.weather[0].main) {
        case 'Clouds':
            weather_img.src = "cloudy.png";
            break;
        case 'Thunderstorm':
            weather_img.src = "thunderstorm.png";
            break;
        case 'Clear':
            weather_img.src = "sunny.png";
            break;
        case 'Rain':
            weather_img.src = "rain.png";
            break;
        case 'Mist':
            weather_img.src = "hazy.png";
            break;
        case 'Snow':
            weather_img.src = "snow.png";
            break;
    }
    console.log(weather_data);
}

async function checkWeatherByCoords(lat, lon) {
    const api_key = "583d3ff59ede62e5189b59166f1d815e";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;
    const weather_data = await fetch(`${url}`).then(response => response.json());
    
    if (weather_data.cod === `404`) {
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("Error");
        return;
    }
    
    console.log("run");
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";
    temp.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    desc.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind.innerHTML = `${weather_data.wind.speed}Kmph`;
    
    switch (weather_data.weather[0].main) {
        case 'Clouds':
            weather_img.src = "cloudy.png";
            break;
        case 'Thunderstorm':
            weather_img.src = "thunderstorm.png";
            break;
        case 'Clear':
            weather_img.src = "sunny.png";
            break;
        case 'Rain':
            weather_img.src = "rain.png";
            break;
        case 'Mist':
            weather_img.src = "hazy.png";
            break;
        case 'Snow':
            weather_img.src = "snow.png";
            break;
    }
    console.log(weather_data);
}

function getCurrentLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            checkWeatherByCoords(lat, lon);
        }, (error) => {
            console.log("Geolocation not available or permission denied.");
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});

light.onclick = function () {
    console.log("The mode dark is chosen.");
    light.style.display = "none";
    dark.style.display = "inline";
    dark.style.backgroundColor = "#060665";
    body.style.background = "linear-gradient(to bottom, #060665, rgb(68, 17, 113))";
    body.style.color = "white";
    head.style.color = "white";
};

dark.onclick = function () {
    console.log("The mode light is chosen.");
    dark.style.display = "none";
    light.style.display = "inline";
    light.style.backgroundColor = "#0664df";
    body.style.background = "linear-gradient(to bottom, #0664df, white)";
    body.style.color = "black";
    head.style.color = "#060665";
};

// Automatically check weather for current location on page load
window.onload = getCurrentLocationWeather;
