$(document).ready(function () {


    var apiURL = "https://api.openweathermap.org/data/2.5/forecast?";
    var key = "&mode=json&units=metric&appid=8c21109a373ea9296f02d6fcb26e2e52";
    var searchString = "";
    var queryURL;
    // var articleNumber = 0;

    // $(".clear").click(function () {
    //     articleNumber = 0;
    //     $("#search-string").val("");
    //     $("#article-results").empty();
    // });

    // Function to get city coordinates
    $("#search-button").on("click", function () {
        $("#five-day-forecast").empty();
        // articleNumber = 0;
        searchString = $("#search-input").val();
        queryURL = apiURL + "q=" + searchString + key;
        console.log('query: ', queryURL)
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (result) {




            console.log(result)
            console.log(result.city.coord.lat)
            console.log(result.city.coord.lon)
            var lat = result.city.coord.lat;
            var lon = result.city.coord.lon;
            var fiveKey = "8c21109a373ea9296f02d6fcb26e2e52";

            var fiveDayApiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${fiveKey}`;

            $.ajax({
                url: fiveDayApiURL,
                method: "GET"
            }).then(function (result) {
                console.log(result);
                var forecastArray = result.list;
                var hourInt = 0;
                forecastArray.forEach(element => {
                    hourInt++;
                    
                });

            });


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