import React, { Fragment, useEffect, useState } from "react";

import { Box, LinearProgress, Typography } from "@mui/material";

const JourneyGraph = ({ journeys }) => {
	console.log(journeys);

	const [minimumLength, setMinimumLength] = useState(0);
	const [minimumSeconds, setMinimumSeconds] = useState(0);

	const [maximumLength, setMaximumLength] = useState(0);
	const [maximumSeconds, setMaximumSeconds] = useState(0);

	const [averageLength, setAverageLength] = useState(0);
	const [averageSeconds, setAverageSeconds] = useState(0);

	const [lengthPercentage, setLengthPercentage] = useState(0);
	const [secondsPercentage, setSecondsPercentage] = useState(0);

	useEffect(() => {
		let minLength = 0;
		let minSeconds = 0;

		let maxLength = 0;
		let maxSeconds = 0;

		let length = 0;
		let seconds = 0;

		journeys.map(
			(obj) => (
				(length = length + obj["Covered distance (m)"]),
				(seconds = seconds + obj["Duration (sec.)"])
			)
		);

		maxLength = Math.max(
			...journeys.map((obj) => obj["Covered distance (m)"])
		);
		maxSeconds = Math.max(...journeys.map((obj) => obj["Duration (sec.)"]));

		minLength = Math.min(
			...journeys.map((obj) => obj["Covered distance (m)"])
		);
		minSeconds = Math.min(...journeys.map((obj) => obj["Duration (sec.)"]));

		setMinimumLength(minLength);
		setMinimumSeconds(minSeconds);

		setMaximumLength(maxLength);
		setMaximumSeconds(maxSeconds);

		setAverageLength(length / journeys.length);
		setAverageSeconds(seconds / journeys.length);

		setLengthPercentage((averageLength / maxLength) * 100);
		setSecondsPercentage((averageSeconds / maxSeconds) * 100);
	}, [journeys]);

	return (
		<Fragment>
			<Box className="progressContainer">
				<Box sx={{ minWidth: 35 }}>
					<Typography variant="body2" color="text.secondary">
						{minimumLength}
					</Typography>
				</Box>
				<Box sx={{ width: "100%", mr: 1 }}>
					<LinearProgress
						variant="determinate"
						color="success"
						value={lengthPercentage}
						className="progressVis"
					/>
				</Box>
				<Box sx={{ minWidth: 35 }}>
					<Typography variant="body2" color="text.secondary">
						{maximumLength}
					</Typography>
				</Box>
			</Box>
			<Typography variant="subtitle2">
				Average: {averageLength} metres
			</Typography>

			<Box className="progressContainer">
				<Box sx={{ minWidth: 35 }}>
					<Typography variant="body2" color="text.secondary">
						{minimumSeconds}
					</Typography>
				</Box>
				<Box sx={{ width: "100%", mr: 1 }}>
					<LinearProgress
						variant="determinate"
						color="success"
						value={secondsPercentage}
						className="progressVis"
					/>
				</Box>
				<Box sx={{ minWidth: 35 }}>
					<Typography variant="body2" color="text.secondary">
						{maximumSeconds}
					</Typography>
				</Box>
			</Box>
			<Typography variant="subtitle2">
				Average: {averageSeconds} seconds
			</Typography>
		</Fragment>
	);
};

export default JourneyGraph;
