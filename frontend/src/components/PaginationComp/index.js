import React, { Fragment } from "react";

import { MenuItem, Pagination, Select, Typography } from "@mui/material";

const PaginationComp = ({
	handleChangeLimit,
	handleChangePage,
	limit,
	page,
	pages,
	menuValues,
}) => {
	return (
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
			<Typography variant="subtitle2">Results per page:</Typography>
			<Select
				value={limit}
				onChange={(e) => handleChangeLimit(e)}
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
	);
};

export default PaginationComp;
