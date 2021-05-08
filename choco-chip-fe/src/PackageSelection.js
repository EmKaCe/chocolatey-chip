import React from "react";
import PropTypes from "prop-types";
import { Divider, FormControl, InputAdornment, InputLabel, List, makeStyles, OutlinedInput, Paper, Typography } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import axios from "axios";
import PackageEntry from "./PackageEntry";

const useStyles = makeStyles({
	searchRoot: {
		margin: "3em",
		padding: "2em",
		width: "800px"
	},
	searchResultBox: {
		margin: "3em",
		padding: "2em",
		width: "800px"
	}
});

const PackageSelection = (props) => {
	const classes = useStyles();

	const [searchValue, setSearchValue] = React.useState("");
	const [searchResults, setSearchResults] = React.useState([]);

	const handleSearchChange = (event) => {
		setSearchValue(event.target.value);
	};

	const handleSearchSubmit = (event) => {
		if (event.code == "Enter") {
			axios.get("/search/" + searchValue)
				.then((response) => {
					setSearchResults(response.data.feed.entry);
				});
		}
	};

	return (
		<div>
			<Paper className={classes.searchRoot}>
				<FormControl fullWidth variant="outlined">
					<InputLabel>Search Package(s)</InputLabel>
					<OutlinedInput
						autoFocus
						type="text"
						value={searchValue}
						onChange={handleSearchChange}
						onKeyPress={handleSearchSubmit}
						startAdornment={
							<InputAdornment position="start">
								<Search />
							</InputAdornment>
						}
						labelWidth={140}
					/>
				</FormControl>
			</Paper>
			<Paper className={classes.searchResultBox}>
				{
					searchResults.length > 0 ?
						(
							<List>
								{searchResults.map((result, index) => {
									return (
										<div key={result["title"]["_text"]}>
											<PackageEntry
												handlePackageClick={props.handlePackageClick}
												selectedPackages={props.selectedPackages}
												package={result}
											/>
											{index == searchResults.length - 1 ? null : <Divider />}
										</div>
									);
								})}
							</List>
						) : (
							<Typography align="center" variant="h4">No results found.</Typography>
						)
				}
			</Paper>
		</div >
	);
};

PackageSelection.propTypes = {
	handlePackageClick: PropTypes.func,
	selectedPackages: PropTypes.array
};

export default PackageSelection;