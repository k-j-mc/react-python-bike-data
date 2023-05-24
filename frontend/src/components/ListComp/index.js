import React, { Fragment, useContext, useEffect, useState } from "react";

import { Divider, List, ListItem, Pagination, Typography } from "@mui/material";

import DataContext from "../../context/data/dataContext";

import Icons from "../Icons";

const ListComp = (props) => {
	const dataContext = useContext(DataContext);

	const { journeys, journeyData, stations, stationData } = dataContext;

	const pages = Math.ceil(journeyData.total_journeys / 5);

	const [page, setPage] = useState(1);

	const [dataItems, setDataItems] = useState(journeys.slice(0, 5));

	useEffect(() => {
		setDataItems(journeys.slice((page - 1) * 5, page * 5));

		// eslint-disable-next-line
	}, [page]);

	const handleChange = (e, val) => {
		setPage(val);
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
