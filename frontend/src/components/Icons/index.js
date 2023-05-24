import React, { forwardRef } from "react";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CloseIcon from "@mui/icons-material/Close";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import DoneIcon from "@mui/icons-material/Done";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import LightModeIcon from "@mui/icons-material/LightMode";
import LinkIcon from "@mui/icons-material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import Search from "@mui/icons-material/Search";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import VisibilityIcon from "@mui/icons-material/Visibility";
import WrongLocationIcon from "@mui/icons-material/WrongLocation";

const Icons = {
	Back: forwardRef((props, ref) => (
		<ArrowBackIosNewIcon {...props} ref={ref} />
	)),
	Bike: forwardRef((props, ref) => (
		<DirectionsBikeIcon {...props} ref={ref} />
	)),
	Close: forwardRef((props, ref) => <CloseIcon {...props} ref={ref} />),
	DarkMode: forwardRef((props, ref) => <DarkModeIcon {...props} ref={ref} />),
	False: forwardRef((props, ref) => (
		<CloseIcon {...props} ref={ref} style={{ color: "#ef5350" }} />
	)),
	Home: forwardRef((props, ref) => <HomeIcon {...props} ref={ref} />),
	About: forwardRef((props, ref) => <InfoIcon {...props} ref={ref} />),
	LightMode: forwardRef((props, ref) => <LightModeIcon {...props} />),
	Link: forwardRef((props, ref) => <LinkIcon {...props} />),
	Menu: forwardRef((props, ref) => <MenuIcon {...props} ref={ref} />),
	Search: forwardRef((props, ref) => (
		<Search {...props} ref={ref} style={{ color: "#FFFFFF" }} />
	)),
	Sad: forwardRef((props, ref) => (
		<SentimentDissatisfiedIcon {...props} ref={ref} />
	)),
	True: forwardRef((props, ref) => (
		<DoneIcon {...props} ref={ref} style={{ color: "#4caf50" }} />
	)),
	View: forwardRef((props, ref) => <VisibilityIcon {...props} ref={ref} />),
	WrongLocation: forwardRef((props, ref) => (
		<WrongLocationIcon {...props} ref={ref} />
	)),
};

export default Icons;
