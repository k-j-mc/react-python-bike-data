import React, { Fragment, useContext, useEffect } from "react";

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
import Maps from "../Maps/Single";

import Icons from "../Icons";

const StationItem = ({ expanded, onExpand, station, loading }) => {
	const dataContext = useContext(DataContext);

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
							<ListItemText
								primary={
									<Fragment>
										<strong>{station["Nimi"]}</strong>

										{station["Kaupunki"] !== " " &&
											" - " + station["Kaupunki"]}
									</Fragment>
								}
							/>
						</AccordionSummary>
						<AccordionDetails>
							<Maps
								stationData={[station["y"], station["x"]]}
								loadingCoords={dataContext.loadingCoords}
							/>
							<Typography>
								<strong>Address: </strong>
								{station["Adress"]}
							</Typography>
							<Typography>
								<strong>Operator: </strong>
								{station["Operaattor"] !== " "
									? station["Operaattor"]
									: "Unknown"}
							</Typography>
							<Typography>
								<strong>Capacity: </strong>
								{station["Kapasiteet"]}
							</Typography>
						</AccordionDetails>
					</Accordion>
				)}
			</ListItem>
			<Divider />
		</Fragment>
	);
};

export default StationItem;
