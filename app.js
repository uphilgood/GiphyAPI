var topics = ["subaru", "honda", "land rover", "bmw", "lexus"]

        function createButton() {
            var newTopics = topics
            $("#buttons-view").empty()
            for (var i = 0; i < topics.length; i++) {
                var a = $("<button>");
                a.addClass("btn btn-secondary");
                a.text(topics[i]);
                a.attr('onClick', 'getGiphy($(this).html())')
                $("#buttons-view").append(a);
            }
        }

        function getGiphy(gif) {
            var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=ANL1wBop73GYuyhDonxP9gis4JaIoV58&q=" + gif +
                "&limit=10&offset=0&rating=G&lang=en";
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(response => {
                var results = response.data
                results.forEach(data => {
                    var imageDiv = $("<div>")
                    var p = $("<p>").text("rating; " + data.rating).css('text-align','center').css('color', 'azure');
                    var gifImage = $("<img>")
                    gifImage.attr("src", data.images.fixed_height.url)
                        .attr("data-still", data.images.fixed_height_still.url)
                        .attr("data-animate", data.images.fixed_height.url)
                        .attr("datastate", "still")
                        .addClass("gif")
                        .addClass("card-body")
                    imageDiv.append(gifImage).append(p)
                    $("#gifs-appear-here").prepend(imageDiv)
                })
            });
        }

        $(document).on("click", ".gif", function () {
            var state = $(this).attr("data-state")
            console.log(state)
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"))
                $(this).attr("data-state", "animate")

            } else {
                $(this).attr("src", $(this).attr("data-still"))
                $(this).attr("data-state", "still")
            }
        });

        $("#search").click(function (event) {
            event.preventDefault();
            topics.push($("#textinput").val())
            createButton();
            $("#textinput").val('')
        });

        createButton();
