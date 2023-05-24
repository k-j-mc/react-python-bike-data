import React from "react";

import { CircularProgress, Typography } from "@mui/material";

const Loader = (props) => {
	const { message } = props;

	return (
		<div className="gridCenterItems">
			<CircularProgress className="loaderCircle" />
			<Typography paragraph>{message}</Typography>
		</div>
	);
};

export default Loader;
