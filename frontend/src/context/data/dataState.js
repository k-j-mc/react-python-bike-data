import React, { useReducer } from "react";
import axios from "axios";
import DataContext from "./dataContext";
import DataReducer from "./dataReducer";
import {
	GET_DEFAULT_JOURNEY_DATA,
	GET_DEFAULT_STATION_DATA,
	GET_JOURNEYS,
	GET_STATIONS,
	SET_INITIAL_LOADING,
	SET_LOADING,
} from "../types";

const DataState = (props) => {
	const initialState = {
		journeys: [],
		stations: [],
		initialLoading: true,
		loading: true,
		error: null,
	};

	const [state, dispatch] = useReducer(DataReducer, initialState);

	const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5050";

	let initialLoading = true;
	let loading = true;
	let error = null;

	const getDefaultJourneyData = async () => {
		setInitialLoading();

		const response = await axios.get(`${API_URL}/fetch-journeys`);

		if (response.data) {
			initialLoading = false;
		} else {
			initialLoading = false;
			error = "Journey data failed to load...";
		}

		dispatch({
			type: GET_DEFAULT_JOURNEY_DATA,
			payload: response.data,
			error: error,
			initialLoading: initialLoading,
		});
	};

	const getDefaultStationData = async () => {
		setInitialLoading();

		const response = await axios.get(`${API_URL}/fetch-stations`);

		if (response.data) {
			initialLoading = false;
		} else {
			initialLoading = false;
			error = "Station data failed to load...";
		}

		dispatch({
			type: GET_DEFAULT_STATION_DATA,
			payload: response.data,
			error: error,
			initialLoading: initialLoading,
		});
	};

	const getJourneys = async (e) => {
		setLoading();

		const limit = e.limit;
		const skip = e.skip;

		const response = await axios.get(
			`${API_URL}/journeys?limit=${limit}&skip=${skip}`
		);

		if (response.data.length > 0) {
			loading = false;
		} else {
			loading = false;
			error = "No journeys found...";
		}

		dispatch({
			type: GET_JOURNEYS,
			payload: response.data,
			error: error,
			loading: loading,
		});
	};

	const getStations = async () => {
		setLoading();

		const response = await axios.get(`${API_URL}/stations`);

		if (response.data.length > 0) {
			loading = false;
		} else {
			loading = false;
			error = "No stations found...";
		}

		dispatch({
			type: GET_STATIONS,
			payload: response.data,
			error: error,
			loading: loading,
		});
	};

	const setInitialLoading = () => dispatch({ type: SET_INITIAL_LOADING });

	const setLoading = () => dispatch({ type: SET_LOADING });

	return (
		<DataContext.Provider
			value={{
				journeyData: state.journeyData,
				stationData: state.stationData,
				journeys: state.journeys,
				stations: state.stations,
				initialLoading: state.initialLoading,
				loading: state.loading,
				error: state.error,
				getDefaultJourneyData,
				getDefaultStationData,
				getJourneys,
				getStations,
			}}
		>
			{props.children}
		</DataContext.Provider>
	);
};

export default DataState;
