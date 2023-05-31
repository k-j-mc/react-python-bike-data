import React, { Fragment, useContext } from "react";

import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Divider,
	ListItem,
	ListItemText,
	Tooltip,
	Typography,
} from "@mui/material";

import DataContext from "../../context/data/dataContext";

import LoaderSkeleton from "../Loader/LoaderSkeleton";
import AvatarComp from "../AvatarComp";
import Maps from "../Maps";

import Icons from "../Icons";

const JourneyItem = ({ expanded, onExpand, journey, loading }) => {
	const dataContext = useContext(DataContext);

	const { coords, loadingCoords } = dataContext;

	const journeyToFrom = `${journey["Departure station name"]} - ${journey["Return station name"]}`;

	const toHoursAndMinutes = (totalSeconds) => {
		const totalMinutes = Math.floor(totalSeconds / 60);

		const seconds = totalSeconds % 60;
		const hours = Math.floor(totalMinutes / 60);
		const minutes = totalMinutes % 60;

		return (
			<Fragment>
				{" "}
				{hours}:{minutes}:{seconds}{" "}
			</Fragment>
		);
	};

	return (
		<Fragment>
			<ListItem>
				{loading ? (
					<LoaderSkeleton />
				) : (
					<Accordion
						className="listAccordion"
						onChange={onExpand}
						expanded={expanded}
					>
						<AccordionSummary
							expandIcon={
								<Tooltip title="information">
									<Icons.About />
								</Tooltip>
							}
							aria-controls="panel1a-content"
							id="panel1a-header"
						>
							<AvatarComp
								stationNames={
									journey["Departure station name"].split(
										" "
									) +
									" " +
									journey["Return station name"].split(" ")
								}
								stationsString={journeyToFrom}
								className="avatarComp"
							/>
							<ListItemText
								primary={
									<Fragment>
										<strong>{journeyToFrom}</strong> -{" "}
										{journey["Covered distance (m)"] / 1000}{" "}
										km
									</Fragment>
								}
								secondary={
									<Fragment>
										<strong>
											{new Date(
												journey.Departure
											).toLocaleDateString()}{" "}
										</strong>
										-{" "}
										{new Date(
											journey.Departure
										).toLocaleTimeString()}
									</Fragment>
								}
							/>
						</AccordionSummary>
						<AccordionDetails>
							<Maps
								stationData={coords}
								loadingCoords={loadingCoords}
							/>
							<Typography>
								<strong>Covered distance: </strong>
								{journey["Covered distance (m)"] / 1000} km
							</Typography>
							<Typography>
								<strong>Departure from: </strong>
								{journey["Departure station name"]} station
							</Typography>
							<Typography>
								<strong>Returning to: </strong>
								{journey["Return station name"]} station
							</Typography>
							<Typography>
								<strong>Total time taken: </strong>
								{toHoursAndMinutes(
									journey["Duration (sec.)"]
								)}{" "}
							</Typography>
						</AccordionDetails>
					</Accordion>
				)}
			</ListItem>
			<Divider />
		</Fragment>
	);
};

export default JourneyItem;
