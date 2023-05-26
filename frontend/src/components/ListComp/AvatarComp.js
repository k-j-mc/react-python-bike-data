import React from "react";

import { Avatar, Tooltip } from "@mui/material";

const AvatarComp = ({ stationNames, stationsString }) => {
	const stringToColor = (stationNames) => {
		let hash = 0;
		let i;

		if (stationNames !== undefined) {
			for (i = 0; i < stationNames.length; i += 1) {
				hash = stationNames.charCodeAt(i) + ((hash << 5) - hash);
			}

			let color = "#";

			for (i = 0; i < 3; i += 1) {
				const value = (hash >> (i * 8)) & 0xff;
				color += `00${value.toString(16)}`.slice(-2);
			}

			return color;
		}
	};

	const stringAvatar = (stationNames) => {
		if (stationNames !== undefined) {
			return {
				sx: {
					bgcolor: stringToColor(stationNames),
					fontSize: "14px",
				},
				children: `${stationNames.split(" ")[0][0]} - ${
					stationNames.split(" ")[1][0]
				}`,
			};
		}
	};

	return (
		<div className="avatarComp">
			<Tooltip title={stationsString}>
				<Avatar
					{...stringAvatar(stationNames)}
					style={{ fontSize: "20px" }}
				/>
			</Tooltip>
		</div>
	);
};

export default AvatarComp;
