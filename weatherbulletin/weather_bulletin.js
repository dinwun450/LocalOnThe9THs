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

        var time = h + ":" + m + ":" + s + " " + session;
        document.getElementById("date").innerHTML = time;

        setTimeout(showTime, 1000);
    }

    showTime();

    httpReqIpAsync(ipUrl);

    function httpReqIpAsync(url) {
        var httpReqIp = new XMLHttpRequest();
        httpReqIp.open("GET", url, true);
        httpReqIp.onreadystatechange = function () {
            if (httpReqIp.readyState === 4 && httpReqIp.status === 200) {
                var jsonIp = JSON.parse(httpReqIp.responseText)
                var ip = jsonIp.ip;
                var city = jsonIp.city;
                location.innerHTML = `${city}`;
                var lat = jsonIp.loc.split(",")[0];
                var lon = jsonIp.loc.split(",")[1];
                console.log(lat + " " + lon)
                var weatherApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&${appid}`;
                //calling OpenWeatherMap api function
                httpReqWeatherAsync(weatherApi);
            }
        }
        httpReqIp.send();
    }

    function httpReqWeatherAsync(url) {
        var httpReqWeather = new XMLHttpRequest();
        httpReqWeather.open("GET", url, true);
        httpReqWeather.onreadystatechange = function() {
            if(httpReqWeather.readyState === 4 && httpReqWeather.status === 200) {
                try {
                    var jsonWeather = JSON.parse(httpReqWeather.responseText)
                    var alertsEvent = jsonWeather.alerts.event;
                    var alertsDesc = jsonWeather.alerts.desc;

                    var alertsElem = document.getElementById("alerts");
                    alertsElem.innerHTML = `<h1>${alertsEvent}</h1> <p>${alertsDesc}</p>`
                }
                catch(TypeError) {
                    var NoAlertsElem = document.getElementById("alerts");
                    NoAlertsElem.innerHTML = `There are no alerts in your area currently. Please check again soon.`
                }
            }
        }
        httpReqWeather.send();
    }
}