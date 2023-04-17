// Create the functions for both the geolocation and the weather apis
const APIKey = "677aab76914b67304bfb5faeb8d0a18f";
const searchBar = document.getElementById("location");
const searchButton = document.getElementById("submit");
const weatherDisplay = document.getElementsByClassName("weather-info");
const heading = document.getElementById("city-name");
const description = document.getElementById("description");
const currentTemp = document.getElementById("currentTemp");
const maxTemp = document.getElementById("maxTemp");
const minTemp = document.getElementById("minTemp");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const visibility = document.getElementById("visibility");

document.addEventListener("DOMContentLoaded", event => {
  function geoFetch(input) {
    if (typeof input === "string") {
      return fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${input.trim()}&limit=5&appid=${APIKey}`)
        .then(res => {
          if (res.status === 404) return 404;
          else {
            return res.json().then(json => {
              return [json[0].lat, json[0].lon]
            })
          }
        })
    }
    //   else if (typeof input === Number) {
    //     fetch(`https://api.openweathermap.org/geo/1.0/zip?zip=${input}&appid=${APIKey}`)
    //     .then(res => {
    //       if (res.status === 404) {
    //         return 404;
    //       }
    //       else {
    //         res.json().then(json => {
    //           return [json[0].lat, json[0].lon]
    //         })
    //       }
    //     })
    // }
  }
  async function weatherFetch(input) {
    let coords = await geoFetch(input);
    if (coords === 404) {
      throw new Error("Invalid location input")
    }
    const [lat, lon] = coords;
    return fetch(`https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${lat}&lon=${lon}&appid=${APIKey}`)
      .then(res => res.json()).then((json) => {
        return {
          name: json.name,
          main: json.main,
          weather: json.weather,
          wind: json.wind, 
          visibility: json.visibility
        }
      })
  }

  // Search Bar functionality

  searchButton.addEventListener("click", async event => {
    if (!searchBar.value) return;
    let data = await weatherFetch(searchBar.value);
    heading.innerText = data.name;
    humidity.innerText = data.main.humidity;
    currentTemp.innerText = data.main.temp;
    maxTemp.innerText = data.main.temp_max;
    minTemp.innerText = data.main.temp_min;
    description.innerText = data.weather.main;
    wind.innerText = data.wind.speed;
    visibility.innerText = data.visibility;
    searchBar.value = "";
  })
})
