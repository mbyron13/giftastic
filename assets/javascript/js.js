var topics = ["castlevania", "mega man", "resident evil", "silent hill", "elder scrolls"];



function addToArray(){
    topics.push($("#giftosearch").val());
    $("#giftosearch").val('');
    }


function createButtons(){
    $(".deleteme").remove();
    for(var i=0; i < topics.length; i++){
        $("#buttonholder").append("<button id="+ topics[i].replace('\\s', '') +" class='deleteme'>" + topics[i] + "</button>  ");
    }
}


function displayGifs(evt){
var txt = $(evt.currentTarget).text();
var encodedTxt = encodeURI(txt);
console.log(txt);
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
encodedTxt + "&api_key=cUnVlOwx2kMUOUZWUpUo35LZdJ5xOkjL&limit=10";

      // Perfoming an AJAX GET request to our queryURL
      $.ajax({
        url: queryURL,
        method: "GET"
      })

      // After the data from the AJAX request comes back
        .then(function(response) {
            console.log(queryURL);
        // Saving the image_original_url property
          var imgUrl = response.data;
          $("#gifholder").empty();
          for (var i = 0; i < imgUrl.length; i++) {

            // Creating and storing a div tag
            var imgDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + imgUrl[i].rating);

            // Creating and storing an image tag
            var tarImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            tarImage.attr("src", imgUrl[i].images.fixed_height_small_still.url);
            tarImage.attr("data-still", imgUrl[i].images.fixed_height_small_still.url);
            tarImage.attr("data-animate", imgUrl[i].images.fixed_height_small.url);
            tarImage.attr("data-state", "still");
            tarImage.attr("class", "gif");

            // Appending the paragraph and image tag to the animalDiv
            imgDiv.append(p);
            imgDiv.append(tarImage);

            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            $("#gifholder").prepend(imgDiv);
          }
        });
}

function gifState(){
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }  
}

$(document).ready(function() { 
    $('#addtoarray').on("click", function(){
        addToArray();
        createButtons();
    });
    $(document).on("click", '.deleteme', displayGifs);
    $(document).on("click", ".gif", gifState);
createButtons();
    
});