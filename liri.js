require("dotenv").config();
var axios = require("axios");
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var request = require("request");



var search = process.argv[2];
var term = process.argv.slice(3).join(" ");

function main(){
if (search === "spotify-this-song" && term) {
  console.log("Searching for Song");
  findSong(term);
}
else if (search === "movie-this" && term) {
    console.log("Searching for Movie");
   findMovie(term);
}
else if (search === "spotify-this-song" && !term){
    console.log("Spotifying 'The Sign'");
    term = "The Sign ace of base";
    findSong(term);
}
else if (search === "movie-this" && !term) {
    console.log("Searching for 'Mr. Nobody'");
    term = "Mr. Nobody";
    findMovie(term);
}
else if (search === "do-what-it-says") {
  console.log("Spotifying 'I Want It That Way'");
  readRandom();
  console.log(term);
}
else {
    console.log("Please enter a valid command.")
}
};
function grabTerm(search2, term2){
    search = search2;
    term = term2;
    console.log(term);
    main();

}

function readRandom() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
          return console.log(error);
        }
        var dataArr = data.split(",");
        var search2 = dataArr[0];
        var term2 = dataArr[1];
        grabTerm(search2, term2);
      
      });
      

}

 function findSong(term) {
    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: 'track', query: term }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        } else {
            var results = [
                "-------------------------------------------------------------",
                "Artist Name: " + data.tracks.items[0].album.artists[0].name,
                "\nSong Name: " + data.tracks.items[0].name, 
                "\nPreview URL: " + data.tracks.items[0].album.external_urls.spotify,
                "\nAlbum Name: " + data.tracks.items[0].album.name
            ].join("\n");
            console.log(results);
        }
    });
    }
function findMovie(term) {
        request(`http://www.omdbapi.com/?t=${term}&y=&plot=short&apikey=trilogy`, function(error, response, body) {
        
          if (!error && response.statusCode === 200) {
 
            var result = [
                "-------------------------------------------------------------",
                "Title: " + JSON.parse(body).Title,
                "Year: " + JSON.parse(body).Year,
                "IMBD Rating: " + JSON.parse(body).imdbRating,
                "Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value,
                "Country Produced: " + JSON.parse(body).Country,
                "Language: " + JSON.parse(body).Language,
                "Plot: " + JSON.parse(body).Plot,
                "Actors: " + JSON.parse(body).Actors
            ].join("\n");

            console.log(result);

          }
        });               
            
    };
    

main();