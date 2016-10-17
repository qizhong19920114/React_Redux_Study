var axios = require('axios'); // this is for http request to get the github data

// axios.get will reuturn a promise object

function getRepos(username){

	return axios.get('https://api.github.com/users/'+username+'/repos');
};

function getUserInfo(username){

	return axios.get('https://api.github.com/users/'+username)

};

//axios.all gets an array of promises
// it will wait until both promises got resolved and pass back an array of return data
var helpers = {
	getGithubInfo: function(username){
		return axios.all([getRepos(username), getUserInfo(username)])
		.then(function(arr){
			return{
				repos: arr[0].data,
				bio: arr[1].data
			}

		});
	}

};

module.exports = helpers; 