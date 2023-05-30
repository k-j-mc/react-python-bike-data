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

		case GET_COORDS:
			return {
				...state,
				coords: action.payload,
				loadingCoords: action.loadingCoords,
				error: action.error,
			};

		case SET_PAGE:
			return {
				...state,
				page: action.page,
			};

		case SET_LIMIT:
			return {
				...state,
				limit: action.limit,
			};

		case SET_SKIP:
			return {
				...state,
				skip: action.skip,
			};

		case SET_SEARCH_QUERY:
			return {
				...state,
				searchQuery: action.searchQuery,
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

		case SET_COORDS_LOADING:
			return {
				...state,
				loadingCoords: true,
			};

		default:
			return state;
	}
};

export default githubReducer;
