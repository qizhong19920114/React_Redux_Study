var express = require('express')
var app = express()
var helpers = require('./helpers')

var fs = require('fs')
var path = require('path')
var _ = require('lodash')
var engines = require('consolidate') 

// bodyParser allows us to parse the body of the request
var bodyParser = require('body-parser')

var JSONStream = require('JSONStream')

var User = require('./db').User

//we need to use the handlebars because some template doesn't support expressJS
app.engine('hbs', engines.handlebars)

app.set('views', './views')
app.set('view engine', 'hbs')

//use static files from images directory
//the profilepics is a viritual path feed to the express so every time hbs template try to access profilepics, it will go into images folder
//not sure why we use virtual path though		
app.use('/profilepics',express.static('images'))


app.use(bodyParser.urlencoded({extended: true }))


app.get('/', function(req,res){
	User.find({}, function(err, users){
		res.render('index', {users: users})
	})
})


//we can actually use response object to trigger a download event
app.get('*.json', function(req, res){
	
	res.download('./users/' + req.path)
})

//we can return an json object using the res.json method
app.get('/data/:username', function(req, res){

	var username = req.params.username
	//create a readable stream
	var readable = fs.createReadStream('./users/' + username + '.json')
	//pipe the data to the res object (which is being sent to the html page (the client))
	readable.pipe(res)
})

app.get('/users/by/:gender', function(req, res){
	//get the gender value from the path parameter
	var gender = req.params.gender 
	var readable = fs.createReadStream('users.json')

	// console.log("readable: ", readable)


	// JSON.parse() is for "parsing" something that was received as JSON.
	// JSON.stringify() is to create a JSON string out of an object/array.	

	//pipe everything to the JSON stream; One thing great about stream is that it's async and it's non-blocking
	readable
		.pipe(JSONStream.parse('*', function(user){
			//filter the object list
			if (user.gender === gender) {
				// console.log("selected user: ", user)
				return user.name
			}
		}))
		//we need to use stringify to convert from object to string and format it with line breakers
		.pipe(JSONStream.stringify('[\n ', ',\n ', '\n]\n'))
		//pipe it back to the html page to the client
		.pipe(res) 
})

app.get('/error/:username', function(req, res){
	
	res.send("No user named " + req.params.username + ' found')
})

var userRouter = require('./username')
app.use('/:username', userRouter)


var server = app.listen(3000, function(){
	console.log('Server running at http://localhost: ' + server.address().port)
})




