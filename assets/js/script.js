apiKey = "7d39cdb41223669ba391f5da5b386dc7";

// This function clears a list of child elements within an element
function clearList(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    console.log("List cleared!");
}

// Load last country from local storage
let lastCountry = localStorage.getItem("last_country");
if (!lastCountry) {
    lastCountry = "";
}

function findCodeByCountry(countryName) {
    let foundCountry = country.find(function (el) {
        return el.name.toLowerCase() === countryName.toLowerCase();
        });
    if (foundCountry !== undefined) {
        return foundCountry["code"];
    } else {
        countryName = "invalid";
        return;
    }
}

// Function that populates search box with a list of countries
$(document).ready(function() {
    $(country).each(function(index, item) {
        let option = $('<option value=" '+item.name+' "></option>');
        $('#countries').append(option);
    });
});

// This function adds the last country searched to the local storage
function addCountrytoHistory(countryName) {
    if (lastCountry !== countryName) {
        localStorage.setItem("last_country", countryName);
    }
}

// This function handles the country input after the necessary event occurs
function handleSubmit(event) {
    // To prevent the page from reloading...
    event.preventDefault();

    // Get country's name from the search bar
    let countryName = $("#input-country").val().trim();

    clearList($("#track-names"));
    // Turns search box empty after submitting
    $("#input-country").val("");
    // Add the country to our search history
    addCountrytoHistory(countryName);
    // Render the country's weather
    renderTrackList(countryName);
}

function renderTrackList(countryName) {
    let countryCode = findCodeByCountry(countryName);
    let topTracksURL = "https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=hot&page=1&page_size=20&f_has_lyrics=1&apikey=" + apiKey + "&country=" + countryCode

    clearList($("#track-names"));

    if (countryName === "invalid") {
        return console.log("No valid country!");
    }

    fetch(topTracksURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log("MusiXMatch API Fetch Response for " + countryName + " \n-------------");
            console.log(data);

            // This creates list items using fetched data
            $(document).ready(function() {
                $(data.message.body.track_list).each(function(index, item) {
                    let listItem = $("<li>" + item.track.track_name + "</li>");
                    $('#track-names').append(listItem);
                });
            });
            // $("#track-name").text(data.message.body.track_list[0].track.track_name);
        })
}

console.log(findCodeByCountry("Afghanistan"));
$("#search-form").on("submit", handleSubmit);
renderTrackList(lastCountry);
