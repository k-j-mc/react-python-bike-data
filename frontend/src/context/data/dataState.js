import React, { useReducer } from "react";
import axios from "axios";
import DataContext from "./dataContext";
import DataReducer from "./dataReducer";
import {
	GET_DEFAULT_JOURNEY_DATA,
	GET_DEFAULT_STATION_DATA,
	GET_JOURNEYS,
	GET_STATIONS,
	GET_COORDS,
	SET_PAGE,
	SET_LIMIT,
	SET_SKIP,
	SET_SEARCH_QUERY,
	SET_INITIAL_LOADING,
	SET_LOADING,
	SET_COORDS_LOADING,
} from "../types";

const DataState = (props) => {
	const initialState = {
		journeys: [],
		stations: [],
		coords: [],
		initialLoading: true,
		loading: true,
		loadingCoords: true,
		error: null,
		searchQuery: "",
		page: 1,
		limit: 10,
		skip: 0,
	};

	const [state, dispatch] = useReducer(DataReducer, initialState);

	const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5050";

	let initialLoading = true;
	let loading = true;
	let loadingCoords = true;
	let error = null;

	const getDefaultJourneyData = async () => {
		setInitialLoading();

		const response = await axios
			.get(`${API_URL}/fetch-journeys`)
			.then((response) => response.data);

		if (response.data) {
			initialLoading = false;
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
		const station_name = e.station_name;

		const response = await axios.get(
			`${API_URL}/journeys?limit=${limit}&skip=${skip}&station_name=${station_name}`
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

	const getStations = async (e) => {
		setLoading();

		const limit = e.limit;
		const skip = e.skip;
		const station_name = e.station_name;

		const response = await axios.get(
			`${API_URL}/stations?limit=${limit}&skip=${skip}&station_name=${station_name}`
		);

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

	const getCoords = async (e) => {
		setCoordsLoading();

		const station_depart = e.station_depart;
		const station_return = e.station_return;

		const response = await axios.get(
			`${API_URL}/coords?station_depart=${station_depart}&station_return=${station_return}`
		);

		if (response.data.length > 0) {
			loadingCoords = false;
		} else {
			loadingCoords = false;
			error = "No stations found...";
		}

		dispatch({
			type: GET_COORDS,
			payload: response.data,
			error: error,
			loadingCoords: loadingCoords,
		});
	};

	const setSearchQuery = (e) =>
		dispatch({ type: SET_SEARCH_QUERY, searchQuery: e });

	const setPage = (e) => dispatch({ type: SET_PAGE, page: e });

	const setLimit = (e) => dispatch({ type: SET_LIMIT, limit: e });

	const setSkip = (e) => dispatch({ type: SET_SKIP, skip: e });

	const setInitialLoading = () => dispatch({ type: SET_INITIAL_LOADING });

	const setLoading = () => dispatch({ type: SET_LOADING });

	const setCoordsLoading = () => dispatch({ type: SET_COORDS_LOADING });

	return (
		<DataContext.Provider
			value={{
				journeyData: state.journeyData,
				stationData: state.stationData,
				journeys: state.journeys,
				stations: state.stations,
				coords: state.coords,
				page: state.page,
				limit: state.limit,
				skip: state.skip,
				searchQuery: state.searchQuery,
				initialLoading: state.initialLoading,
				loading: state.loading,
				loadingCoords: state.loadingCoords,
				error: state.error,
				getDefaultJourneyData,
				getDefaultStationData,
				setPage,
				setLimit,
				setSkip,
				setSearchQuery,
				getJourneys,
				getStations,
				getCoords,
			}}
		>
			{props.children}
		</DataContext.Provider>
	);
};

export default DataState;
