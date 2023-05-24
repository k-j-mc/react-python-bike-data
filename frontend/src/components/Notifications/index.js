import { useContext, useEffect } from "react";
import NotificationContext from "../../context/notifications/notificationContext";

import { useSnackbar } from "notistack";

const Notifications = () => {
	const notificationContext = useContext(NotificationContext);

	const { notification } = notificationContext;

	const { enqueueSnackbar } = useSnackbar();

	useEffect(() => {
		if (notification) {
			enqueueSnackbar(notification.message, {
				variant: notification.variant,
				preventDuplicate: true,
			});
		}

		// eslint-disable-next-line
	}, [notification]);
};

export default Notifications;
