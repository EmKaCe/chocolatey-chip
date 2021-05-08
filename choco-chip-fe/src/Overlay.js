import React from "react";
import PropTypes from "prop-types";
import { Grid, makeStyles, Typography, useTheme } from "@material-ui/core";
import { Description, Storage, VisibilityOff } from "@material-ui/icons";

const useStyles = makeStyles({
	root: {
		position: "absolute",
		height: "100%",
		width: "100%",
		transition: [["opacity", "500ms"], ["zIndex", "500ms"]]
	},
	"@keyframes text-grow": {
		from: {
			clipPath: "polygon(50% 100%,50% 0,50% 0,50% 100%)"
		},
		to: {
			clipPath: "polygon(0 100%, 0 0, 100% 0, 100% 100%)"
		}
	},
	"@keyframes icon-pop-up-top": {
		from: {
			transform: "translateY(0)",
			transformOrigin: "50% 50%",
		},
		to: {

			transform: "translateY(-30px)",
			transformOrigin: "50% 50%",
		}
	},
	textGrow: {
		animation: "$text-grow 0.5s ease-in both"
	},
	icon: {
		fontSize: "200px",
		marginBottom: "40px",
		animation: "$icon-pop-up-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.3s both"
	},
});

const Overlay = (props) => {
	const classes = useStyles();
	const theme = useTheme();

	const [open, setOpen] = React.useState(true);

	const currentBackgroundStyle = () => {
		let toReturn = {};
		if (open) {
			toReturn["opacity"] = 1;
			toReturn["zIndex"] = 9999;
		} else {
			toReturn["opacity"] = 0;
			toReturn["zIndex"] = -9999;
		}
		if (props.currentStep % 2 == 1) {
			toReturn["backgroundColor"] = theme.palette.primary.main;
			toReturn["color"] = theme.palette.text.primary;
		} else {
			toReturn["backgroundColor"] = theme.palette.secondary.main;
			toReturn["color"] = theme.palette.secondary.contrastText;
		}
		return toReturn;
	};

	const toggleAnimation = () => {
		setOpen(true);
		setTimeout(() => {
			setOpen(false);
		}, 1500);
	};

	React.useEffect(() => {
		setTimeout(() => {
			setOpen(false);
		}, 1500);
	}, []);

	React.useEffect(() => {
		toggleAnimation();
	}, [props.currentStep]);

	return (
		<Grid
			className={classes.root}
			container
			direction="column"
			justify="center"
			alignItems="center"
			style={currentBackgroundStyle()}
		>
			{props.currentStep == 1 ? (
				<Grid
					container
					direction="column"
					alignItems="center"
				>
					<Storage className={classes.icon} />
					<Typography className={classes.textGrow} variant="h3">Step 1: Software Selection</Typography>
				</Grid>
			) : null}
			{props.currentStep == 2 ? (
				<Grid
					container
					direction="column"
					alignItems="center"
				>
					<Description className={classes.icon} />
					<Typography className={classes.textGrow} variant="h3">Step 2: Office</Typography>
				</Grid>
			) : null}
			{props.currentStep == 3 ? (
				<Grid
					container
					direction="column"
					alignItems="center"
				>
					<VisibilityOff className={classes.icon} />
					<Typography className={classes.textGrow} variant="h3">Step 3: Privacy</Typography>
				</Grid>
			) : null}
		</Grid>
	);

};

Overlay.propTypes = {
	currentStep: PropTypes.number
};

export default Overlay;