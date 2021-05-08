import React from "react";
import PropTypes from "prop-types";
import { Grid, makeStyles, Paper, Switch, Typography } from "@material-ui/core";

const useStyles = makeStyles({
	paper: {
		margin: "3em",
		padding: "2em",
		minWidth: "800px"
	}
});

const Privacy = (props) => {
	const classes = useStyles();

	const toggleSetting = (index, state) => {
		const newSettings = [...props.settings];
		newSettings[index] = state;
		props.changeSettings(newSettings);
	};

	return (
		<Paper className={classes.paper}>
			{props.settingNames.map((name, index) => {
				return (
					<Grid
						key={index}
						container
						direction="row"
						alignItems="center"
						justify="center"
					>
						<Grid item sm={10}>
							<Typography variant="h6">{name}</Typography>
						</Grid>
						<Grid item sm={2}>
							<Typography component="div">
								<Grid
									component="label"
									container
									alignItems="center"
									spacing={1}
								>
									<Grid item>No</Grid>
									<Grid item>
										<Switch color="primary" checked={props.settings[index]} onChange={(event) => toggleSetting(index, event.target.checked)} />
									</Grid>
									<Grid item>
										Yes
									</Grid>
								</Grid>
							</Typography>
						</Grid>
					</Grid>
				);
			})}
		</Paper >
	);
};

Privacy.propTypes = {
	changeSettings: PropTypes.func,
	settings: PropTypes.array,
	settingNames: PropTypes.array
};

export default Privacy;