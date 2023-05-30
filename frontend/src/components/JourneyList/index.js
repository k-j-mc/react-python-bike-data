import React, { Fragment, useContext, useEffect, useState } from "react";

import { TransitionGroup } from "react-transition-group";

import {
	Collapse,
	Divider,
	List,
	MenuItem,
	Pagination,
	Select,
	Typography,
} from "@mui/material";

import DataContext from "../../context/data/dataContext";

import Icons from "../Icons";

import Loader from "../Loader";

import JourneyGraph from "./JourneyGraph";
import ListItemComp from "./ListItemComp";

const JourneyList = ({ activeData }) => {
	const dataContext = useContext(DataContext);

	const { journeys, journeyData, loading, stations, stationData } =
		dataContext;

	const menuValues = [10, 20, 30, 40, 50];

	const [pages, setPages] = useState(0);

	const [expanded, setExpanded] = React.useState(null);

	const onExpand = (journey) => (_, isExpanded) => {
		dataContext.getCoords({
			station_depart: journey["Departure station id"],
			station_return: journey["Return station id"],
		});

		setExpanded(isExpanded ? journey._id.$oid : null);
	};

	useEffect(() => {
		if (journeys.total) {
			setPages(Math.floor(journeys.total / dataContext.limit));
		}
	}, [journeys]);

	useEffect(() => {
		if (activeData === 0) {
			dataContext.getJourneys({
				limit: dataContext.limit,
				skip: dataContext.skip,
				station_name: dataContext.searchQuery,
			});
		} else {
			dataContext.getStations({
				limit: dataContext.limit,
				skip: dataContext.skip,
				station_name: dataContext.searchQuery,
			});
		}
	}, [
		dataContext.page,
		dataContext.limit,
		dataContext.searchQuery,
		activeData,
	]);

	const handleChangePage = (e, val) => {
		dataContext.setPage(val);
		if (val === 1) {
			dataContext.setSkip(0);
		} else {
			dataContext.setSkip(val * dataContext.limit);
		}
	};

	const handleChangeLimit = (e) => {
		dataContext.setLimit(e.target.value);

		if (dataContext.page > journeys.total / e.target.value) {
			dataContext.setPage(Math.floor(journeys.total / e.target.value));
		}

		setPages(Math.floor(journeys.total / e.target.value));
	};

	return (
		<Fragment>
			{!loading ? (
				<div className="gridCenterItems">
					<JourneyGraph journeys={journeys} />
					<List>
						<TransitionGroup>
							{journeys.data.map((journey) => (
								<Collapse in={true} key={journey._id.$oid}>
									<ListItemComp
										expanded={expanded === journey._id.$oid}
										onExpand={onExpand(journey)}
										journey={journey}
										loading={loading}
									/>
								</Collapse>
							))}
						</TransitionGroup>
					</List>

					{pages && journeys.total > 5 ? (
						<Fragment>
							<div className="pagination">
								<Pagination
									showFirstButton
									showLastButton
									count={pages}
									page={dataContext.page}
									onChange={handleChangePage}
								/>
							</div>
							<Typography variant="subtitle2">
								Results per page:
							</Typography>
							<Select
								value={dataContext.limit}
								onChange={handleChangeLimit}
								disableUnderline
								variant="standard"
								className="paginationSelect"
							>
								{menuValues.map((value) => (
									<MenuItem key={value} value={value}>
										{value}
									</MenuItem>
								))}
							</Select>
						</Fragment>
					) : (
						<div>
							<Icons.Sad />
							<Typography paragraph>
								No results found...
							</Typography>
						</div>
					)}
					<Divider />
				</div>
			) : (
				<Loader message="Loading journeys..." />
			)}
		</Fragment>
	);
};

export default JourneyList;
