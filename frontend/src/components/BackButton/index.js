import React from "react";

import { useNavigate } from "react-router-dom";

import { IconButton } from "@mui/material";

import Icons from "../Icons";

const BackButton = () => {
	const navigate = useNavigate();

	return (
		<div className="backwardsNav">
			<IconButton onClick={() => navigate("/")}>
				<Icons.Back />
			</IconButton>
		</div>
	);
};

export default BackButton;
