 //this is like a switch statement file for action handling
 export default function (state=null, action){
 	switch(action.type) {

 		case "USER_SELECTED":
 			return action.payload;// return the user that is last clicked
 			break;
 	}
 	return state; 
 }