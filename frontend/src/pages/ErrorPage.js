import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Typography } from "@mui/material";

import BackButton from "../components/BackButton";

const ErrorPage = (props) => {
	const { message, icon } = props;

	const navigate = useNavigate();

	const [timeLeft, setTimeLeft] = useState(5);

	useEffect(() => {
		if (timeLeft === 0) {
			setTimeLeft(0);

			setTimeout(() => {
				navigate("/");
			}, 1000);
		}

		if (!timeLeft) return;

		const intervalId = setInterval(() => {
			setTimeLeft(timeLeft - 1);
		}, 1000);

		return () => clearInterval(intervalId);
		// eslint-disable-next-line
	}, [timeLeft]);

	const redirectMessage = `Redirecting in: ${timeLeft}`;

	return (
		<Fragment>
			<BackButton />
			<div className="gridCenterItems">
				{icon}
				<Typography paragraph>Uh oh... {message}</Typography>
				<Typography paragraph>{redirectMessage}</Typography>
			</div>
		</Fragment>
	);
};

export default ErrorPage;
