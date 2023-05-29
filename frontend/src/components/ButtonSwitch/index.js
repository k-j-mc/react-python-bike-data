import React from "react";

import { Button, ButtonGroup } from "@mui/material";

const ButtonSwitch = () => {
	return (
		<ButtonGroup
			variant="text"
			aria-label="text button group"
			className="buttonSwitch"
		>
			<Button>Journeys</Button>
			<Button>Stations</Button>
		</ButtonGroup>
	);
};

export default ButtonSwitch;
