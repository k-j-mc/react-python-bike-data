import React, { useReducer } from "react";
import axios from "axios";
import DataContext from "./dataContext";
import DataReducer from "./dataReducer";
import {
	GET_DEFAULT_JOURNEY_DATA,
	GET_DEFAULT_STATION_DATA,
	GET_JOURNEYS,
	GET_STATIONS,
	SET_LOADING,
} from "../types";

const DataState = (props) => {
	const initialState = {
		journeys: [],
		stations: [],
		loading: true,
		error: null,
	};

	const [state, dispatch] = useReducer(DataReducer, initialState);

	const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5050";

	let loading = true;
	let error = null;

	const getDefaultJourneyData = async () => {
		setLoading();

		const response = await axios.get(`${API_URL}/fetch-journeys`);

		if (response.data.items.length > 0) {
			loading = false;
		} else {
			loading = false;
			error = "Journey data failed to load...";
		}

		dispatch({
			type: GET_DEFAULT_JOURNEY_DATA,
			payload: response.data,
			error: error,
			loading: loading,
		});
	};

	const getDefaultStationData = async () => {
		setLoading();

		const response = await axios.get(`${API_URL}/fetch-stations`);

		if (response.data.length > 0) {
			loading = false;
		} else {
			loading = false;
			error = "Station data failed to load...";
		}

		dispatch({
			type: GET_DEFAULT_STATION_DATA,
			payload: response.data,
			error: error,
			loading: loading,
		});
	};

	const getJourneys = async () => {
		setLoading();

		const response = await axios.get(`${API_URL}/journeys`);

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

	const setLoading = () => dispatch({ type: SET_LOADING });

	return (
		<DataContext.Provider
			value={{
				journeys: state.journeys,
				stations: state.stations,
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
