window.onload = function() {
    var ipUrl = "https://ipinfo.io/json";
    var appid = "appid=0e677ad9097d32458226a1c86a7a9c5e";
    var location = document.getElementById("location");
    function showTime() {
        var date = new Date();
        var h = date.getHours();
        var m = date.getMinutes();
        var s = date.getSeconds();
        var session = "AM";

        if(h == 0) {
            h = 12;
        }

        if(h > 12) {
            h = h - 12;
            session = "PM"
        }

        h = (h < 10) ? "0" + h : h;
        m = (m < 10) ? "0" + m : m;
        s = (s < 10) ? "0" + s : s;

        var time = h + ":" + m + ":" + s + " " + session;
        document.getElementById("date").innerHTML = time;

        setTimeout(showTime, 1000);
    }

    showTime();

    httpReqIpAsync(ipUrl);

    function httpReqIpAsync(url, callback) {
        var httpReqIp = new XMLHttpRequest();
        httpReqIp.open("GET", url, true);
        httpReqIp.onreadystatechange = function() {
            if(httpReqIp.readyState == 4 && httpReqIp.status == 200) {
                var jsonIp = JSON.parse(httpReqIp.responseText)
                var ip = jsonIp.ip;
                var city = jsonIp.city;
                location.innerHTML = `${city}`;
                var lat = jsonIp.loc.split(",")[0];
				var lon = jsonIp.loc.split(",")[1];
				console.log(lat+" "+lon)
				var weatherApi = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&${appid}`;
				//calling openweathermap api function
				httpReqWeatherAsync(weatherApi);
            }
        }
        httpReqIp.send();
    }

    function httpReqWeatherAsync(url, callback) {
        var httpReqWeather = new XMLHttpRequest();
        httpReqWeather.open("GET", url, true);
        httpReqWeather.onreadystatechange = function() {
            if(httpReqWeather.readyState == 4 && httpReqWeather.status == 200) {
                var jsonWeather = JSON.parse(httpReqWeather.responseText);
                var id = jsonWeather.current.weather[0].id;
                var icon = `<i class="wi wi-owm-${id}"></i>`
                var temperature = jsonWeather.current.temp;
                var tempFaren = Math.round(1.8 * (temperature - 273) + 32);
                var visibility = jsonWeather.current.visibility;
                var humidity = jsonWeather.current.humidity;
                var dewpoint = jsonWeather.current.dew_point;
                var pressure = jsonWeather.current.pressure;

                var sunset = jsonWeather.current.sunset;
                var date = new Date();
                var currently = Math.round(date / 1000);
                dayornight = (currently < sunset) ? "day" : "night";

                var iconElement = document.getElementById("icon");
                iconElement.innerHTML = `<i class="wi wi-owm-${dayornight}-${id}"></i>`;
                var tempElement = document.getElementById("temp");
                tempElement.innerHTML = `${tempFaren}<i class="wi wi-fahrenheit"></i>`;
                var visibilityElement = document.getElementById("visi");
                visibilityElement.innerHTML = `VISIBILITY: ${visibility} miles`;
                var humidityElement = document.getElementById("humi");
                humidityElement.innerHTML = `HUMIDITY: ${humidity}`;
                var dewpointelem = document.getElementById("dewp");
                dewpointelem.innerHTML = `DEW POINT: ${dewpoint}&deg;`;
                var pressureElement = document.getElementById("prss");
                pressureElement.innerHTML = `PRESSURE: ${pressure}"`;
            }
        }
        httpReqWeather.send();
    }
}