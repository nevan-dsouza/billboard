var idarray = [];
var super_array = [];
var resultTextEl = document.querySelector('#result-text');
var resultContentEl = document.querySelector('#result-content');
var lastCountry = localStorage.getItem("last_country");
var musicApiKey = "4d2455ebb8688fed8a2c85f0ac87b164";

// This function clears a list of child elements within an element
function clearList(element) {
    console.log(element);
    console.log(element.children.length);
    while (element[0].firstChild) {
        element[0].firstChild.remove();
    }
    console.log(element.children.length);
    console.log("List cleared!");
}

// input country name, return country code (using array from country.js)
function findCodeByCountry(countryName) {
    var foundCountry = country.find(function (el) {
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
        var option = $('<option value=" '+item.name+' "></option>');
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
    var countryName = $("#input-country").val().trim();

    // Render the country's top 20 music list
    var foundCountry = country.find(function (el) {
        return el.name.toLowerCase() === countryName.toLowerCase();
        });

    // If user inputs a valid country name...
    if (foundCountry !== undefined) {
        // Add the country to our search history
        addCountrytoHistory(countryName);
        // Display search results and hide previous youtube link
        $("#result-content").removeClass("is-hidden");
        clearList($('.youtube-video-container'));
        return renderTrackList(countryName);

    // If user does not input a valid country name...
    } else {
        $("#error-window").addClass("is-active");
        // Turns search box empty after submitting
        $("#input-country").val("");
        return;
    }
}

// Fetches API data then calls the printResult function alongside other things
function renderTrackList(countryName) {
    var countryCode = findCodeByCountry(countryName);
    var searchResultHeading = document.getElementById('result-header-text');

    

    clearList($("#result-content"));

    if (countryName === "invalid") {
        return console.log("No valid country!");
    }
    

    // fetch request gets a list of all the repos for the node.js organization
    var requestUrl = "https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=20&country=" + countryCode + "&f_has_lyrics=1&apikey=" + musicApiKey;
    
  
    fetch(requestUrl, { mode: 'cors',
    "Access-Control-Allow-Origin" : "*"})
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        console.log(data.message.body.track_list[0].track.track_name);

        var idarray = [];

        // Make a for loop to print results for the 20 songs in the array
        for (var i = 0; i < 20; i++) {
          printResults(data.message.body.track_list[i].track);
        }

        // Reveal the container with the song list
        $("#result-content").removeClass("is-hidden");

        searchResultHeading.textContent = "Top 20 Songs in " + lastCountry + ":";

        // Turns search box empty after submitting
        // $("#input-country").val("");
  });
}



// Displays top 20 songs and other things
function printResults(resultObj) {
  console.log(resultObj);

  // set up `<div>` to hold result content
  var resultCard = document.createElement('li');
  var resultBody = document.createElement('div');
  var titleEl = document.createElement('h3');
  var bodyContentEl = document.createElement('p');
  var linkButtonEl = document.createElement('a');

  resultCard.classList.add('cardcustom');

  resultBody.classList.add('cardcustombody');
  resultCard.append(resultBody);

  titleEl.textContent = resultObj.track_name;
  titleEl.addEventListener('click', refinedSearch);
  bodyContentEl.innerHTML =
    '<strong>Artist:</strong> ' + resultObj.artist_name + '<br/>';

  if (resultObj.album_name) {
    bodyContentEl.innerHTML +=
      '<strong>Album Name:</strong> ' + resultObj.album_name + '<br/>';
  }

  linkButtonEl.textContent = 'Lyrics';
  linkButtonEl.setAttribute('href', resultObj.track_share_url);
  linkButtonEl.classList.add('btncustom');

  resultBody.append(titleEl, bodyContentEl, linkButtonEl);

  resultContentEl.append(resultCard);
}

// Function to close modal window
function closeWindow() {
    var modalEle = $("#error-window");
    modalEle.removeClass("is-active");
}

// Event handler for submit button
$("#search-form").on("submit", handleSubmit);

// Event handler for search error modal window
$(".modal-background").on("click", closeWindow);
$("#close-modal").on("click", closeWindow);

// Load last country from local storage and automatically display last searched results
if (lastCountry) {
    renderTrackList (lastCountry);
}

