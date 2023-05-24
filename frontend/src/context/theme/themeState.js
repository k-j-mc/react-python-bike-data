import React, { useReducer } from "react";
import ThemeContext from "./themeContext";
import ThemeReducer from "./themeReducer";
import { GET_THEME } from "../types";
import ThemeStyling from "../../styling/ThemeStyling";

const ThemeState = (props) => {
	const initialState = {
		theme: ThemeStyling,
	};

	const [state, dispatch] = useReducer(ThemeReducer, initialState);

	const getTheme = async (e) => {
		const mode = e.toLowerCase();

		const theme = {
			...initialState.theme,
			palette: { ...initialState.theme.palette, mode: mode },
			typography: {
				allVariants: {
					...initialState.theme.typography.allVariants,
					color: mode === "light" ? "#000000" : "#FFFFFF",
				},
			},
			components: {
				...initialState.theme.components,
			},
		};

		dispatch({
			type: GET_THEME,
			payload: theme,
		});
	};

	return (
		<ThemeContext.Provider
			value={{
				theme: state.theme,
				getTheme,
			}}
		>
			{props.children}
		</ThemeContext.Provider>
	);
};

export default ThemeState;
