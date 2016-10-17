var express = require('express')
var app = express()


var fs = require('fs')
var _ = require('lodash')
var engines = require('consolidate')

var users = []


fs.readFile('users.json', {encoding: 'utf8'}, function (err, data) {
  if (err) throw err

  //interate over the json file and create name list for the users array (this is similar to the map function in ES6)
  JSON.parse(data).forEach(function (user) {
    user.name.full = _.startCase(user.name.first + ' ' + user.name.last)
    users.push(user)
  })

})

//we need to use the handlebars because some template doesn't support expressJS
app.engine('hbs', engines.handlebars)

app.set('views', './views')
app.set('view engine', 'hbs')


app.get('/', function(req,res){
	// passed in users so we can use it in the jade file; It's kind of like passing props to the component in react
  res.render('index', {users: users})

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




