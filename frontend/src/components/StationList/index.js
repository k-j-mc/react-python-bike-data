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

import PaginationComp from "../PaginationComp";
import StationItem from "./StationItem";
import Loader from "../Loader";

import Icons from "../Icons";

const StationList = ({ activeData }) => {
	const dataContext = useContext(DataContext);

	const { stations, limit, loading, page, searchQuery, skip } = dataContext;

	const menuValues = [10, 20, 30, 40, 50];

	const [pages, setPages] = useState(0);

	const [expanded, setExpanded] = useState(null);

	const onExpand = (station) => (_, isExpanded) => {
		dataContext.getCoords({
			station_depart: station["ID"],
			// 	station_return: station["Return station id"],
		});

		setExpanded(isExpanded ? station._id.$oid : null);
	};

	useEffect(() => {
		if (activeData === 1) {
			dataContext.getStations({
				limit: limit,
				skip: skip,
				station_name: searchQuery,
			});
		}
	}, [page, limit, searchQuery, activeData]);

	useEffect(() => {
		if (stations.total) {
			setPages(Math.floor(stations.total / limit));
		}
	}, [stations]);

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

		if (dataContext.page > stations.total / e.target.value) {
			dataContext.setPage(Math.floor(stations.total / e.target.value));
		}

		setPages(Math.floor(stations.total / e.target.value));
	};

	return (
		<Fragment>
			{!loading && stations ? (
				<div className="gridCenterItems">
					<List>
						<TransitionGroup>
							{stations.data.map((station) => (
								<Collapse in={true} key={station._id.$oid}>
									<StationItem
										expanded={expanded === station._id.$oid}
										onExpand={onExpand(station)}
										station={station}
										loading={loading}
									/>
								</Collapse>
							))}
						</TransitionGroup>
					</List>

					{stations.total > 0 ? (
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
				<Loader message="Loading stations..." />
			)}
		</Fragment>
	);
};

export default StationList;
