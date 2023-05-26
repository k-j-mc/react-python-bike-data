import React, { useContext, useEffect } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import { SnackbarProvider } from "notistack";

import { Grid } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeContext from "./context/theme/themeContext";

import DataContext from "./context/data/dataContext";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ErrorPage from "./pages/ErrorPage";

import Notifications from "./components/Notifications";
import NavBar from "./components/NavBar";
import Loader from "./components/Loader";

import Icons from "./components/Icons";

const App = () => {
	const dataContext = useContext(DataContext);
	const themeContext = useContext(ThemeContext);

	const { initialLoading } = dataContext;
	const { theme } = themeContext;

	const themeData = createTheme(theme);

	useEffect(() => {
		dataContext.getDefaultJourneyData();
		dataContext.getDefaultStationData();
		dataContext.getJourneys({ limit: 10, skip: 0 });
		dataContext.getStations();
	}, []);

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

					<Notifications />
					<NavBar />
					<Grid container spacing={2} className="mainGrid">
						<Grid item xs={12}>
							{initialLoading ? (
								<Loader message="Loading..." />
							) : (
								<Routes>
									<Route
										exact
										path="/"
										element={<HomePage />}
									/>
									<Route
										exact
										path="/about"
										element={<AboutPage />}
									/>

									<Route
										path="*"
										element={
											<ErrorPage
												message="Page not found"
												icon={
													<Icons.WrongLocation className="noResultIcon" />
												}
											/>
										}
									/>
								</Routes>
							)}
						</Grid>
					</Grid>
				</ThemeProvider>
			</SnackbarProvider>
		</BrowserRouter>
	);
};

export default App;
