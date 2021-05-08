import React from "react";
import PropTypes from "prop-types";
import { Grid, makeStyles, Paper, Switch, Typography } from "@material-ui/core";

const useStyles = makeStyles({
	paper: {
		margin: "3em",
		padding: "2em",
		width: "800px"
	},
	packageSelector: {
		marginLeft: "20%",
		marginRight: "20%"
	},
	selectorHeading: {
		marginBottom: "3em"
	}
});

const Office = (props) => {
	const classes = useStyles();

	const togglePackage = (index, state) => {
		const newPackages = [...props.packageSelection];
		newPackages[index] = state;
		props.changePackageSelection(newPackages);
	};

	return (
		<div>
			<Paper className={classes.paper}>
				<Grid
					container
					direction="row"
					alignItems="center"
					justify="space-between"
				>
					<Typography variant="h4">Do you want to install Office?</Typography>
					<Typography component="div">
						<Grid
							component="label"
							container
							alignItems="center"
							spacing={1}
						>
							<Grid item>No</Grid>
							<Grid item>
								<Switch color="primary" checked={props.toInstall} onChange={(event) => props.toggleInstall(event.target.checked)} />
							</Grid>
							<Grid item>
								Yes
							</Grid>
						</Grid>
					</Typography>
				</Grid>
			</Paper>
			<Paper className={classes.paper}>
				<Grid
					container
					direction="row"
					alignItems="center"
					justify="center"
				>
					<Grid item xs={12} className={classes.selectorHeading}>
						<Typography align="center" variant="h4">Customize your office suite</Typography>
					</Grid>
					{props.packageNames.map((name, index) => {
						return (
							<Grid key={index} item sm={6}>
								<Typography component="div" className={classes.packageSelector}>
									<Grid
										container
										direction="row"
										alignItems="center"
										justify="space-between"
									>
										<Typography variant="h6">{name}</Typography>
										<Switch
											color="secondary"
											disabled={!props.toInstall}
											checked={props.packageSelection[index]}
											onChange={(event) => togglePackage(index, event.target.checked)}
										/>
									</Grid>
								</Typography>
							</Grid>
						);
					})}
				</Grid>
			</Paper>
		</div>
	);
};

Office.propTypes = {
	changePackageSelection: PropTypes.func,
	packageNames: PropTypes.array,
	packageSelection: PropTypes.array,
	toInstall: PropTypes.bool,
	toggleInstall: PropTypes.func
};

export default Office;