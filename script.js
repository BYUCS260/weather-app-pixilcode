document.getElementById("weatherSubmit").addEventListener("click", event => {
    event.preventDefault()

    const value = document.getElementById("weatherInput").value
    const apikey = "0e07a75ad1abaddf45a9a06927a7e7d0"

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

            result += `<h2>${json.main.temp} &deg;F</h2>`
            result += `<p>${json.weather.map(item => item.description).join(", ")}</p>`

            document.getElementById("weatherResults").innerHTML = result
        })

    const url2 = `http://api.openweathermap.org/data/2.5/forecast?q=${value},US&units=imperial&APPID=${apikey}`
    fetch(url2)
        .then(response => response.json())
        .then(json => {
            let forecast = ""

            for(let item of json.list) {
                forecast += `<h2>${moment(item.dt_txt).format("MMMM Do YYYY, h:mm:ss a")}</h2>`
                forecast += `<p>Temperature: ${item.main.temp}</p>`
                forecast += `<img src="http://openweathermap.org/img/w/${item.weather[0].icon}.png">`
            }

            document.getElementById("forecastResults").innerHTML = forecast
        })
})
