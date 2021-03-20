import { HANDLE_LOGIN, USER_SESION, HANDLE_THEME } from "../types";

let context = (state, action) => {
	const { payload, type } = action;
	switch (type) {
		case HANDLE_LOGIN:
			return {
				...state,
				login: payload
			};
		case USER_SESION:
			return {
				...state,
				login: payload
			};
		case HANDLE_THEME:
			return {
				...state,
				ThemeMode: payload
			};
	}
};

export default context;