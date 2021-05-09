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
		margin: "3em",
		padding: theme.spacing(1),
		width: "800px"
	},
	chip: {
		margin: theme.spacing(1),
		padding: theme.spacing(0.5)
	}
}));

const ChipBar = (props) => {
	const classes = useStyles();

	const [selectedChips, setSelectedChips] = React.useState([]);

	const handleChipClick = (name) => {
		const chipIndex = selectedChips.indexOf(name);
		const newSelectedChips = [...selectedChips];
		const chip = props.chipData.find((chip) => chip.name == name);
		if (chipIndex > -1) {
			props.removePackages(chip.packages);
			newSelectedChips.splice(chipIndex, 1);
		} else {
			props.addPackages(chip.packages);
			newSelectedChips.push(name);
		}
		setSelectedChips(newSelectedChips);
	};

	return (
		<Paper component="ul" className={classes.root}>
			{props.chipData.map((data, index) => {
				return (
					<li key={index}>
						<Chip
							className={classes.chip}
							color={selectedChips.indexOf(data.name) > -1 ? "primary" : "default"}
							icon={selectedChips.indexOf(data.name) > -1 ? <Done /> : data.icon}
							label={data.name}
							clickable={true}
							onClick={() => handleChipClick(data.name)}
						/>
					</li>
				);
			})}
		</Paper>
	);
};

ChipBar.propTypes = {
	chipData: PropTypes.array,
	addPackages: PropTypes.func,
	removePackages: PropTypes.func
};

export default ChipBar;