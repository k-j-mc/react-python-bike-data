import React from "react";

import { Button, ButtonGroup } from "@mui/material";

const ButtonSwitch = ({ activeData, handleActiveData }) => {
	return (
		<ButtonGroup
			variant="text"
			aria-label="text button group"
			disableElevation
			className="buttonSwitch"
		>
			<Button
				style={{ color: activeData === 0 ? "#007ac9" : "#757575" }}
				onClick={() => handleActiveData(0)}
			>
				Journeys
			</Button>
			<Button
				style={{ color: activeData === 1 ? "#007ac9" : "#757575" }}
				onClick={() => handleActiveData(1)}
			>
				Stations
			</Button>
		</ButtonGroup>
	);
};

export default ButtonSwitch;
