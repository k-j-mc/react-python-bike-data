import React, { useContext } from "react";

import { GeoJsonLoader, Map, Marker } from "pigeon-maps";

import DataContext from "../../context/data/dataContext";

import Loader from "../Loader";

const Maps = () => {
	const dataContext = useContext(DataContext);

	const { coords, loadingCoords } = dataContext;

	const getMiddle = (prop, markers) => {
		let values = markers.map((m) => m[prop]);

		let min = Math.min(...values);
		let max = Math.max(...values);

		if (prop === "lng" && max - min > 180) {
			values = values.map((val) => (val < max - 180 ? val + 360 : val));
			min = Math.min(...values);
			max = Math.max(...values);
		}

		let result = (min + max) / 2;

		if (prop === "lng" && result > 180) {
			result -= 360;
		}

		return result;
	};

	const findCenter = (markers) => {
		return [getMiddle("lat", markers), getMiddle("lng", markers)];
	};

	return (
		<div className="mapContainer">
			{!loadingCoords && coords.station_return ? (
				<Map
					height={300}
					defaultCenter={findCenter([
						{
							lat: coords.station_depart[0].y,
							lng: coords.station_depart[0].x,
						},
						{
							lat: coords.station_return[0].y,
							lng: coords.station_return[0].x,
						},
					])}
					defaultZoom={12}
				>
					<GeoJsonLoader
						link={
							"https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.geojson"
						}
						styleCallback={(feature, hover) => {
							if (feature.geometry.type === "LineString") {
								return { strokeWidth: "1", stroke: "black" };
							}
							return {
								fill: "rgb(0 122 201 / 0.3)",
								strokeWidth: "1",
								stroke: "white",
								r: "8",
							};
						}}
					/>
					<Marker
						width={50}
						anchor={[
							coords.station_depart[0].y,
							coords.station_depart[[0]].x,
						]}
					/>
					<Marker
						width={50}
						anchor={[
							coords.station_return[0].y,
							coords.station_return[0].x,
						]}
					/>
				</Map>
			) : (
				<Loader message="Loading map..." />
			)}
		</div>
	);
};

export default Maps;
