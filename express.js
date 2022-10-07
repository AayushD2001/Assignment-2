var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

var fs = require('fs');
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants');


//global variable for tweet data
var tweetinfo = []
var searchVar = []

//load the input file
fs.readFile('favs.json', 'utf8', function readFileCallback(err,data ){
  if(err){
    req.log.info('cannot load a file:' + fileFolder + '/' + _file_name)
    throw err;
  }
  else{
    //TODO: store loaded data into a global variable for tweet data
    // We will be parsing the json file into a global array.
    tweetinfo = JSON.parse(data);
    
  }
});
 


//Get functions
//Shows user info
app.get('/tweets', function(req, res) {
  //TODO: send all users' IDs
  // pushes the array to the get function.
  res.send({tweetinfo:tweetinfo});
  
});

//Shows tweet info
app.get('/tweetinfo', function(req, res) {
  //TODO: send tweet info
  // This function pushes the tweetinfo to the getter method in the scripts.
  res.send({tweetinfo:tweetinfo});
});


//Shows searched tweets
app.get('/searchinfo', function(req, res){
  //TODO: send searched tweets
  // Sends the searchVar variable to the getter method in scripts.js
  res.send({searchVar:searchVar});
});

//Post functions
//Posts created tweets
app.post('/tweetinfo', function(req, res) {
  //TODO: create a tweet.
  var newTweet = req.body.text;
  var newTweetID = req.body.id;
  var newcurrentdate = new Date().toString();
  
  // We will need to push the tweet to scripts.js, where we can push the tweet out on the application. 
  tweetinfo.push({
    id: newTweetID,
    text: newTweet,
    created_at: newcurrentdate
  });
});

//Posts searched tweets
app.post('/searchinfo', function(req, res) {
  //TODO: search a tweet
  var tweetID = req.body.tweetID;

  // Will need to go through every tweet in the array.
  tweetinfo.forEach(function(tweet, index){
    if(tweet.id == tweetID){
      searchVar.push(tweet);
    }
  })
  res.send("Successfully searched a tweet!!!")
});

//Update
app.put('/tweets/:nm', function(req, res) {
  //TODO: update tweets
  var nm = req.params.nm;
  var newName = req.body.name;
    // Will need to go through every tweet in the array.
  tweetinfo.forEach(function(tweet, index) {
    if(tweet.user && tweet.user.name === nm){
      tweet.user.screen_name = newName;
    }
  })
  res.send("Updated screen name!!!");
});

//Delete 
app.delete('/tweetinfo/:tweetid', function(req, res) {
  //TODO: delete a tweet
  var id = req.params.tweetid;
  var found = false;
    // Will need to go through every tweet in the array.
    // Once we find the selected tweet, say bye bye to tweet.
  tweetinfo.forEach(function (tweet, index) {
    if(!found && Number(tweet.id) === Number(id)){
      tweetinfo.splice(index, 1);
    }
  })
});


app.listen(PORT, function() {
  console.log('Server listening on ' + PORT);
});