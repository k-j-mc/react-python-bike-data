import {
	GET_DEFAULT_JOURNEY_DATA,
	GET_DEFAULT_STATION_DATA,
	GET_JOURNEYS,
	GET_STATIONS,
	SET_INITIAL_LOADING,
	SET_LOADING,
} from "../types";

const githubReducer = (state, action) => {
	switch (action.type) {
		case GET_DEFAULT_JOURNEY_DATA:
			return {
				...state,
				journeyData: action.payload,
				initialLoading: action.initialLoading,
				error: action.error,
			};

		case GET_DEFAULT_STATION_DATA:
			return {
				...state,
				stationData: action.payload,
				initialLoading: action.initialLoading,
				error: action.error,
			};

		case GET_JOURNEYS:
			return {
				...state,
				journeys: action.payload,
				loading: action.loading,
				error: action.error,
			};

		case GET_STATIONS:
			return {
				...state,
				stations: action.payload,
				loading: action.loading,
				error: action.error,
			};

		case SET_INITIAL_LOADING:
			return {
				...state,
				initialLoading: true,
			};

		case SET_LOADING:
			return {
				...state,
				loading: true,
			};

		default:
			return state;
	}
};

export default githubReducer;
