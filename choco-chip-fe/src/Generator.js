import React from "react";
import PropTypes from "prop-types";
import { Button, Grid } from "@material-ui/core";
import { Save } from "@material-ui/icons";
import axios from "axios";

const Generator = (props) => {
	const downloadConfig = () => {
		const software = [];
		props.chocoPackages.forEach((element) => {
			software.push(element.packageName);
		});

		axios.post("/generate", {
			data: {
				chocolatey: software,
				office: props.officeSettings,
				privacy: props.privacySettings
			}
		}).then((response) => {
			const blob = new Blob([response.data], { type: "text/plain" });
			const blobUrl = URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = blobUrl;
			link.download = "choco-chip.ps1";
			document.body.appendChild(link);
			link.dispatchEvent(
				new MouseEvent("click", { 
					bubbles: true, 
					cancelable: true, 
					view: window 
				})
			);
			document.body.removeChild(link);
		});
	};

	return (
		<Grid
			container
			direction="column"
			alignItems="center"
			justify="center"
		>
			<Button
				id="downloadButton"
				component="a"
				color="secondary"
				variant="contained"
				size="large"
				endIcon={<Save />}
				onClick={downloadConfig}
			>
				Save Config
			</Button>
		</Grid>
	);
};

Generator.propTypes = {
	chocoPackages: PropTypes.array,
	officeSettings: PropTypes.array,
	privacySettings: PropTypes.array
};

export default Generator;
