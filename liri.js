require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
const omdb = new (require('omdbapi'))('trilogy');
const axios = require("axios")
const moment = require("moment")
var fs = require("fs");

var userInput = process.argv[2];
var userQuery = process.argv[3];


switch (userInput) {
    case "concert-this":
        concertThis();
        break;
    case "spotify-this-song":
        spotifyThis();
        break;
    case "movie-this":
        movieThis();
        break;
    case "do-what-it-says":
        doSays();
    default:
        console.log("Please type one of the following commands:" +
            "\n concert this <artist name>" +
            "\n spotify-this-song <song name>" +
            "\n movie-this <movie name>" +
            "\n do-what-it-says"
        );

}

function concertThis() {
    if (!userQuery) {
        console.log("Give me an Artist to search")
    } else {
        axios.get("https://rest.bandsintown.com/artists/" + userQuery + "/events?app_id=codingbootcamp")
            .then(function (response) {
                var conDate = response.data[0].datetime
                conDate = moment().format('L');
                console.log("Venue: " + response.data[0].venue.name)
                console.log("Venue City: " + response.data[0].venue.city)
                console.log("Date of concert: " + conDate)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}


//start of spotify
function spotifyThis() {
    if (userQuery) {
        spotify.search({ type: 'track', query: userQuery })
            .then(function (response) {
                console.log("Artist: " + response.tracks.items[0].artists[0].name);
                console.log("Song Name: " + response.tracks.items[0].name)
                console.log("Preview of song: " + response.tracks.items[0].preview_url);
                console.log("Album Name: " + response.tracks.items[0].album.name);
            })
            .catch(function (err) {
                console.log(err);
            });
    } else {
        spotify.search({ type: 'track', query: "Ace of base" })
            .then(function (response) {
                console.log("Artist: " + response.tracks.items[0].artists[0].name);
                console.log("Song Name: " + response.tracks.items[0].name)
                console.log("Preview of song: " + response.tracks.items[0].preview_url);
                console.log("Album Name: " + response.tracks.items[0].album.name);
            })
            .catch(function (err) {
                console.log(err);
            });
    }
}

function movieThis() {
    if (!userQuery) {
        omdb.get({
            title: "Mr.Nobody"
        }).then(res => {
            console.log("\n~~~~~~~~~~~~~~~~\n" + "Title: " + res.title + "\n")
            console.log("Year Released: " + res.year + "\n")
            console.log("IMDB Rating: " + res.ratings[0].value + "\n")
            console.log("Tomatoe Score: " + res.ratings[1].value + "\n")
            console.log("Country: " + res.country + "\n")
            console.log("Language(s): " + res.language + "\n")
            console.log(("Cast: \n" + JSON.stringify(res.actors[0]) + "\n" + JSON.stringify(res.actors[1]) + "\n" + JSON.stringify(res.actors[2]) + "\n" + JSON.stringify(res.actors[3]) + "\n~~~~~~~~~~~~~~~~"))
        }).catch(console.error);

    } else {
        omdb.get({
            title: userQuery
        }).then(res => {
            console.log("\n~~~~~~~~~~~~~~~~\n" + "Title: " + res.title + "\n")
            console.log("Year Released: " + res.year + "\n")
            console.log("IMDB Rating: " + res.ratings[0].value + "\n")
            console.log("Tomatoe Score: " + res.ratings[1].value + "\n")
            console.log("Country: " + res.country + "\n")
            console.log("Language(s): " + res.language + "\n")
            console.log(("Cast: \n" + JSON.stringify(res.actors[0]) + "\n" + JSON.stringify(res.actors[1]) + "\n" + JSON.stringify(res.actors[2]) + "\n" + JSON.stringify(res.actors[3]) + "\n~~~~~~~~~~~~~~~~"))
        }).catch(console.error);
    } //end of inner if statement
}

function doSays() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            spotify.search({ type: 'track', query: data })
                .then(function (response) {
                    console.log("Artist: " + response.tracks.items[0].artists[0].name);
                    console.log("Song Name: " + response.tracks.items[0].name)
                    console.log("Preview of song: " + response.tracks.items[0].preview_url);
                    console.log("Album Name: " + response.tracks.items[0].album.name);
                })
                .catch(function (err) {
                    console.log(err);
                });

        }
    });
}