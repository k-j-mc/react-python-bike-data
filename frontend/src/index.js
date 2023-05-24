import React from "react";
import ReactDOM from "react-dom/client";

import DataState from "./context/data/dataState";
import ThemeState from "./context/theme/themeState";
import NotificationState from "./context/notifications/notificationState";

import "./styling/index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<DataState>
		<ThemeState>
			<NotificationState>
				<App />
			</NotificationState>
		</ThemeState>
	</DataState>
);
