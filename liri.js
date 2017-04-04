var request = require("request");
var Twitter = require('twitter');
var spotify = require('spotify');
var rotten = require('rotten-api')("YOU_API_KEY");

var inputArgs = process.argv;
var whatToDo = inputArgs[2];



var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});

spotify.search({ type: 'track', query: 'the sign' }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
 
    // Do something with 'data' 
});

function getMovieInfo() { 
	request("https://www.omdbapi.com/?t=Mr+Nobody&y=&plot=short&&r=json", function(error, response, body) {
		if (!error && response.statusCode === 200) {
			var omdbRec = JSON.parse(body);
			console.log("Title: " + omdbRec.title);
			console.log("Released: " + omdbRec.year);
			console.log("IMDB Rating: " + omdbRec.imdbRating);
			console.log("Country: " + omdbRec.Country);
			console.log("Language: " + omdbRec.Language);
			console.log("Plot: " + omdbRec.Plot);
			console.log("Actors: " + omdbRec.Actors);
			for (var i = 0; i < omdbRec.Ratings.length; i++) {
				if (omdbRec.Ratings[i].Source === "Rotten Tomatoes") {
					console.log("Rotten Tomatoes Rating: " + omdbRec.Ratings[i].Value);
				};
			};
			var imdbId = omdbRec.imdbID;
			rotten.alias(imdbId, function (err, res) {
			    if (!err) {
				   var rotRec = JSON.parse(res);
   			       var rotURL = rotRec.links.self;
   			       console.log("Rotten Tomatoes URL: " + rotURL);
     			} else {
     			   console.log("Error in Rotten Tomatoes call");
     			};   				 
			});
		} else {
			console.log("Error in OMDB call");
		};
	});
};
