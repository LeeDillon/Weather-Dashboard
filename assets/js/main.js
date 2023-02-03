$(document).ready(function () {



    // var articleNumber = 0;

    // $(".clear").click(function () {
    //     articleNumber = 0;
    //     $("#search-string").val("");
    //     $("#article-results").empty();
    // });    

    var apiURL = "https://api.openweathermap.org/data/2.5/forecast?";
    var key = "&mode=json&units=metric&appid=8c21109a373ea9296f02d6fcb26e2e52";
    var searchString = "";
    var queryURL;

    // Function to get city coordinates
    $("#search-button").on("click", function () {
        // $("#five-day-forecast").empty();
        searchString = $("#search-input").val();
        console.log(searchString)
        queryURL = apiURL + "q=" + searchString + key;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (result) {




            console.log(result)
            console.log(result.list)
            console.log(result.list[0])

            var cityName = $("<h3>");
            cityName.addClass("cityName");
            cityName.text(result.city.name);

            var cityTemp = $("<p>");
            cityTemp.addClass("cityTemp");
            cityTemp.text("Current temperature: " + Math.round(parseInt(result.list[0].main.temp)) + "°C");

            var cityHumid = $("<p>");
            cityHumid.addClass("cityHumid");
            cityHumid.text("Current humidity: " + result.list[0].main.humidity + "%");

            var cityWind = $("<p>");
            cityWind.addClass("cityWind");
            cityWind.text("Wind Speed: " + result.list[0].wind.speed + " km/h");

            $('#city-details').append(cityName, cityTemp, cityHumid, cityWind);

            // var forecastArray = result.list;
            //     var hourInt = 0;
            //     forecastArray.forEach(element => {
            //         var weatherIcon = 
            //         var weatherIconURL = "http://openweathermap.org/img/wn/10d@2x.png"

            //         $('#five-day-forecast').append(`<div class="card" style="width: 18rem;">
            //             <img src="..." class="card-img-top" alt="...">
            //                 <div class="card-body">
            //                     <h5 class="card-title">Card title</h5>
            //                     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            //                 </div>
            //                 <ul class="list-group list-group-flush">
            //                     <li class="list-group-item">An item</li>
            //                     <li class="list-group-item">A second item</li>
            //                     <li class="list-group-item">A third item</li>
            //                 </ul>
            //                 <div class="card-body">
            //                     <a href="#" class="card-link">Card link</a>
            //                     <a href="#" class="card-link">Another link</a>
            //                 </div>
            //         </div>`)


            //         hourInt+=8;

            //     });

            // console.log(result.city.coord.lat)
            // console.log(result.city.coord.lon)
            // var lat = result.city.coord.lat;
            // var lon = result.city.coord.lon;
            // var fiveKey = "8c21109a373ea9296f02d6fcb26e2e52&units=metric";

            // var fiveDayApiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${fiveKey}`;

            // $.ajax({
            //     url: fiveDayApiURL,
            //     method: "GET"
            // }).then(function (result) {
            //     console.log(result);
            //     var forecastArray = result.list;
            //     var hourInt = 0;
            //     forecastArray.forEach(element => {
            //         hourInt++;

            //     });

            // });


            // for (i = 0; i < result.response.docs.length; i++) {
            //     articleNumber++;
            //     var article = $("<div>");
            //     article.addClass("well well-lg row");
            //     var title = $("<h3>");
            //     title.addClass("title");
            //     title.text(result.response.docs[i].headline.main);
            //     var description = $("<p>");
            //     description.addClass("description");
            //     description.text(result.response.docs[i].abstract);
            //     var number = $("<div class='articleNumber'>").text(articleNumber);
            //     $(article).append(number, title, description);
            //     $("#article-results").append(article);

            // }
        });
    });


});