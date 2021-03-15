import { HANDLE_LOGIN, USER_SESION } from "../types";

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
      }
};

export default context;