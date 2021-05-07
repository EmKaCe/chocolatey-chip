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
		height: "1.5px",
		backgroundColor: theme.palette.primary.light
	},
	subheader: {
		fontSize: "1.5em",
		textAlign: "center"
	}
}));

const Summary = (props) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<List subheader={<ListSubheader className={classes.subheader} component="div">Packages to install</ListSubheader>}>
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
					<ListItem key="noPackages">
						<ListItemText primary="No packages selected." />
					</ListItem>
				) : null}
			</List>
			<Divider className={classes.listDivider} />
		</div>
	);
};

Summary.propTypes = {
	handlePackageClick: PropTypes.func,
	packages: PropTypes.array
};

export default Summary;