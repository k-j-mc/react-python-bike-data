import React, { Fragment, useContext, useEffect, useState } from "react";

import { TransitionGroup } from "react-transition-group";

import { Collapse, Divider, List, Typography } from "@mui/material";

import DataContext from "../../context/data/dataContext";

import PaginationComp from "../PaginationComp";
import JourneyItem from "./JourneyItem";
import Loader from "../Loader";

import Icons from "../Icons";

const JourneyList = ({ activeData }) => {
	const dataContext = useContext(DataContext);

	const { journeys, limit, loading, page, searchQuery, skip } = dataContext;

	const menuValues = [10, 20, 30, 40, 50];

	const [pages, setPages] = useState(0);

	const [expanded, setExpanded] = useState(null);

	const onExpand = (journey) => (_, isExpanded) => {
		dataContext.getCoords({
			station_depart: journey["Departure station id"],
			station_return: journey["Return station id"],
		});

		setExpanded(isExpanded ? journey._id.$oid : null);
	};

	useEffect(() => {
		if (journeys.total) {
			setPages(Math.floor(journeys.total / limit));
		}
	}, [journeys]);

	useEffect(() => {
		if (activeData === 0) {
			dataContext.getJourneys({
				limit: limit,
				skip: skip,
				station_name: searchQuery,
			});
		}
	}, [page, limit, searchQuery, activeData]);

	const handleChangePage = (e, val) => {
		dataContext.setPage(val);
		if (val === 1) {
			dataContext.setSkip(0);
		} else {
			dataContext.setSkip(val * limit);
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
			{!loading && journeys ? (
				<div className="gridCenterItems">
					<List>
						<TransitionGroup>
							{journeys.data.map((journey) => (
								<Collapse in={true} key={journey._id.$oid}>
									<JourneyItem
										expanded={expanded === journey._id.$oid}
										onExpand={onExpand(journey)}
										journey={journey}
										loading={loading}
									/>
								</Collapse>
							))}
						</TransitionGroup>
					</List>

					{journeys.total > 0 ? (
						<PaginationComp
							handleChangeLimit={handleChangeLimit}
							handleChangePage={handleChangePage}
							limit={limit}
							page={page}
							pages={pages}
							menuValues={menuValues}
						/>
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
