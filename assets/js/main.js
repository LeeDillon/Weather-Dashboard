$(document).ready(function () {


    var apiURL = "https://api.openweathermap.org/data/2.5/forecast?";
    var key = ",us&mode=xml&appid=8c21109a373ea9296f02d6fcb26e2e52";
    var searchString = "";
    var queryURL;
    // var articleNumber = 0;

    $(".clear").click(function () {
        articleNumber = 0;
        $("#search-string").val("");
        $("#article-results").empty();
    });

    $(".search").on("click", function () {
        $("#article-results").empty();
        articleNumber = 0;
        searchString = $("#search-input").val();
        queryURL = apiURL + "q=" + searchString + key;
        console.log('query: ', queryURL)
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (result) {

            for (i = 0; i < result.response.docs.length; i++) {
                articleNumber++;
                var article = $("<div>");
                article.addClass("well well-lg row");
                var title = $("<h3>");
                title.addClass("title");
                title.text(result.response.docs[i].headline.main);
                var description = $("<p>");
                description.addClass("description");
                description.text(result.response.docs[i].abstract);
                var number = $("<div class='articleNumber'>").text(articleNumber);
                $(article).append(number, title, description);
                $("#article-results").append(article);

            }
        });
    });


});