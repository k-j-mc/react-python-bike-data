import React, { useState } from "react";
import PropTypes from "prop-types";

import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material/";

import NavMenu from "./NavMenu";

import Icons from "../Icons";

const NavBar = ({ title, title2 }) => {
	const [anchorEl, setAnchorEl] = useState(null);

	const openMenu = Boolean(anchorEl);

	const handleOpenMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Icons.Bike className="appIcon" />
					<Typography variant="h5" color="white">
						<strong className="mainTitle">{title}</strong>
						{title2}
					</Typography>
					<IconButton
						onClick={handleOpenMenu}
						style={{ marginLeft: "auto" }}
					>
						{openMenu === false ? (
							<Icons.Menu className="menuIcon" />
						) : (
							<Icons.Close className="menuIcon" />
						)}
					</IconButton>
					<NavMenu
						openMenu={openMenu}
						anchorEl={anchorEl}
						setAnchorEl={setAnchorEl}
					/>
				</Toolbar>
			</AppBar>
			<div className="appBarShadow" />
		</Box>
	);
};

NavBar.defaultProps = {
	title: "HSL",
	title2: "Biker",
};

NavBar.propTypes = {
	title: PropTypes.string.isRequired,
	title2: PropTypes.string.isRequired,
};

export default NavBar;
