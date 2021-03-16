import firebase from "../firebase.config";

// variables
let db = firebase.firestore();
let usersRef = db.collection("users");

// login with google
export let loginWithGoogle = () => {
	const provider = new firebase.auth.GoogleAuthProvider();
	return firebase
		.auth()
		.signInWithPopup(provider)
		.then((result) => {
			var user = result.user;
			console.log(user);
			localStorage.setItem("user", JSON.stringify(result.user));
			createUser(user);
			return result.user;
		})
		.catch((error) => {
			console.log(error);
		});
};

// add user data to database
let createUser = (user) => {
	let name = user.displayName;
	let email = user.email;
	let image = user.photoURL;
	let userId = user.uid;
	let userObject = { name, email, image, userId };
	console.log(userObject);
	usersRef
		.doc(userObject.userId)
		.set({ userObject })
		.then(() => {
			console.log("User Created");
		})
		.catch((error) => {
			console.log("Qué gusto verte de nuevo!");
		});
};

// logOut
export let logOut = () => {
	firebase.auth().signOut();
	localStorage.removeItem("user");
};

// delete user data from database
export let deleteUser = () => {
	let delUser = firebase.auth().currentUser;
	console.log(delUser.uid);
	usersRef
		.doc(delUser.uid)
		.delete()
		.then(() => {
			console.log("User Data Delete");
			leave(delUser);
		})
		.catch((error) => {
			console.log("Error removing document: ", error);
		});
};

// delete user from firebase
let leave = (delUser) => {
	delUser
		.delete()
		.then(() => {
			console.log("User Deleted");
		})
		.catch((error) => {
			console.log(error);
		});
};

export default firebase;
