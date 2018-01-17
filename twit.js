//just the twitter part

console.log('Running');
console.log('Script to return the top 5 trends from Digital Explorer and search Twitter for the most recent posts using these as hashtags');
console.log('==============================');
console.log('');

var Twit = require ('twit');
var Twitconfig = (require('./twitconfig.js'));

var T = new Twit(Twitconfig);


var TrendArr =[];
var searchstring="{ q: 'banana', count: 3 }";
var searchText="banana";

//T.get('search/tweets', { q: 'banana', count: 3 }, function(err, data, response) {
T.get('search/tweets', { q: '" + searchText + "', count: 3 }, function(err, data, response) {
//T.get('search/tweets', [searchstring], function(err, data, response) {
            var tweets=data.statuses;
            for (var i=0;i < tweets.length;i++){
            console.log(tweets[i].text);
            }
          })
          console.log('=========================');

          