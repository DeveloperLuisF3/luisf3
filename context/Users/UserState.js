import { useReducer } from "react";
import UserReducer from "./UserReducer";
import UserContext from "./UserContext";

// database
import { loginWithGoogle } from "../../firebase/users/firebaseLogin";

const UserState = (props) => {
	const initialState = {
		login: null
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
		console.log(u);
		dispatch({
			type: "USER_SESION",
			payload: u
		})
	};

	return (
		<UserContext.Provider
			value={{
				login: state.login,
				HandleLogin,
				HandleSesion,
			}}
		>
			{ props.children}
		</UserContext.Provider>
	);
};

export default UserState;
