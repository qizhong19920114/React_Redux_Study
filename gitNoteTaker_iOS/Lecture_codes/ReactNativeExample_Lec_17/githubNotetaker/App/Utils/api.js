var api = {
	getBio(username){
		username = username.toLowerCase().trim();
		var url = `https://api.github.com/users/${username}`;
		return fetch(url).then((res)=> res.json());
	},

	getRepos(username){
		username = username.toLowerCase().trim();
		var url = `https://api.github.com/users/${username}/repos`;
		return fetch(url).then((res)=> res.json());
	},
	getNotes(username){

		username = username.toLowerCase().trim();
		var url = `https://github-note-taker-cc2b5.firebaseio.com/${username}.json`;
		console.log('fetch url is ', url); 
		return fetch(url,{
			method: 'get'
		}).then((res) => res.json())
	}, 
	//use a the post method for firebase (not sure if it's gonna work because the firebase has been updated)
	addNote(username, note){

		username = username.toLowerCase().trim();
		var url = `https://github-note-taker-cc2b5.firebaseio.com/${username}.json`;
		return fetch(url, {
			method: 'post',
			body: JSON.stringify(note)
		}).then((res) => res.json());
	}

};


module.exports = api; 