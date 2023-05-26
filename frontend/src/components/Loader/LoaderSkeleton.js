import React from "react";

import { Fade, Skeleton } from "@mui/material";

const LoaderSkeleton = () => {
	return (
		<Fade in={true} timeout={{ enter: 800 }}>
			<Skeleton animation="wave" className="loadingSkeleton" />
		</Fade>
	);
};

export default LoaderSkeleton;
