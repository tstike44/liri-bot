require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
const omdb = new (require('omdbapi'))('trilogy');
var fs = require("fs");
// var axios = require.length("axios");

//app logic
var userInput = process.argv[2]
var userQuery = process.argv[3];
function appSearch(userInput, userQuery) {
    switch (userInput) {
        case "concert-this":
            //searching for band
            break;
        case "spotify-this-song":
            //searching for song
            break;
        case "movie-this":
            //searching for movie
            movieThis();
            break;
        case "do-what-it-says":
            //searching for the song in txt file
            break;
        default:
            console.log("wadu heck")
    }

}


//appending text file
fs.appendFile("random.txt", "utf8", function (err) {

    if (err) {
        console.log(err);
    }
    else {
        console.log();
    }

});


/* omdb needs 
 * Title of the movie.
1. Year the movie came out.
2. IMDB Rating of the movie.
3. Rotten Tomatoes Rating of the movie.
4. Country where the movie was produced.
5. Language of the movie.
6. Plot of the movie.
7. Actors in the movie. 

user input: movie-this <movie name>
*/
function movieThis() {
    omdb.get({
        title: userQuery
    }).then(res => {
        // console.log('got response:', res);
        var movieInfo = {
            year: res.year,
            iMDB: res.ratings[0].value,
            tomatoe: res.ratings[0].value,
            country: res.country,
            language: res.country,
            plot: res.plot,
            actors: res.actors
        }
        console.log(movieInfo)

        console.log('year: ' + $(res.year))
    }).catch(console.error);

}

/*needs for spotify
1. take in song name
2. responed with Artist
3. song name
4. preview link from spotify
5. the album that the song is from
*/

/*
//start of spotify
var song = process.argv[2];
console.log(song)

spotify.search({ type: "Covet", query: 'All the Small Things' })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(err) {
    console.log("Error Occurred: " + err);
  });
*/


/*
//bands in town url i think waiting for api key
"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
*/