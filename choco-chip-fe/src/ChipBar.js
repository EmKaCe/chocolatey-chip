import React from "react";
import PropTypes from "prop-types";
import { Chip, makeStyles, Paper } from "@material-ui/core";
import { Done } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		justifyContent: "center",
		flexWrap: "wrap",
		listStyle: "none",
		padding: theme.spacing(0.5),
		margin: 0
	},
	chip: {
		margin: theme.spacing(0.5)
	}
}));

const ChipBar = (props) => {
	const classes = useStyles();
	return (
		<Paper component="ul" className={classes.root}>
			{props.chipData.map((data) => {
				return (
					<li key={data.key}>
						<Chip
							className={classes.chip}
							icon={props.selectedChips.findIndex(x => x.key === data.key) ? <Done /> : data.icon}
							label={data.label}
							clickable={true}
							onClick={props.handleChipClick}
						/>
					</li>
				);
			})}
		</Paper>
	);
};

ChipBar.propTypes = {
	chipData: {
		key: PropTypes.number,
		icon: PropTypes.element
	},
	handleChipClick: PropTypes.func,
	selectedChips: PropTypes.array
};

export default ChipBar;