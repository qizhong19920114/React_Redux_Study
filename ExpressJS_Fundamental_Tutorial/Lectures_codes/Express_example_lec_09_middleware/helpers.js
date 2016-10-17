var fs = require('fs')
var path = require('path')
var _ = require('lodash')


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

//get the file path of the json file in the users directory based on the username passed in
function getUserFilePath (username) {
  return path.join(__dirname, 'users', username) + '.json'
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

exports.getUser=getUser
exports.getUserFilePath=getUserFilePath
exports.saveUser=saveUser
exports.verifyUser=verifyUser