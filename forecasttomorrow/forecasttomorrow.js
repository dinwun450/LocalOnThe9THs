window.onload = function() {
    const ipUrl = "https://ipinfo.io/json";
    const appId = "appid=0e677ad9097d32458226a1c86a7a9c5e";
    const location = document.getElementById("location");

    function showTime() {
        const date = new Date();
        let h = date.getHours();
        let m = date.getMinutes();
        let s = date.getSeconds();
        let session = "AM";

        if(h === 0) {
            h = 12;
        }

        if(h > 12) {
            h = h - 12;
            session = "PM"
        }

        h = (h < 10) ? "0" + h : h;
        m = (m < 10) ? "0" + m : m;
        s = (s < 10) ? "0" + s : s;

        document.getElementById("date").innerHTML = h + ":" + m + ":" + s + " " + session;

        setTimeout(showTime, 1000);
    }

    showTime();

    httpReqIpAsync(ipUrl);

    function httpReqIpAsync(url) {
        const httpReqIp = new XMLHttpRequest();
        httpReqIp.open("GET", url, true);
        httpReqIp.onreadystatechange = function() {
            if(httpReqIp.readyState === 4 && httpReqIp.status === 200) {
                const jsonIp = JSON.parse(httpReqIp.responseText)
                const city = jsonIp.city;
                location.innerHTML = `${city}`;
                const lat = jsonIp.loc.split(",")[0];
                const lon = jsonIp.loc.split(",")[1];
                console.log(lat+" "+lon)
                const weatherApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&${appId}`;
                //calling OpenWeatherMap api function
                httpReqWeatherAsync(weatherApi);
            }
        }
        httpReqIp.send();
    }

    function httpReqWeatherAsync(url) {
        const httpReqWeather = new XMLHttpRequest();
        httpReqWeather.open("GET", url, true);
        httpReqWeather.onreadystatechange = function() {
            if(httpReqWeather.readyState === 4 && httpReqWeather.status === 200) {
                const jsonWeather = JSON.parse(httpReqWeather.responseText);
                const id = jsonWeather.daily[0].weather[0].id;
                const temp = jsonWeather.daily[0].temp.day;
                const tempToFahrenheit = Math.round(1.8 * (temp - 273) + 32);
                const wind_speed = jsonWeather.daily[0].wind_speed;
                const desc = jsonWeather.daily[0].weather[0].description;

                const iconElement = document.getElementById("icon");
                iconElement.innerHTML = `<i class="wi wi-owm-${id}"></i>`;
                const tempElement = document.getElementById("temp");
                tempElement.innerHTML = `${tempToFahrenheit}<i class="wi wi-fahrenheit"></i>`;
                const descElement = document.getElementById("desc");
                descElement.innerHTML = `Tomorrow, the weather is ${desc}. With temps to ${tempToFahrenheit}&deg; and winds up to ${wind_speed} mph.`
            }
        }
        httpReqWeather.send();
    }
}