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
    input = input.split(' ').join(',')
    if (input) {
      return fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${APIKey}`)
        .then(res => {
          if (res.status === 404) return 404;
          else {
            return res.json()
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
  // async function weatherFetch(input) {

  //   let coords = await geoFetch(input);
  //   coords.map(el => {
  //     if (el.name)
  //   })
  //   if (coords === 404) {
  //     throw new Error("Invalid location input")
  //   }
  //   const [lat, lon] = coords;
  //   console.log(`https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${lat.toFixed(14)}&lon=${lon.toFixed(14)}&appid=${APIKey}`);
  //   return fetch(`https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${lat.toFixed(14)}&lon=${lon.toFixed(14)}&appid=${APIKey}`)
  //     .then(res => res.json()).then((json) => {
  //       console.log(json);
  //       return {
  //         name: json.name,
  //         main: json.main,
  //         weather: json.weather,
  //         wind: json.wind, 
  //         visibility: json.visibility
  //       }
  //     })
  // }

  // Search Bar functionality

  searchButton.addEventListener("click", async event => {
    if (!searchBar.value) return;

    let cityObjects = await geoFetch(searchBar.value);
    const coords = [cityObjects[0].lat, cityObjects[0].lon];
    if (coords === 404) {
      throw new Error("Invalid location input")
    }
    const [lat, lon] = coords;
    
    
    let tempVar = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${lat}&lon=${lon}&appid=${APIKey}`)
    .then(res => res.json())
    console.log(tempVar, "++++++++++++++++++++");

      
    // let data = await weatherFetch(searchBar.value);
    heading.innerText = tempVar.name;
    humidity.innerText = tempVar.main.humidity + "%";
    currentTemp.innerText = tempVar.main.temp + " °F";
    maxTemp.innerText = tempVar.main.temp_max  + " °F";
    minTemp.innerText = tempVar.main.temp_min  + " °F";
    description.innerText = tempVar.weather[0].main;
    wind.innerText = tempVar.wind.speed + " mph";
    visibility.innerText = (tempVar.visibility / 1000) + " km";
    searchBar.value = "";
  })
})
