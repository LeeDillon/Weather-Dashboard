$(document).ready(function () {

    // Variables needed for API call
    var apiURL = "https://api.openweathermap.org/data/2.5/forecast?";
    var key = "&mode=json&units=metric&appid=8c21109a373ea9296f02d6fcb26e2e52";
    var searchString = "";
    var queryURL;


    // Create empty list for cities
    var listOfSearchedCities = [];
    // Populate the above list of previously searched cities by reading local storage
    for (let i = 0; i < localStorage.length; i++) {
        listOfSearchedCities.push(localStorage.getItem(localStorage.key(i)));
    }

    // Function to remove duplicates from an array
    function removeDuplicates(array) {
        return array.filter((item,
            index) => array.indexOf(item) === index);
    }

    // Remove any duplicates
    var filteredCityList = removeDuplicates(listOfSearchedCities);

    // Loop through updated city list and save each value into storage and make a city button for each
    function generateCityButtons(array) {
        for (let i = 0; i < array.length; i++) {
            const element = array[i];
            localStorage.setItem(i, element);
            var cityButtonEl = $(`<li class="nav-item">
                                        <button class="btn btn-outline-secondary save-btn cityButton mb-3" type="button" id="button-addon2">${element}</button>
                                     </li>`);
            $('.buttonInsert').append(cityButtonEl);
        }
        // Onclick function that runs when a city button is clicked
        $(".cityButton").on("click", function () {
            // Use text value of button as search parameter
            searchString = "";
            searchString = $(this).text();
            performSearch(searchString);
            console.log(searchString);
        });
    }

    // On page load generate buttons from localStorage
    generateCityButtons(filteredCityList);

    // Function attached to clear button that resets page and local storage
    $("#clear-button").click(function () {
        $("#search-input").val("");
        $('#city-details').empty();
        $('#five-day-forecast').empty();
        $('.buttonInsert').empty();
        localStorage.clear();
        filteredCityList = [];
        listOfSearchedCities = [];
    });

    // Onclick function that runs when submit button is clicked
    $("#search-button").on("click", function () {
        searchString = $("#search-input").val();
        performSearch(searchString);
        console.log(searchString);
    });



    // Main function that runs search and populates page with results
    function performSearch(searchString) {
        // Clear page of previously loaded info
        $('#city-details').empty();
        $("#five-day-forecast").empty();

        queryURL = apiURL + "q=" + searchString + key;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (result) {
            console.log()
            // Get current date and convert to desired format
            var now = moment();
            var currentDate = now.format("D/M/YYYY");

            // Get city name from results
            var cityName = result.city.name;

            // Add the currently searched city to the list
            listOfSearchedCities.push(cityName);

            // Filter list to remove duplicates
            var filteredCityList = removeDuplicates(listOfSearchedCities);

            // Empty local storage so that new list can be inserted
            localStorage.clear();

            // Delete existing buttons before making new ones
            $('.buttonInsert').empty();

            // When submit button is clicked update list of buttons to include new city
            generateCityButtons(filteredCityList);

            // Get city name and insert to title along with today's date
            var cityNameEl = $("<h3>");
            cityNameEl.addClass("cityName");
            cityNameEl.text(`${cityName} (${currentDate})`);
            // Get city temp and insert into page
            var cityTemp = $("<p>");
            cityTemp.addClass("cityTemp");
            cityTemp.text("Current temperature: " + Math.round(parseInt(result.list[0].main.temp)) + "°C");
            // Get city humidity and insert into page
            var cityHumid = $("<p>");
            cityHumid.addClass("cityHumid");
            cityHumid.text("Current humidity: " + result.list[0].main.humidity + "%");
            // Get city wind speed and insert into page
            var cityWind = $("<p>");
            cityWind.addClass("cityWind");
            cityWind.text("Wind Speed: " + result.list[0].wind.speed + " km/h");
            // Insert information elements into city details section
            $('#city-details').append(cityNameEl, cityTemp, cityHumid, cityWind);
            // Take array for 40 forecast objects and assign to variable
            var forecastArray = result.list;

            // Create variable for the purpose of incrementing days
            var daysToAdd = 0;
            // For loop that moves forward 8 items at a time to create 5 cards out of the 40 items that give info for each day
            for (let i = 0; i < forecastArray.length; i += 8) {
                const element = forecastArray[i];
                // From each element in the array get the icon info and insert into card
                var weatherIcon = element.weather[0].icon;
                var weatherIconAlt = element.weather[0].description;
                var weatherIconURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"
                // Format the date of each card by using days to add variable. Then get weather info to populate card
                var cardDate = moment().add(daysToAdd, 'days').format("D/M/YYYY");
                var cardTemp = Math.round(parseInt(element.main.temp));
                var cardWind = element.wind.speed;
                var cardHumid = element.main.humidity;
                daysToAdd++
                // Code to dynamically generate a forecast card and populate variables using template literals that use above variables
                $('#five-day-forecast').append(`
                <div class="col">
                    <div class="card mb-3">
                        <img src=${weatherIconURL} class="card-img-top" alt=${weatherIconAlt}>
                            <div class="card-body">
                                <h5 class="card-title">${cardDate}</h5>
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">Temp: ${cardTemp}°C</li>
                                <li class="list-group-item">Wind: ${cardWind} km/h</li>
                                <li class="list-group-item">Humidity: ${cardHumid}%</li>
                            </ul>
                    </div>
                </div>`)
            };
        });
    };
});