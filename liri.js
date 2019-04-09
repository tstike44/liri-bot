require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
const omdb = new (require('omdbapi'))('trilogy');
const axios = require("axios")
var fs = require("fs");
// var axios = require.length("axios");

//app logic
var userInput = process.argv[2];
var userQuery = process.argv[3];
//need axios *i think*
function concertThis() {
    if (userInput == "concert-this") {
       
           
    }
}
concertThis();

/*needs for spotify
1. take in song name
2. responed with Artist
3. song name
4. preview link from spotify
5. the album that the song is from
*/
//start of spotify
//appending text file
function spotifyThis() {
    if (userInput == "spotify-this-song") {
        spotify.search({ type: 'track', query: userQuery })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (err) {
                console.log(err);
            });

        /* fs.appendFile("random.txt", "utf8", function (err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log();
            }
        });
        */
    }
}
spotifyThis();

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
    if (userInput == "movie-this") {
        if (!userQuery) {
            omdb.get({
                title: "Mr.Nobody"
            }).then(res => {
                // console.log('got response:', res);
                console.log("Title: " + res.title)
                console.log("Year Released: " + res.year)
                console.log("IMDB Rating: " + res.ratings[0].value)
                console.log("Tomatoe Score: " + res.ratings[1].value)
                console.log("Country: " + res.country)
                console.log("Language(s): " + res.language)
                console.log(("Cast: " + JSON.stringify(res.actors, null, 2)))
            }).catch(console.error);
        } else {

            omdb.get({
                title: userQuery
            }).then(res => {
                // console.log('got response:', res);
                console.log("Title: " + res.title)
                console.log("Year Released: " + res.year)
                console.log("IMDB Rating: " + res.ratings[0].value)
                console.log("Tomatoe Score: " + res.ratings[1].value)
                console.log("Country: " + res.country)
                console.log("Language(s): " + res.language)
                console.log(("Cast: " + JSON.stringify(res.actors, null, 2)))
            }).catch(console.error);
        } //end of inner if statement
    }
}
movieThis();
