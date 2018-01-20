//just the twitter part
console.log('Running');

var Twit = require ('twit');
var Twitconfig = (require('./twitconfig.js'));

var T = new Twit(Twitconfig);

var TrendArr =[];
var searchText="banana";

T.get('search/tweets', { q: '" + searchText + "', count: 3 }, function(err, data, response) {
            var tweets=data.statuses;
            for (var i=0;i < tweets.length;i++){
            console.log(tweets[i].text);
            }
          })
          console.log('=========================');