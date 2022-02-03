//  Declarations
// var songSearch = $("#song").val();
var requestUrl = "https://youtube.googleapis.com/youtube/v3/search?part=snippet";
var testRequest = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=theweeknd&key=AIzaSyCRZy3dTHCrHziFGy-k-XHY9AkNrvd8a_k";
let APIkey = 'AIzaSyCRZy3dTHCrHziFGy-k-XHY9AkNrvd8a_k';
var video = '';
var videos = $()

// Functions
// Search Manipulation Function
function refinedSearch(event){

    //get the value from the event.target.textContent
    let search=event.target.textContent

    let searchList = search.split(' ');
    console.log(searchList); 
    let song = '';

    clearList($('.youtube-video-container'));


    for (let i = 0; i<searchList.length; i++){
        song+=searchList[i];
    }
    console.log(song);

    let youtubeRequestUrl = requestUrl + '&q=' + song + '&key=' + APIkey;
    console.log(youtubeRequestUrl);

    youtubeSearch(youtubeRequestUrl);
}

// JSON parsing, extracting YouTube thumbnail URL
function youtubeSearch(link){
    fetch(link)
    .then(function (response) {
        return(response.json());
    })
    .then(function (data) {
        // console.log(data.value.items[0].);
        console.log(data);
        let video= data.items[0];
        console.log(video);

        let videoID = video.id.videoId
        console.log(videoID);

        displayVideo(video, videoID);
        
    });
}

// video display code
/* <iframe width="420" height="315" src="http://www.youtube.com/embed/watch?v=${video.id.videoId}" frameborder="0" allowfullscreen></iframe> */

/* <a href="https://www.youtube.com/embed/${videoID}"><img src= "${video.snippet.thumbnails.medium.url}" height="315" width="420"></img></a>
<figcaption>${video.snippet.title}</figcaption> */


// Display Video Function
function displayVideo(video, videoID){
    let videoContainer = document.querySelector(".youtube-video-container")
        videoContainer.innerHTML += `

        <div class="video-display">
        <a href="https://www.youtube.com/watch?v=${videoID}"><img src= "${video.snippet.thumbnails.medium.url}" height="315" width="420"></img></a>
        <figcaption>${video.snippet.title}</figcaption>
        </div>
        `;
}



// Calling
// refinedSearch(songSearch);

// youtubeSearch(testRequest);