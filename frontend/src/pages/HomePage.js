import React from "react";

import { Typography } from "@mui/material";

import ListComp from "../components/ListComp";

const HomePage = () => {
	return (
		<div className="gridCenterItems">
			<Typography variant="h5" className="pageTitle">
				HSL Biker Home Page
			</Typography>
			<ListComp />
		</div>
	);
};

export default HomePage;
