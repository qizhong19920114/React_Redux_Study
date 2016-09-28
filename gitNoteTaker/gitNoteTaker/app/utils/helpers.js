import axios from 'axios' // this is for http request to get the github data

// axios.get will reuturn a promise object

function getRepos(username){

	return axios.get(`https://api.github.com/users/${username}/repos`);
};

function getUserInfo(username){

	return axios.get(`https://api.github.com/users/${username}`);

};

//axios.all gets an array of promises
// it will wait until both promises got resolved and pass back an array of return data
// no need to change to the arrow function but if we have "this" then arrow function will help us with context and we won't need to use .bind(this)
// const is the new es6 syntax; const get us one step closer to immutable, we can still re-assign properties to helpers but we can re-assign helpers itself. 

export default function	getGithubInfo(username){
		return axios.all([getRepos(username), getUserInfo(username)])
			.then((arr)=>({repos: arr[0].data, bio: arr[1].data}));
	}


