import React from "react";
import PropTypes from "prop-types";
import { Drawer } from "@material-ui/core";

const SummaryDrawer = (props) => {

	return (
		<React.Fragment key="right">
			<Drawer anchor="right" open={props.open} onClose={() => props.setOpen(false)}>
				{props.children}
			</Drawer>
		</React.Fragment>
	);
};

SummaryDrawer.propTypes = {
	children: PropTypes.node,
	open: PropTypes.bool,
	setOpen: PropTypes.func
};

export default SummaryDrawer;