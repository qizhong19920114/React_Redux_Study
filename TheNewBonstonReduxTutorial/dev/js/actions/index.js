//this is a new es6 syntax to create a function
export const selectUser = (user) => {

	console.log("You clicked on user: ", user.first);
	return {
		type: "USER_SELECTED", 
		payload: user
	}
};

