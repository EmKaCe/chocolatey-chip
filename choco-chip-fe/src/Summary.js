import React from "react";
import PropTypes from "prop-types";
import { Avatar, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, ListSubheader, makeStyles } from "@material-ui/core";
import { Delete } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
	root: {
		minWidth: "400px"
	},
	avatarRoot: {
		backgroundColor: theme.palette.background.default,
		marginRight: "15px",
		padding: "4px"
	},
	avatarImg: {
		objectFit: "fill"
	},
	avatarLarge: {
		height: theme.spacing(6),
		width: theme.spacing(6)
	},
	listDivider: {
		backgroundColor: theme.palette.primary.light
	},
	subheader: {
		color: theme.palette.text.primary,
		fontSize: "1.5em",
		position: "inherit",
		textAlign: "center"
	}
}));

const Summary = (props) => {
	const classes = useStyles();

	const [privacySettingsCount, setPrivacySettingsCount] = React.useState(0);
	let counted = 0;

	React.useEffect(() => {
		let newCount = 0;
		props.privacySettings.forEach((element) => {
			if (element) {
				newCount++;
			}
		});
		setPrivacySettingsCount(newCount);
	}, [props.privacySettings]);

	return (
		<div className={classes.root}>
			<List subheader={<ListSubheader className={classes.subheader} component="div">Packages to install:</ListSubheader>}>
				{props.packages.map((element, index) => {
					return (
						<ListItem key={element.packageName} divider={index !== props.packages.length - 1}>
							<ListItemAvatar>
								<Avatar
									classes={{
										root: classes.avatarRoot,
										img: classes.avatarImg
									}}
									className={classes.avatarLarge}
									src={element.packageIcon}
								/>
							</ListItemAvatar>
							<ListItemText primary={element.packageTitle} />
							<ListItemSecondaryAction>
								<IconButton
									edge="end"
									aria-label={"remove " + element.packageName}
									onClick={() => props.handlePackageClick(element.packageName, element.packageTitle, element.packageIcon)}
								>
									<Delete />
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
					);
				})}
				{props.packages.length == 0 ? (
					<ListItem key="noPackages" divider={false}>
						<ListItemText primary="No packages selected." />
					</ListItem>
				) : null}
			</List>
			<Divider className={classes.listDivider} />
			<List subheader={<ListSubheader className={classes.subheader} component="div">Office configuration:</ListSubheader>}>
				{props.installOffice ?
					props.officePackages.map((element, index) => {
						return (
							props.officeSelection[index] ? (
								<ListItem key={element} divider={index !== props.officePackages.length - 1}>
									<ListItemText primary={element} />
								</ListItem>
							) : null
						);
					})
					: (
						<ListItem key="noOffice">
							<ListItemText primary="Don't install office." />
						</ListItem>
					)
				}
			</List>
			<Divider className={classes.listDivider} />
			<List subheader={<ListSubheader className={classes.subheader} component="div">Privacy Settings:</ListSubheader>}>
				{props.privacySettings.map((element, index) => {
					if (element) {
						counted++;
						if (index == 0) {
							return (
								<ListItem divider={counted < privacySettingsCount}>
									<ListItemText primary={"Recommended privacy settings"} />
								</ListItem>
							);
						}
						if (index == 1) {
							return (
								<ListItem divider={counted < privacySettingsCount}>
									<ListItemText primary={"Remove bloatware"} />
								</ListItem>
							);
						}
						if (index == 2) {
							return (
								<ListItem divider={counted < privacySettingsCount}>
									<ListItemText primary={"Uninstall OneDrive"} />
								</ListItem>
							);
						}
					}
				})}
				{privacySettingsCount == 0 ? (
					<ListItem key="noPrivacy">
						<ListItemText primary="Don't apply any privacy settings." />
					</ListItem>
				) : null}
			</List>
		</div >
	);
};

Summary.propTypes = {
	handlePackageClick: PropTypes.func,
	packages: PropTypes.array,
	installOffice: PropTypes.bool,
	officePackages: PropTypes.array,
	officeSelection: PropTypes.array,
	privacySettings: PropTypes.array
};

export default Summary;