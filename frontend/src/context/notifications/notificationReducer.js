import { SET_NOTIFICATION, REMOVE_NOTIFICATION } from "../types";

const notificationReducer = (state, action) => {
	switch (action.type) {
		case SET_NOTIFICATION:
			return action.payload;
		case REMOVE_NOTIFICATION:
			return null;

		default:
			return state;
	}
};

export default notificationReducer;
