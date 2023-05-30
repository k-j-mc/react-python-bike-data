import React, { useContext, useEffect, useState } from "react";

import { Button, Grid, IconButton, TextField } from "@mui/material";

import Icons from "../Icons";
import DataContext from "../../context/data/dataContext";

const SearchBar = () => {
	const dataContext = useContext(DataContext);

	const [searchQuery, setSearchQuery] = useState(dataContext.searchQuery);
	const [isDisabled, setIsDisabled] = useState(true);

	useEffect(() => {
		if (searchQuery.replace(/\s/g, "").length) {
			setIsDisabled(false);
		} else {
			setIsDisabled(true);
		}
	}, [searchQuery]);

	const handleSearch = () => {
		dataContext.setSearchQuery(searchQuery);
		dataContext.setSkip(0);
		dataContext.setPage(1);
	};

	const enterSearch = (e) => {
		if (e.keyCode === 13 && searchQuery.replace(/\s/g, "").length) {
			handleSearch();
		}
	};

	const clearSearch = () => {
		setSearchQuery("");
		dataContext.setSearchQuery("");
		dataContext.setSkip(0);
		dataContext.setPage(1);
	};

	return (
		<Grid container spacing={2} className="searchGrid">
			<Grid item xs={1} />
			<Grid item xs={8} sm={9}>
				<TextField
					placeholder="Search..."
					value={searchQuery}
					className="inputRounded"
					fullWidth
					autoComplete="off"
					onChange={(e) => setSearchQuery(e.target.value)}
					onKeyDown={enterSearch}
					InputProps={{
						endAdornment: (
							<>
								{searchQuery && (
									<IconButton onClick={clearSearch}>
										<Icons.Close />
									</IconButton>
								)}
							</>
						),
					}}
				/>
			</Grid>
			<Grid item xs={2} sm={1}>
				<Button
					disabled={isDisabled}
					variant="contained"
					color="primary"
					onClick={handleSearch}
					className="searchButton"
				>
					<Icons.Search />
				</Button>
			</Grid>
			<Grid item xs={1} />
		</Grid>
	);
};

export default SearchBar;
