// //don't need this file anymore we are going to use a fake backend. 
// //use try catch because we might not have access to the local storage if the user configuration doesn't give us permission
// export const loadState = () => {
// 	try {
// 		const serializedState = localStorage.getItem('state');
// 		if (serializedState === null) {
// 			return undefined; 
// 		}

// 		console.log('returned serializedState ' + serializedState);
// 		return JSON.parse(serializedState);
// 	} catch (err){
// 		console.log("unable to load state");
// 		return undefined;
// 	}

// }

// export const saveState = (state) => {
	
// 	try{
// 		console.log("saveState")
// 		const serializedState = JSON.stringify(state);
// 		console.log('saved serializedState ' + serializedState);
// 		localStorage.setItem('state', serializedState);
// 	} catch (err) {
// 		//ignore for now.
// 		console.log("unable to save state");
// 	}
// }