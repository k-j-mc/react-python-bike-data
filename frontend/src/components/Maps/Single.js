import React from "react";

import { GeoJsonLoader, Map, Marker } from "pigeon-maps";

import Loader from "../Loader";

const Maps = ({ stationData, loadingCoords }) => {
	return (
		<div className="mapContainer">
			{!loadingCoords ? (
				<Map height={300} defaultCenter={stationData} defaultZoom={12}>
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
					<Marker width={50} anchor={stationData} />
				</Map>
			) : (
				<Loader message="Loading map..." />
			)}
		</div>
	);
};

export default Maps;
