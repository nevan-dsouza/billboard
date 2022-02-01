apiKey = "7d39cdb41223669ba391f5da5b386dc7";

function findCodeByCountry(countryName) {
    let foundCountry = country.find(function (el) {
        return el.name.toLowerCase() === countryName.toLowerCase();
        });
    return foundCountry["code"];
}

// Function that populates search box with a list of countries
$(document).ready(function() {
    $(country).each(function(index, item) {
        let option = $('<option value=" '+item.name+' "></option>');
        $('#countries').append(option);
    });
});

function renderTrackList(countryName) {
    let countryCode = findCodeByCountry(countryName);
    let topTracksURL = "https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=20&f_has_lyrics=1&apikey=" + apiKey + "&country=" + countryCode

    fetch(topTracksURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log("MusiXMatch API Fetch Response \n-------------");
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

renderTrackList("Canada");
console.log(findCodeByCountry("Afghanistan"));