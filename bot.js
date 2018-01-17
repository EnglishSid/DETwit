console.log('Running');

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
    console.log('xxx');
    gotNeoData;
})
.catch(function(err){
    console.log(err)
})  

function gotNeoData(err,data,response){
    console.log('yyy');
    var neotrends = TrendArr.Trend;
    for (var n = 0;n < TrendArr.length;n++){
        console.log(neotrends[n].Trend);
    }
}

//Step2 for each top trend grab the latest tweets about them

var params ={

    q: 'rainbow',
    count:2
}

T.get('search/tweets', params, gotData);

function gotData(err,data,response){
    var tweets = data.statuses;
    for (var i = 0;i < tweets.length;i++){
        console.log(tweets[i].text);
    }
}
