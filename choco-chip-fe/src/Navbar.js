import React from "react";
import PropTypes from "prop-types";
import { AppBar, Badge, IconButton, makeStyles, Toolbar, Typography } from "@material-ui/core";
import { List, NavigateBefore, NavigateNext } from "@material-ui/icons";

const useStyles = makeStyles({
	title: {
		flexGrow: 1,
		marginLeft: "15px"
	},
	listButton: {
		marginRight: "15px"
	}
});

const Navbar = (props) => {
	const classes = useStyles();

	return (
		<AppBar position="sticky">
			<Toolbar>
				<IconButton edge="start" color="secondary" disabled={props.step == 1} onClick={() => props.setStep(props.step - 1)}>
					<NavigateBefore />
				</IconButton>
				<Typography variant="h6" className={classes.title}>
					{props.step == 1 ? "Step 1/3: Software Selection" : null}
					{props.step == 2 ? "Step 2/3: Office" : null}
					{props.step == 3 ? "Step 3/3: Privacy" : null}
				</Typography>
				<IconButton color="inherit" className={classes.listButton} onClick={() => props.setOpenDrawer(true)}>
					<Badge badgeContent={props.packages.length} color="secondary">
						<List />
					</Badge>
				</IconButton>
				<IconButton edge="end" color="secondary" disabled={props.step == 3} onClick={() => props.setStep(props.step + 1)}>
					<NavigateNext />
				</IconButton>
			</Toolbar>
		</AppBar>
	);
};

Navbar.propTypes = {
	packages: PropTypes.array,
	setOpenDrawer: PropTypes.func,
	step: PropTypes.number,
	setStep: PropTypes.func
};

export default Navbar;