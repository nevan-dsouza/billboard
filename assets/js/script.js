var idarray = [];
var super_array = [];
var resultTextEl = document.querySelector('#result-text');
var resultContentEl = document.querySelector('#result-content');
var lastCountry = localStorage.getItem("last_country");

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

// Load last country from local storage

if (!lastCountry) {
    lastCountry = "";
}

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

    // clearList($("#result-content"));
    // Turns search box empty after submitting
    $("#input-country").val("");
    // Add the country to our search history
    addCountrytoHistory(countryName);
    // Render the country's weather
    renderTrackList(countryName);
}

function renderTrackList(countryName) {
    var countryCode = findCodeByCountry(countryName);
  

    clearList($("#result-content"));

    if (countryName === "invalid") {
        return console.log("No valid country!");
    }
    

    // fetch request gets a list of all the repos for the node.js organization
    var requestUrl = "https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=20&country=" + countryCode + "&f_has_lyrics=1&apikey=360b2a0f11a6cde52497da911bf19fb1";
    
  
    fetch(requestUrl, { mode: 'cors',
    "Access-Control-Allow-Origin" : "*"})
  
   
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        console.log(data.message.body.track_list[0].track.track_name);
        var idarray = [];
        for (var i = 0; i < 20; i++) {
          printResults(data.message.body.track_list[i].track);
        }
  });
}



console.log(resultTextEl);

function printResults(resultObj) {
  console.log(resultObj);

  // set up `<div>` to hold result content
  var resultCard = document.createElement('div');
  var resultBody = document.createElement('div');
  var titleEl = document.createElement('h3');
  var bodyContentEl = document.createElement('p');
  var linkButtonEl = document.createElement('a');


  resultCard.classList.add('cardcustom');

  resultBody.classList.add('cardcustombody');
  resultCard.append(resultBody);

  titleEl.textContent = resultObj.track_name;

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

console.log(findCodeByCountry("Afghanistan"));
$("#search-form").on("submit", handleSubmit);
renderTrackList(lastCountry);
