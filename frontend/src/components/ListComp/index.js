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

import JourneyGraph from "./JourneyGraph";
import ListItemComp from "./ListItemComp";

const ListComp = () => {
	const dataContext = useContext(DataContext);

	const { journeys, journeyData, loading, stations, stationData } =
		dataContext;

	const [limit, setLimit] = useState(10);
	const [skip, setSkip] = useState(0);

	const menuValues = [10, 20, 30, 40, 50];

	const [pages, setPages] = useState(
		Math.floor(journeyData.total_journeys / limit)
	);

	const [page, setPage] = useState(1);

	const [dataItems, setDataItems] = useState(journeys);

	useEffect(() => {
		setDataItems(journeys);
	}, [journeys]);

	useEffect(() => {
		dataContext.getJourneys({ limit: limit, skip: skip });

		// eslint-disable-next-line
	}, [page, limit]);

	const handleChangePage = (e, val) => {
		setPage(val);
		setSkip(val * limit);
	};

	const handleChangeLimit = (e) => {
		setLimit(e.target.value);
		setPages(Math.floor(journeyData.total_journeys / e.target.value));
	};

	return (
		<div className="gridCenterItems">
			<Typography paragraph>
				<strong>Journey initial list</strong>
			</Typography>
			<JourneyGraph journeys={journeys} />
			<List>
				<TransitionGroup>
					{dataItems.map((journey) => (
						<Collapse in={true} key={journey._id.$oid}>
							<ListItemComp journey={journey} loading={loading} />
						</Collapse>
					))}
				</TransitionGroup>
			</List>

			{journeyData.total_journeys > 5 && (
				<Fragment>
					<div className="pagination">
						<Pagination
							showFirstButton
							showLastButton
							count={pages}
							page={page}
							onChange={handleChangePage}
						/>
					</div>
					<Typography variant="subtitle2">
						Results per page:
					</Typography>
					<Select
						value={limit}
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
			)}
			<Divider />
		</div>
	);
};

export default ListComp;
