var express=require('express')
var helpers =require('./helpers')
var fs=require('fs')

var User = require('./db').User


var router = express.Router({
  mergeParams: true
})

//we will use just a slash / for all the routes because the user anme is passed in from the index app.use Router

// if we use the .use method, this is gonna file the console log for every router request regardless of the path
router.use(function(req, res, next){
	console.log(req.method, 'for', req.params.username, ' at ' + req.path)
	next()
})

//this is similar to the route parameter in react router; 
// req is like a property passed in as we send out the request to the route. 
// username is passed in from the href in index.hbs
// pass in verigyUser funciton as another function to call when this get fucntion gets called. 
// it's like we chained the functions to call 
router.get('/', helpers.verifyUser, function(req,res){
	console.log('in the callback func')
	var username = req.params.username
	//var user = helpers.getUser(username)

	User.findOne({username: username}, function(err, user){
		res.render('user', {
		user: user, 
		address: user.location
	})

	})

})


//use an error handler middleware
router.use(function (err, req, res, next){
	console.error(err.stack)
	res.status(500).send('Something broke!')

})



// router.get('/edit', function (req, res) {
//   res.send('You want to edit ' + req.params.username + '???')
// })



//handle the put request from the client (html page)
router.put('/', function(req,res){
	var username = req.params.username
	//var user = helpers.getUser(username)

	//somehow we can't update the data using find and update if we have virtual properties, so we have to update data manually
	User.findOne({username: username}, function(err, user){
		if (err) console.error(err);
		
		user.location = req.body.location;
		user.name.full=req.body.name;
		user.save(function (){
			res.end();
		})
		
	})
})


//handle the delete request from the client (html page)
// I guess we could use mongoose to delete the record ; Because before, we didn't have db, so we had to delete the file that's why we were using a users folder for different users instead of putting all the info in one file.  
router.delete('/', function(req,res){
	//get the path to the userfile
	var fp = helpers.getUserFilePath(req.params.username)
	//delete that file
	fs.ulinkSync(fp)
	res.sendStatus(200)
})

module.exports =router