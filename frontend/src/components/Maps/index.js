import React from "react";

import { GeoJsonLoader, Map, Marker } from "pigeon-maps";

const Maps = () => {
	return (
		<div className="mapContainer">
			<Map
				height={300}
				defaultCenter={[60.171524, 24.827467]}
				defaultZoom={11}
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
							fill: "#007ac9",
							strokeWidth: "1",
							stroke: "white",
							r: "8",
						};
					}}
				/>
				<Marker width={50} anchor={[60.171524, 24.827467]} />
			</Map>
		</div>
	);
};

export default Maps;
