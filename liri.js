require("dotenv").config();
var axios = require("axios");
var fs = require("fs");

var search = process.argv[2];
var term = process.argv.slice(3).join(" ");


if (!search) {
  search = "show";
}

if (!term) {
  term = "Andy Griffith";
}

if (search === "spotify-this-song") {
  console.log("Searching for Song");
  liriBot.findSong(term);
}
else if (search === "movie-this") {
    console.log("Searching for Movie");
  liriBot.findMovie(term);
}
else {
  console.log("Spotifying 'I Want It That Way'");
  term = "I want it that way";
  liriBot.findSong(term);
}


var liriBot = function () {
    var divider = "\n-------------------------------------------------\n";
    this.findSong = function (song) {
        // The following URL can be used to search the TV Maze API for a given show
        var URL = "http://api.tvmaze.com/singlesearch/shows?q=" + song;
        console.log(typeof (URL));
        axios.get(URL)
            .then(function (response) {
                var showRespData = response.data;
                var showData = [
                    divider,
                    "Show: " + showRespData.name,
                    "Genre(s): " + showRespData.genres.join(),
                    "Rating: " + showRespData.rating.average,
                    "Network: " + showRespData.network.name,
                    "Summary: " + showRespData.summary
                ].join("\n");
            console.log(showRespData);
            fs.appendFile('log.txt', showData, function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    this.findMovie = function (movie) {
        // The following URL can be used to search the TV Maze API for a given show
        var URL = "http://api.tvmaze.com/search/shows?q=" + movie;
        axios.get(URL)
            .then(function (response) {
                var person = response.data[0];
                console.log(person);
                var actorData = [
                    divider,
                    "Name: " + person.name,
                    "Gender: " + person.gender,
                    "Birthday: " + person.birthday,
                    "Country: " + person.country.name,
                    "TV Maze URL: " + person.url
                ].join("\n");
            
            fs.appendFile('log.txt', actorData, function (err) {
            if (err) throw err;
            console.log('Saved!');
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    }