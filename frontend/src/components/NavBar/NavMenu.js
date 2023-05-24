import React, { useContext, useState } from "react";

import ThemeContext from "../../context/theme/themeContext";

import { Link } from "react-router-dom";

import { Divider, Menu, MenuItem } from "@mui/material";

import Icons from "../Icons";

const NavMenu = (props) => {
	const themeContext = useContext(ThemeContext);

	const { anchorEl, setAnchorEl, openMenu } = props;

	const [theme, setTheme] = useState("Dark");

	const handleCloseMenu = () => {
		setAnchorEl(null);
	};

	const handleTheme = () => {
		setTheme((prevMode) => (prevMode === "Dark" ? "Light" : "Dark"));
		themeContext.getTheme(theme);
		handleCloseMenu();
	};

	return (
		<Menu
			anchorEl={anchorEl}
			open={openMenu}
			onClose={handleCloseMenu}
			className="menu"
		>
			<Link to={"/"} className="linkTo">
				<MenuItem onClick={handleCloseMenu} className="menuItem">
					<Icons.Home className="menuItemIcon" />
					Home
				</MenuItem>
			</Link>
			<Divider />

			<Link to={"/about"} className="linkTo">
				<MenuItem onClick={handleCloseMenu} className="menuItem">
					<Icons.About className="menuItemIcon" />
					About
				</MenuItem>
			</Link>
			<Divider />

			<MenuItem onClick={handleTheme} className="menuItem">
				{theme === "Dark" ? (
					<Icons.DarkMode className="menuItemIcon" />
				) : (
					<Icons.LightMode className="menuItemIcon" />
				)}
				{theme} theme
			</MenuItem>
		</Menu>
	);
};

export default NavMenu;
