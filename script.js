document.getElementById("weatherSubmit").addEventListener("click", event => {
    event.preventDefault()

    const value = document.getElementById("weatherInput").value
    const apikey = "API KEY HERE"

    if (value === "")
        return

    const url = `http://api.openweathermap.org/data/2.5/weather?q=${value},US&units=imperial&APPID=${apikey}`
    fetch(url)
        .then(response => response.json())
        .then(json => {
            let result = ""

            result += `<h2>Weather in ${json.name}</h2>`
            for(let weather of json.weather)
                result += `<img src="https://openweathermap.org/img/w/${weather.icon}.png">`

            result += `<p id="temp">${json.main.temp} &deg;F</p>`
            result += `<p id="feelsLike">(Feels like ${json.main.feels_like} &deg;F)</p>`
            result += `<p id="humidity">Humidity: ${json.main.humidity}%</p>`
            result += `<p id="description">${json.weather.map(item => item.description).join(", ")}</p>`

            document.getElementById("weatherResults").innerHTML = result
        })

    const url2 = `http://api.openweathermap.org/data/2.5/forecast?q=${value},US&units=imperial&APPID=${apikey}`
    fetch(url2)
        .then(response => response.json())
        .then(json => {
            let forecast = ""

            for(let item of json.list) {
                forecast += `<section class="forecast">`
                forecast += `<h3>${moment(item.dt_txt).format("MMMM Do YYYY, h:mm:ss a")}</h3>`
                forecast += `<p class="high">High: ${item.main.temp_max}</p>`
                forecast += `<p class="low">Low: ${item.main.temp_min}</p>`
                forecast += `<img src="http://openweathermap.org/img/w/${item.weather[0].icon}.png">`
                forecast += `</section>`
            }

            document.getElementById("fiveDayHeader").style.display = "block";
            document.getElementById("forecastResults").innerHTML = forecast
        })
})
