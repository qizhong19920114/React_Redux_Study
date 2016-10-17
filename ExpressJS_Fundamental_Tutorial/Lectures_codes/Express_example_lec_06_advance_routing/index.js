var express = require('express')
var app = express()


var fs = require('fs')
var path = require('path')
var _ = require('lodash')
var engines = require('consolidate') 

// bodyParser allows us to parse the body of the request
var bodyParser = require('body-parser')

//get the file path of the json file in the users directory based on the username passed in
function getUserFilePath (username) {
  return path.join(__dirname, 'users', username) + '.json'
}

//get the user object from the json file
function getUser (username) {
  //read the json file of given user and make it an object
  var user = JSON.parse(fs.readFileSync(getUserFilePath(username), {encoding: 'utf8'}))

  //form the fullname attribute for the user object; startcase means the first charactor the letter being capitalized
  user.name.full = _.startCase(user.name.first + ' ' + user.name.last)
  
  //do the same startcase formating for the address content, so "new york" becomes "New York", and numbers of the street name won't be affected
  _.keys(user.location).forEach(function (key) {
    user.location[key] = _.startCase(user.location[key])
  })
  return user
}

//save teh changed made to the user
function saveUser (username, data) {
 //get the file path of in the users directory	
  var fp = getUserFilePath(username)

  //delete the file that needs to be changed; seems like we can't just update the old file, we need to delete the old one and save the new one use the new data
  fs.unlinkSync(fp) // delete the file

  //save the new file using the same file name as the old one but with the new data; this is how we do updating. 
  fs.writeFileSync(fp, JSON.stringify(data, null, 2), {encoding: 'utf8'})
}


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

//to verify if the route to the user actually exist
function verifyUser(req, res, next){
	var fp = getUserFilePath(req.params.username)

	fs.exists(fp, function(yes){

		if(yes){

			next()
		} else {
			console.log('path doesn exist!!!')
			//skip all the rest callbacks and move to the next app.get function 
			//next('route')

			res.redirect('/error/' + req.params.username)
		}
	})


}

//we can actually use response object to trigger a download event
app.get('*.json', function(req, res){
	
	res.download('./users/' + req.path)
})

//we can return an json object using the res.json method
app.get('/data/:username', function(req, res){

	var username = req.params.username
	var user = getUser(username)
	//
	res.json(user)
})

//this is similar to the route parameter in react router; 
// req is like a property passed in as we send out the request to the route. 
// username is passed in from the href in index.hbs
// pass in verigyUser funciton as another function to call when this get fucntion gets called. 
// it's like we chained the functions to call 
app.get('/:username', verifyUser, function(req,res){
	console.log('in the callback func')
	var username = req.params.username
	var user = getUser(username)
	res.render('user', {
		user: user, 
		address: user.location
	})
})

app.get('/error/:username', function(req, res){
	
	res.send("No user named " + req.params.username + ' found')
})

//handle the put request from the client (html page)
app.put('/:username', function(req,res){
	var username = req.params.username
	var user = getUser(username)
	user.location = req.body
	saveUser(username, user)
	//res.end() will ends the response process.
	res.end()

})

//handle the delete request from the client (html page)
app.delete('/:username', function(req,res){
	//get the path to the userfile
	var fp = getUserFilePath(req.params.username)
	//delete that file
	fs.ulinkSync(fp)
	res.sendStatus(200)
})






var server = app.listen(3000, function(){
	console.log('Server running at http://localhost: ' + server.address().port)
})




