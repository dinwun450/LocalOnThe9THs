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

    function httpReqIpAsync(url, callback) {
        var httpReqIp = new XMLHttpRequest();
        httpReqIp.open("GET", url, true);
        httpReqIp.onreadystatechange = function() {
            if(httpReqIp.readyState === 4 && httpReqIp.status === 200) {
                var jsonIp = JSON.parse(httpReqIp.responseText)
                var ip = jsonIp.ip;
                var city = jsonIp.city;
                location.innerHTML = `${city}`;
                var lat = jsonIp.loc.split(",")[0];
                var lon = jsonIp.loc.split(",")[1];
                console.log(lat+" "+lon)
                var weatherApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&${appid}`;
                //calling OpenWeatherMap api function
                httpReqWeatherAsync(weatherApi);
            }
        }
        httpReqIp.send();
    }

    function httpReqWeatherAsync(url, callback) {
        var httpReqWeather = new XMLHttpRequest();
        httpReqWeather.open("GET", url, true);
        httpReqWeather.onreadystatechange = function() {
            if(httpReqWeather.readyState === 4 && httpReqWeather.status === 200) {
                var jsonWeather = JSON.parse(httpReqWeather.responseText)

                var id_zero = jsonWeather.daily[0].weather[0].id;
                var temp_zero = jsonWeather.daily[0].temp.day;
                var Fahrenheit_Zero = Math.round(1.8 * (temp_zero - 273) + 32);
                var wind_speed_zero = jsonWeather.daily[0].wind_speed;
                var desc_zero = jsonWeather.daily[0].weather[0].description;
                
                var id_one = jsonWeather.daily[1].weather[0].id;
                var temp_one = jsonWeather.daily[1].temp.day;
                var Fahrenheit_One = Math.round(1.8 * (temp_one - 273) + 32);
                var wind_speed_one = jsonWeather.daily[1].wind_speed;
                var desc_one = jsonWeather.daily[1].weather[0].description;

                var id_two = jsonWeather.daily[2].weather[0].id;
                var temp_two = jsonWeather.daily[2].temp.day;
                var Fahrenheit_Two = Math.round(1.8 * (temp_two - 273) + 32);
                var wind_speed_two = jsonWeather.daily[2].wind_speed;
                var desc_two = jsonWeather.daily[2].weather[0].description;

                var id_three = jsonWeather.daily[3].weather[0].id;
                var temp_three = jsonWeather.daily[3].temp.day;
                var Fahrenheit_Three = Math.round(1.8 * (temp_three - 273) + 32);
                var wind_speed_three = jsonWeather.daily[3].wind_speed;
                var desc_three = jsonWeather.daily[3].weather[0].description;

                var id_four = jsonWeather.daily[4].weather[0].id;
                var temp_four = jsonWeather.daily[4].temp.day;
                var Fahrenheit_Four = Math.round(1.8 * (temp_four - 273) + 32);
                var wind_speed_four = jsonWeather.daily[4].wind_speed;
                var desc_four = jsonWeather.daily[4].weather[0].description;

                var id_five = jsonWeather.daily[5].weather[0].id;
                var temp_five = jsonWeather.daily[5].temp.day;
                var Fahrenheit_Five = Math.round(1.8 * (temp_five - 273) + 32);
                var wind_speed_five = jsonWeather.daily[5].wind_speed;
                var desc_five = jsonWeather.daily[5].weather[0].description;

                var id_six = jsonWeather.daily[6].weather[0].id;
                var temp_six = jsonWeather.daily[6].temp.day;
                var Fahrenheit_Six = Math.round(1.8 * (temp_six - 273) + 32);
                var wind_speed_six = jsonWeather.daily[6].wind_speed;
                var desc_six = jsonWeather.daily[6].weather[0].description;

                var id_seven = jsonWeather.daily[7].weather[0].id;
                var temp_seven = jsonWeather.daily[7].temp.day;
                var Fahrenheit_Seven = Math.round(1.8 * (temp_seven - 273) + 32);
                var wind_speed_seven = jsonWeather.daily[7].wind_speed;
                var desc_seven = jsonWeather.daily[7].weather[0].description;

                var iconElement = document.getElementById("icon");
                iconElement.innerHTML = `<i class="wi wi-owm-${id_zero}"></i>`;
                var tempElement = document.getElementById("temp");
                tempElement.innerHTML = `${Fahrenheit_Zero}<i class="wi wi-fahrenheit"></i>`;
                var windElement = document.getElementById("wind");
                windElement.innerHTML = `${wind_speed_zero} mph`;
                var descElement = document.getElementById("desc");
                descElement.innerHTML = `${desc_zero}`;

                var iconElementOne = document.getElementById("icon1");
                iconElementOne.innerHTML = `<i class="wi wi-owm-${id_one}"></i>`;
                var tempElementOne = document.getElementById("temp1");
                tempElementOne.innerHTML = `${Fahrenheit_One}<i class="wi wi-fahrenheit"></i>`;
                var windElementOne = document.getElementById("wind1");
                windElementOne.innerHTML = `${wind_speed_one} mph`;
                var descElementOne = document.getElementById("desc1");
                descElementOne.innerHTML = `${desc_one}`;

                var iconElementTwo = document.getElementById("icon2");
                iconElementTwo.innerHTML = `<i class="wi wi-owm-${id_two}"></i>`;
                var tempElementTwo = document.getElementById("temp2");
                tempElementTwo.innerHTML = `${Fahrenheit_Two}<i class="wi wi-fahrenheit"></i>`;
                var windElementTwo = document.getElementById("wind2");
                windElementTwo.innerHTML = `${wind_speed_two} mph`;
                var descElementTwo = document.getElementById("desc2");
                descElementTwo.innerHTML = `${desc_two}`;

                var iconElementThree = document.getElementById("icon3");
                iconElementThree.innerHTML = `<i class="wi wi-owm-${id_three}"></i>`;
                var tempElementThree = document.getElementById("temp3");
                tempElementThree.innerHTML = `${Fahrenheit_Three}<i class="wi wi-fahrenheit"></i>`;
                var windElementThree = document.getElementById("wind3");
                windElementThree.innerHTML = `${wind_speed_three} mph`;
                var descElementThree = document.getElementById("desc3");
                descElementThree.innerHTML = `${desc_three}`;

                var iconElementFour = document.getElementById("icon4");
                iconElementFour.innerHTML = `<i class="wi wi-owm-${id_four}"></i>`;
                var tempElementFour = document.getElementById("temp4");
                tempElementFour.innerHTML = `${Fahrenheit_Four}<i class="wi wi-fahrenheit"></i>`;
                var windElementFour = document.getElementById("wind4");
                windElementFour.innerHTML = `${wind_speed_four} mph`;
                var descElementFour = document.getElementById("desc4");
                descElementFour.innerHTML = `${desc_four}`;

                var iconElementFive = document.getElementById("icon5");
                iconElementFive.innerHTML = `<i class="wi wi-owm-${id_five}"></i>`;
                var tempElementFive = document.getElementById("temp5");
                tempElementFive.innerHTML = `${Fahrenheit_Five}<i class="wi wi-fahrenheit"></i>`;
                var windElementFive = document.getElementById("wind5");
                windElementFive.innerHTML = `${wind_speed_five} mph`;
                var descElementFive = document.getElementById("desc5");
                descElementFive.innerHTML = `${desc_five}`;

                var iconElementSix = document.getElementById("icon6");
                iconElementSix.innerHTML = `<i class="wi wi-owm-${id_six}"></i>`;
                var tempElementSix = document.getElementById("temp6");
                tempElementSix.innerHTML = `${Fahrenheit_Six}<i class="wi wi-fahrenheit"></i>`;
                var windElementSix = document.getElementById("wind6");
                windElementSix.innerHTML = `${wind_speed_six} mph`;
                var descElementSix = document.getElementById("desc6");
                descElementSix.innerHTML = `${desc_six}`;

                var iconElementSeven = document.getElementById("icon7");
                iconElementSix.innerHTML = `<i class="wi wi-owm-${id_seven}"></i>`;
                var tempElementSeven = document.getElementById("temp7");
                tempElementSeven.innerHTML = `${Fahrenheit_Seven}<i class="wi wi-fahrenheit"></i>`;
                var windElementSeven = document.getElementById("wind7");
                windElementSeven.innerHTML = `${wind_speed_seven} mph`;
                var descElementSeven = document.getElementById("desc7");
                descElementSeven.innerHTML = `${desc_seven}`;
            }
        }
        httpReqWeather.send();
    }
}
