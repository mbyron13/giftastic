//seed an array with random games and such
var topics = ["castlevania", "mega man", "resident evil", "silent hill", "elder scrolls"];


//function called when button to add gif is clicked. takes the value in the input text and pushes it on end of array. the value inside of the text area is then cleared.
function addToArray() {
    topics.push($("#giftosearch").val());
    $("#giftosearch").val('');
}

//function is called twice, once when the page is first run, and every button press. first deletes the buttons, then creates a button looping through the array. These are appended to buttonholder div with id of the array positions content and a class deleteme. The text of the button is also set to the array indexs content.
function createButtons() {
    $(".deleteme").remove();
    for (var i = 0; i < topics.length; i++) {
        $("#buttonholder").append("<button id=" + topics[i].replace('\\s', '') + " class='deleteme btn btn-secondary'>" + topics[i] + "</button>  ");
    }
}

//this function occurs when a .deleteme class is clicked, which is my buttons that are created earlier. it takes in evt, which is the button that was clicked, and takes the text within it. it uses encodeURI to make any spaces and such search friendly, and then sets query url to that. 
function displayGifs(evt) {
    var txt = $(evt.currentTarget).text();
    var encodedTxt = encodeURI(txt);
    console.log(txt);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        encodedTxt + "&api_key=cUnVlOwx2kMUOUZWUpUo35LZdJ5xOkjL&limit=10";

    // the ajax call to giphy api
    $.ajax({
        url: queryURL,
        method: "GET"
    })

        // the promise of what to do when the data is finally returned
        .then(function (response) {
            console.log(queryURL);
            // set the data we got back to imgUrl
            var imgUrl = response.data;
            //empty gifholder div of anything already in it
            $("#gifholder").empty();
            //loop through the array of the data held in imgUrl we got from the api
            for (var i = 0; i < imgUrl.length; i++) {

                // make a div tag
                var imgDiv = $("<div>");

                // create a paragraph and set the text to the array index of current loops rating. response.data[i].rating
                var p = $("<p>").text("Rating: " + imgUrl[i].rating);

                // have a variable hold an image tag
                var tarImage = $("<img>");
                // set all the attributes of the image tag, beginning with a still, and data states necessary for change. assign a class to be able to call them
                tarImage.attr("src", imgUrl[i].images.fixed_height_small_still.url);
                tarImage.attr("data-still", imgUrl[i].images.fixed_height_small_still.url);
                tarImage.attr("data-animate", imgUrl[i].images.fixed_height_small.url);
                tarImage.attr("data-state", "still");
                tarImage.attr("class", "gif");

                // append the rating to the div we made earlier
                imgDiv.append(p);
                //append the image tag with the attributes we just made.
                imgDiv.append(tarImage);

                // prepend the div holding both the newly created rating paragraph and the image with the newly created attributes to the gifholder div in the html.
                $("#gifholder").prepend(imgDiv);
            }
        });
}

function gifState() {
    //whatever .gif class was clicked, get its data-state.
    var state = $(this).attr("data-state");
    console.log(state);
    //if the state is still, change its source to the data animate attribute
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        //change the data state to animate now.
        $(this).attr("data-state", "animate");
    } else {
        //if the state was animate, when you click set its source equal to the data still attribute
        $(this).attr("src", $(this).attr("data-still"));
        //change the data state to still from animate.
        $(this).attr("data-state", "still");
    }
}
//document.ready with my function calls to make sure the html has loaded before anything is processed with js.
$(document).ready(function () {
    $('#addtoarray').on("click", function () {
        addToArray();
        createButtons();
    });
    $(document).on("click", '.deleteme', displayGifs);
    $(document).on("click", ".gif", gifState);
    createButtons();

});