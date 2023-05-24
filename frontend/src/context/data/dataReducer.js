import {
	GET_DEFAULT_JOURNEY_DATA,
	GET_DEFAULT_STATION_DATA,
	GET_JOURNEYS,
	GET_STATIONS,
	SET_LOADING,
} from "../types";

const githubReducer = (state, action) => {
	switch (action.type) {
		case GET_DEFAULT_JOURNEY_DATA:
			return {
				...state,
				data: action.payload,
				loading: action.loading,
				error: action.error,
			};

		case GET_DEFAULT_STATION_DATA:
			return {
				...state,
				data: action.payload,
				loading: action.loading,
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
