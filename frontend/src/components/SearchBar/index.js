import React, { useContext, useEffect, useState } from "react";

import { Button, Grid, IconButton, TextField } from "@mui/material";

import Icons from "../Icons";

const SearchBar = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [isDisabled, setIsDisabled] = useState(true);

	useEffect(() => {
		if (searchQuery.replace(/\s/g, "").length) {
			setIsDisabled(false);
		} else {
			setIsDisabled(true);
		}
	}, [searchQuery]);

	const handleSearch = () => {};

	const enterSearch = (e) => {
		if (e.keyCode === 13 && searchQuery.replace(/\s/g, "").length) {
			handleSearch();
		}
	};

	const clearSearch = () => {
		setSearchQuery("");
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
