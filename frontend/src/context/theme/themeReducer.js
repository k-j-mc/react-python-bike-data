import { GET_THEME } from "../types";

const themeReducer = (state, action) => {
	switch (action.type) {
		case GET_THEME:
			return {
				...state,
				theme: action.payload,
			};

		default:
			return state;
	}
};

export default themeReducer;
