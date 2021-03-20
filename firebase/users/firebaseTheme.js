import firebase from "../firebase.config";

// variables
let db = firebase.firestore();
export let themeRef = db.collection("theme");


// create theme  
export let createTheme = () => {
	let userTheme = firebase.auth().currentUser;
	let uid = userTheme.uid;
	let ThemeMode = "light";
	let themeObject = { uid, ThemeMode };
	themeRef
		.doc(uid)
		.set({ themeObject })
		.then(() => {
			console.log("Theme created");
		}).catch((error) => {
			console.log(error);
		});
};

// update Theme
export let updateTheme = (topic) => {
	let user = firebase.auth().currentUser;
	let userId = user.uid;
	let ThemeMode = topic;
	let themeObject = { userId, ThemeMode };
	themeRef
		.doc(userId)
		.set({ themeObject })
		.then(() => {
			console.log("Theme updated");
		})
		.catch((error) => {
			console.log(error);
		});
};

// delete theme
export let deleteTheme = () => {
	let delTheme = firebase.auth().currentUser;
	themeRef.doc(delTheme.uid).delete()
		.then(() => {
			console.log("Document succesfully deleted!");
		}).catch((error) => {
			console.log("Error removing document: ", error);
		});
};

export default firebase;
