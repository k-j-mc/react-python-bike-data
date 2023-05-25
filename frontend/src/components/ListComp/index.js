import React, { Fragment, useContext, useEffect, useState } from "react";

import { Divider, List, ListItem, Pagination, Typography } from "@mui/material";

import DataContext from "../../context/data/dataContext";

import Icons from "../Icons";

const ListComp = (props) => {
	const dataContext = useContext(DataContext);

	const { journeys, journeyData, stations, stationData } = dataContext;

	const [limit, setLimit] = useState(5);
	const [skip, setSkip] = useState(0);

	const pages = Math.ceil(journeyData.total_journeys / 5);

	const [page, setPage] = useState(1);

	const [dataItems, setDataItems] = useState(journeys);

	useEffect(() => {
		setDataItems(journeys);
	}, [journeys]);

	useEffect(() => {
		dataContext.getJourneys({ limit: limit, skip: skip });

		// eslint-disable-next-line
	}, [page]);

	const handleChange = (e, val) => {
		setPage(val);
		setSkip(val * limit);
	};

	return (
		<div className="gridCnterItems">
			<Typography paragraph>
				<strong>Journey initial list</strong>
			</Typography>
			<List>
				{dataItems.map((journey) => (
					<Fragment key={journey._id.$oid}>
						<ListItem>
							<Typography paragraph>
								<strong>
									{journey["Departure station name"]} -{" "}
									{journey["Return station name"]}
								</strong>
							</Typography>
						</ListItem>
						<Divider />
					</Fragment>
				))}
			</List>

			{journeyData.total_journeys > 5 && (
				<div className="pagination">
					<Pagination
						showFirstButton
						showLastButton
						count={pages}
						page={page}
						onChange={handleChange}
					/>
				</div>
			)}
		</div>
	);
};

export default ListComp;
