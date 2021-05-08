import React from "react";
import PropTypes from "prop-types";
import { AppBar, Badge, Button, IconButton, makeStyles, Toolbar, Typography } from "@material-ui/core";
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
				<Button
					color="secondary"
					startIcon={<NavigateBefore />}
					disabled={props.step == 1}
					onClick={() => props.setStep(props.step - 1)}
				>
					Previous
				</Button>
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
				<Button
					color="secondary"
					endIcon={<NavigateNext />}
					disabled={props.step == 3}
					onClick={() => props.setStep(props.step + 1)}
				>
					Next
				</Button>
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