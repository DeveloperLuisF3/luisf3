import { useReducer } from "react";
import UserReducer from "./UserReducer";
import UserContext from "./UserContext";

// database
import { loginWithGoogle } from "../../firebase/users/firebaseLogin";

const UserState = (props) => {
	const initialState = {
		login: null,
		ThemeMode: "light"
	};

	const [state, dispatch] = useReducer(UserReducer, initialState);

	let HandleLogin = () => {
		loginWithGoogle()
			.then(user => {
				dispatch({
					type: "HANDLE_LOGIN",
					payload: user
				})
			});
	};

	let HandleSesion = (u) => {
		dispatch({
			type: "USER_SESION",
			payload: u
		})
	};

	let HandleTheme = (topic) => {
		console.log(topic);
		dispatch({
			type: "HANDLE_THEME",
			payload: topic
		})
	};

	return (
		<UserContext.Provider
			value={{
				login: state.login,
				ThemeMode: state.ThemeMode,
				HandleLogin,
				HandleSesion,
				HandleTheme
			}}
		>
			{ props.children}
		</UserContext.Provider>
	);
};

export default UserState;
