import React, { useContext, useEffect } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import { SnackbarProvider } from "notistack";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeContext from "./context/theme/themeContext";

import DataContext from "./context/data/dataContext";

const App = () => {
	const dataContext = useContext(DataContext);
	const themeContext = useContext(ThemeContext);

	const { theme } = themeContext;

	const themeData = createTheme(theme);

	useEffect(() => {
		dataContext.getJourneys();
		dataContext.getStations();
	}, []);

	console.log(dataContext);

	return (
		<BrowserRouter>
			<SnackbarProvider
				maxSnack={3}
				anchorOrigin={{
					vertical: "top",
					horizontal: "center",
				}}
				autoHideDuration={2000}
			>
				<ThemeProvider theme={themeData}>
					<CssBaseline />
					<div>asfa</div>
				</ThemeProvider>
			</SnackbarProvider>
		</BrowserRouter>
	);
};

export default App;
