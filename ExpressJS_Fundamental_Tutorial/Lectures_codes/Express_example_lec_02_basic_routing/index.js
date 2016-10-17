var express = require('express')
var app = express()


var fs = require('fs')
var _ = require('lodash')
var users = []


fs.readFile('users.json', {encoding: 'utf8'}, function (err, data) {
  if (err) throw err

  //interate over the json file and create name list for the users array (this is similar to the map function in ES6)
  JSON.parse(data).forEach(function (user) {
    user.name.full = _.startCase(user.name.first + ' ' + user.name.last)
    users.push(user)
  })

})


app.get('/', function(req,res){

  // create a list of href and put in buffer as string. (So buffer here is kind of like a component in React)
  var buffer = '' 

  users.forEach(function (user) {
    buffer += '<a href="/' + user.username + '">' + user.name.full + '</a><br>'
  })
  res.send(buffer)

})

//Let's try use some regular expression here in the routing.
// so anything starts with big and has a string of any other charactors, we log out a log
// . means any character; * means more of previous expression which here means any charactors
app.get(/big.*/, function(req, res, next){
	console.log('BIG USER ACCESS')
	next()
})


//this is similar to the route parameter in react router; 
// req is like a property passed in as we send out the request to the route. 
app.get('/:username', function(req,res){
	var username = req.params.username
	res.send(username)
})



var server = app.listen(3000, function(){
	console.log('Server running at http://localhost: ' + server.address().port)
})




