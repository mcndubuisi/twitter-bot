// Dependency required for the app
var twit = require('twit');
var config = require('./config');

// Twitter API client for node setup
var Twitter = new twit(config);

//////////// START RETWEET BOT ////////////
var retweet = function(){
    // Searches for Tweet according to the parameters
    var params = {
        q: '',
        result_type: 'recent',
        lang: 'en'
    }

    Twitter.get('search/tweets', params, function(err, data){
        // If there are no errors while searching for tweet
        if(!err){
            // ID of tweet to be retweeted 
            var retweetId = data.statuses[0].id_str;; 

            Twitter.post('statuses/retweet/:id', {
                id: retweetId
            }, function(err, response){
                //If there are no errors while retweeting
                if(response){
                    console.log('Retweeted!');
                }
                // If there is an error while retweeting
                if(err){
                    console.log('Something went wrong while retweeting...');
                }
            });
        } 
        
        else{
            console.log('Something went wrong while searching...');
        }
    });
}

// Program is running...
retweet();

// Retweets every set interval, in this case 300000 millisecond
setInterval(retweet, 300000);

//////////// END RETWEET BOT ////////////


//////////// START FAVORITE BOT ////////////

var favoriteTweet = function(){
    var params = {
        q: '',
        result_type: 'recent',
        lang: 'en'
    }

    Twitter.get('search/tweets', params, function(err, data){

            // Find tweets
            var tweet = data.statuses;
            var randomTweet = ranDom(tweet); // Pick a random tweet
        
        // If random tweet exists
        if(typeof randomTweet != 'undefined'){
            Twitter.post('/favorites/create', {
                id: randomTweet.id_str
            }, function(err, response){
                // If there was an error while favoriting
                if(err){
                    console.log('Something went wrong while favoriting');
                } else{
                    console.log('Favorited!');
                }
            });
        }
    });
}

// Program is running...
favoriteTweet();

// Favorites tweet every set interval, in this case 300000 millisecond
setInterval(favoriteTweet, 300000);

// Function to generate random tweet
function ranDom(arr){
    var index = Math.floor(Math.random() * arr.length);
    return arr[index];
}

//////////// END FAVORITE BOT ////////////

