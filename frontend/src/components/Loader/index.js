import React from "react";

import styled, { keyframes } from "styled-components";
import { lightSpeedIn } from "react-animations";

import { Typography } from "@mui/material";

import Icons from "../Icons";

const In = styled.div`
	animation: 4s ${keyframes`${lightSpeedIn}`} infinite;
`;

const Loader = (props) => {
	const { message } = props;

	return (
		<div className="gridCenterItems">
			<In className="loaderBike">
				<Icons.Bike className="loaderIcon" />
			</In>
			<Typography paragraph>{message}</Typography>
		</div>
	);
};

export default Loader;
