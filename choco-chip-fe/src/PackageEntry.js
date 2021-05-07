import React from "react";
import PropTypes from "prop-types";
import { Avatar, Grow, ListItem, ListItemAvatar, ListItemText, makeStyles, Typography } from "@material-ui/core";
import { Done } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
	listItemRoot: {
		cursor: "pointer"
	},
	avatarRoot: {
		backgroundColor: theme.palette.background.default,
		marginRight: "15px",
		padding: "4px"
	},
	avatarRootSelected: {
		backgroundColor: theme.palette.primary.main,
		marginRight: "15px",
		padding: "4px"
	},
	avatarCheckedIcon: {
		color: theme.palette.secondary.dark
	},
	avatarImg: {
		objectFit: "fill"
	},
	avatarLarge: {
		height: theme.spacing(6),
		width: theme.spacing(6)
	}
}));

const PackageEntry = (props) => {
	const classes = useStyles();

	const [grow, setGrow] = React.useState(true);
	const [showImg, setShowImg] = React.useState(props.selectedPackages.findIndex((chocoPackage) => chocoPackage.packageName == props.package["title"]["_text"]) < 0);

	const changeAvatar = (state) => {
		setGrow(false);
		setTimeout(() => {
			setShowImg(state);
			setGrow(true);
		}, 300);
	};

	const handleListItemClick = () => {
		props.handlePackageClick(props.package["title"]["_text"], props.package["m:properties"]["d:Title"]["_text"], props.package["m:properties"]["d:IconUrl"]["_text"]);
		changeAvatar(!showImg);
	};

	React.useEffect(() => {
		if ((props.selectedPackages.findIndex((chocoPackage) => chocoPackage.packageName == props.package["title"]["_text"]) < 0) !== showImg) {
			changeAvatar(!showImg);
		}
	}, [props.selectedPackages]);

	return (
		<ListItem className={classes.listItemRoot} alignItems="flex-start" onClick={() => handleListItemClick()}>
			<ListItemAvatar>
				<Grow in={grow} timeout={300}>
					{showImg ? (
						<Avatar
							classes={{
								root: classes.avatarRoot,
								img: classes.avatarImg
							}}
							className={classes.avatarLarge}
							src={props.package["m:properties"]["d:IconUrl"]["_text"]}
						/>
					) : (
						<Avatar
							classes={{
								root: classes.avatarRootSelected
							}}
							className={classes.avatarLarge}
						>
							<Done className={classes.avatarCheckedIcon} />
						</Avatar>
					)}
				</Grow>
			</ListItemAvatar >
			<ListItemText
				primary={props.package["m:properties"]["d:Title"]["_text"]}
				secondary={
					<React.Fragment>
						<Typography
							component="span"
							variant="body2"
							color="textSecondary"
						>
							{props.package["author"]["_text"]}
						</Typography>
						<Typography
							component="span"
							variant="body1"
							color="textPrimary"
						>
							{props.package["summary"]["_text"]}
						</Typography>
						<br />
						<Typography
							component="span"
							variant="subtitle2"
							color="textSecondary"
						>
							{props.package["m:properties"]["d:Version"]["_text"]}
						</Typography>
					</React.Fragment>
				}
			/>
		</ListItem >
	);
};

PackageEntry.propTypes = {
	handlePackageClick: PropTypes.func,
	package: PropTypes.object,
	selectedPackages: PropTypes.array
};

export default PackageEntry;