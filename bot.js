console.log('Running');
console.log('Script to return the top 5 trends from Digital Explorer and search Twitter for the most recent posts using these as hashtags');
console.log('==============================');
console.log('');

var Twit = require ('twit');
var Twitconfig = (require('./twitconfig.js'));

var neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver('bolt://localhost',neo4j.auth.basic('neo4j','neo4j'));
var session=driver.session();

var T = new Twit(Twitconfig);

//step1 Connect to Neo and query the database for the top trends

var neoquery="MATCH (n:BusinessTrendLink)<-[:ASSIGNED_VIA]-(t:BusinessTrend) ";
neoquery += "WITH t, COUNT(n) AS connections ";
neoquery += "RETURN id(t) AS Nodeid, t.name AS name, connections ";
neoquery += "ORDER BY connections DESC LIMIT 5 ";

var TrendArr =[];

session 
.run(neoquery)
.then(function(result){
    result.records.forEach(function(record) {
            TrendArr.push({
                Trend: record.get(1),
                Connections: record.get(2)
            });
    }); 
    //
    for (var n = 1;n < TrendArr.length;n++)
    {
        //Step2 for each top trend grab the latest tweets about them
        console.log('DIGITAL EXPLORER TREND:');
        console.log(TrendArr[n].Trend);
        console.log('=========================');
        console.log('Twitter....')
        var searchstring="{q: '" + TrendArr[n].Trend + "', count: 5 }";
        console.log(searchstring); 
        T.get('search/tweets', {q: '3D printing', count: 5 }, function(err, data, response) {
            var tweets=data.statuses;
            for (var i=0;i < tweets.length;i++){
                console.log(tweets[i].text);
            }
          })

    };
})
.catch(function(err){
    console.log(err)
})  