var express = require('express')
var app = express()
var helpers = require('./helpers')

var fs = require('fs')
var path = require('path')
var _ = require('lodash')
var engines = require('consolidate') 

// bodyParser allows us to parse the body of the request
var bodyParser = require('body-parser')





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
	//create an empty list to save the user list
	//the reason we put in the get instead of global is that so we can update the list if the user json file got deleted, then we can remove the user from the list
  	var users = []

  	//read the file from users directory
  	fs.readdir('users', function (err, files) {

  		//interate over the files in the users directory
    	files.forEach(function (file) {

    		//read the user json file; path join basically combine all three arguments and form a path so in this case, it's "./users/bigbear886.json" if the file name is bigbear886.json
      		fs.readFile(path.join(__dirname, 'users', file), {encoding: 'utf8'}, function (err, data) {
      			if (err) throw err

      			//read the json file and parse to an object
		        var user = JSON.parse(data)
		        //form the full name
		        user.name.full = _.startCase(user.name.first + ' ' + user.name.last)
		        //save it to the users list variable
		        users.push(user)

		        //make sure the user list matches the number of files in the users folder in case errors when some files not deleted successfully; when the condition met, render the page. 
		        if (users.length === files.length) res.render('index', {users: users})
      		})
    	})
  	})
})


//we can actually use response object to trigger a download event
app.get('*.json', function(req, res){
	
	res.download('./users/' + req.path)
})

//we can return an json object using the res.json method
app.get('/data/:username', function(req, res){

	var username = req.params.username
	var user = helpers.getUser(username)
	//
	res.json(user)
})


app.get('/error/:username', function(req, res){
	
	res.send("No user named " + req.params.username + ' found')
})

var userRouter = require('./username')
app.use('/:username', userRouter)


var server = app.listen(3000, function(){
	console.log('Server running at http://localhost: ' + server.address().port)
})




