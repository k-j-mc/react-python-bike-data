import React from "react";

import { Typography } from "@mui/material";

import ButtonSwitch from "../components/ButtonSwitch";
import SearchBar from "../components/SearchBar";
import ListComp from "../components/ListComp";

const HomePage = () => {
	return (
		<div className="gridCenterItems">
			<Typography variant="h5" className="pageTitle">
				HSL Biker
			</Typography>
			<ButtonSwitch />
			<SearchBar />
			<ListComp />
		</div>
	);
};

export default HomePage;
