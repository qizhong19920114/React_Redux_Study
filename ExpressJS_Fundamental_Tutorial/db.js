//Note:
//First, we need to start the mongodb, in the terminal run: sudo mongod
//Then we need to import the db collestion from the local file: 
//run this: mongoimport --db test --collection users --drop --file user_list.json

var uri = 'mongodb://localhost:27017/test'
var _ = require('lodash');
var mongoose = require('mongoose')
mongoose.connect(uri)

var db = mongoose.connection

//check if the database is connected
db.on('error', console.error.bind(console, 'connection error:'))
//once db is open, log to the console
db.once('open', function (callback) {
  console.log('db connected')
})

var userSchema = mongoose.Schema({
  username: String,
  gender: String,
  name: {
    title: String,
    first: String,
    last: String
  },
  location: {
    street: String,
    city: String,
    state: String,
    zip: Number
  }
});

//create a virtual property that's doesn't exist in the structure of the data so we can use the virtual properties  
userSchema.virtual('name.full').get(function(){
  return _.startCase(this.name.first + ' ' + this.name.last); 

}); 

//define the setter for the virtual properties
userSchema.virtual('name.full').set(function(value){
  //split the value we get to an array which the first itemis first name and the 2nd item is last name
  var bits = value.split(' ');
  this.name.first = bits[0];
  this.name.last = bits[1];
  return _.startCase(this.name.first + ' ' + this.name.last); 

}); 

//export the user object
exports.User = mongoose.model('User', userSchema)

//just a quick test to see if the db works
// exports.User.find({}, function(err, users){

//   console.log(users)
// })