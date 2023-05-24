import React, { useReducer } from "react";
import NotificationContext from "./notificationContext";
import NotificationReducer from "./notificationReducer";
import { SET_NOTIFICATION, REMOVE_NOTIFICATION } from "../types";

const NotificationState = (props) => {
	const initialState = null;

	const [state, dispatch] = useReducer(NotificationReducer, initialState);

	const setNotification = (message, variant) => {
		dispatch({
			type: SET_NOTIFICATION,
			payload: { message, variant },
		});

		setTimeout(() => dispatch({ type: REMOVE_NOTIFICATION }), 2000);
	};

	return (
		<NotificationContext.Provider
			value={{
				notification: state,
				setNotification,
			}}
		>
			{props.children}
		</NotificationContext.Provider>
	);
};

export default NotificationState;
