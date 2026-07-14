document.addEventListener("DOMContentLoaded", () => {

    const cityInput = document.getElementById('city');

    if (cityInput) {
        cityInput.addEventListener("keypress", handleEnter);
    }

});


async function getWeather() {

    const city = document.getElementById('city').value.trim();

    const errorMsg = document.getElementById('error-message');
    const loading = document.getElementById('loading');
    const weatherContainer = document.querySelector('.weather-container');


    if (!city) {
        showError("Please enter a city name");
        return;
    }


    const apiKey = "60ebbeb95c6f0ea1bba17f1ada8ed07e";


    const currentWeatherUrl =
        `https://api.openweathermap.org/data/2.5/weather?q=${city},PK&appid=${apiKey}&units=metric`;


    const forecastWeatherUrl =
        `https://api.openweathermap.org/data/2.5/forecast?q=${city},PK&appid=${apiKey}&units=metric`;



    loading.style.display = "block";
    weatherContainer.style.display = "none";
    errorMsg.style.display = "none";



    try {


        // Current weather API

        const currentResponse = await fetch(currentWeatherUrl);


        if (!currentResponse.ok) {

            const err = await currentResponse.json();

            console.log(err);

            throw new Error(err.message);

        }


        const currentData = await currentResponse.json();



        document.getElementById("cityName").textContent =
            currentData.name;


        document.getElementById("temperature").textContent =
            `${Math.round(currentData.main.temp)}°C`;


        document.getElementById("description").textContent =
            currentData.weather[0].description
                .charAt(0).toUpperCase()
            +
            currentData.weather[0].description.slice(1);



        document.getElementById("humidity").textContent =
            `Humidity: ${currentData.main.humidity}%`;


        document.getElementById("wind").textContent =
            `Wind: ${currentData.wind.speed} m/s`;


        document.getElementById("feels-like").textContent =
            `Feels like: ${Math.round(currentData.main.feels_like)}°C`;




        let icon = currentData.weather[0].icon;


        document.querySelector(".current-weather .icon").innerHTML =
            `<img src="https://openweathermap.org/img/wn/${icon}@2x.png">`;



        // Background change

        const weatherCondition =
            currentData.weather[0].main.toLowerCase();


        changeBackground(weatherCondition);





        // Forecast API

        const forecastResponse =
            await fetch(forecastWeatherUrl);


        const forecastData =
            await forecastResponse.json();




        const forecastDays =
            document.querySelectorAll(".day");


        let uniqueDays = [];



        forecastData.list.forEach(item => {


            let date = new Date(item.dt_txt);

            let day = date.getDate();



            if (!uniqueDays.includes(day)
                && uniqueDays.length < 4) {

                uniqueDays.push(day);

            }


        });





        forecastDays.forEach((dayBox, index) => {


            if (uniqueDays[index]) {


                let forecast =
                    forecastData.list.find(item =>
                        new Date(item.dt_txt).getDate()
                        === uniqueDays[index]
                    );



                if (forecast) {



                    let forecastIcon =
                        forecast.weather[0].icon;



                    let weekday =
                        new Date(forecast.dt_txt)
                            .toLocaleDateString(
                                "en-US",
                                {
                                    weekday: "short"
                                }
                            );



                    dayBox.querySelector(".weekday")
                        .textContent = weekday;



                    dayBox.querySelector(".icon")
                        .innerHTML =
                        `<img src="https://openweathermap.org/img/wn/${forecastIcon}@2x.png">`;



                    dayBox.querySelector(".temp")
                        .textContent =
                        `${Math.round(forecast.main.temp)}°C`;



                    dayBox.style.display = "block";


                }


            }
            else {

                dayBox.style.display = "none";

            }



        });




        loading.style.display = "none";
        weatherContainer.style.display = "block";




    }

    catch (error) {


        loading.style.display = "none";
        weatherContainer.style.display = "none";


        showError(error.message);

    }

}





function handleEnter(event) {

    if (event.key === "Enter") {

        getWeather();

    }

}





function showError(message) {


    const errorMsg =
        document.getElementById("error-message");


    errorMsg.textContent = message;


    errorMsg.style.display = "block";


}





function changeBackground(condition) {


    const body =
        document.body;



    body.className = "";



    switch (condition) {


        case "clear":

            body.classList.add("clear");

            break;



        case "clouds":

            body.classList.add("clouds");

            break;



        case "rain":

        case "drizzle":

        case "thunderstorm":

            body.classList.add("rain");

            break;



        case "snow":

            body.classList.add("snow");

            break;



        default:

            body.classList.add("default");

    }



}