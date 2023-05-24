import React, { Fragment } from "react";

import { Typography } from "@mui/material";

import BackButton from "../components/BackButton";

const AboutPage = () => {
	return (
		<Fragment>
			<BackButton />
			<div className="gridCenterItems">
				<Typography variant="h5" className="pageTitle">
					HSL Biker App
				</Typography>
				<Typography paragraph>
					React App to search for Bike journeys
				</Typography>
				<Typography paragraph>Version 1.0.0</Typography>
			</div>
		</Fragment>
	);
};

export default AboutPage;
