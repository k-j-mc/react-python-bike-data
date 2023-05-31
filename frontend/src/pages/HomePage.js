import React, { useContext, useState } from "react";

import { Typography } from "@mui/material";

import DataContext from "../context/data/dataContext";

import ButtonSwitch from "../components/ButtonSwitch";
import SearchBar from "../components/SearchBar";
import JourneyList from "../components/JourneyList";
import StationList from "../components/StationList";

const HomePage = () => {
	const dataContext = useContext(DataContext);

	const [activeData, setActiveData] = useState(0);

	const handleActiveData = (e) => {
		setActiveData(e);
		dataContext.setPage(1);
		dataContext.setSkip(0);
	};

	return (
		<div className="gridCenterItems">
			<Typography variant="h5" className="pageTitle">
				HSL Biker
			</Typography>
			<ButtonSwitch
				activeData={activeData}
				handleActiveData={handleActiveData}
			/>
			<SearchBar />
			{activeData === 0 ? (
				<JourneyList activeData={activeData} />
			) : (
				<StationList activeData={activeData} />
			)}
		</div>
	);
};

export default HomePage;
