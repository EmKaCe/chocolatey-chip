import React from "react";
import { createMuiTheme, CssBaseline, Grid, ThemeProvider } from "@material-ui/core";
import { deepPurple, yellow } from "@material-ui/core/colors";
import PackageSelection from "./PackageSelection";
import Navbar from "./Navbar";
import SummaryDrawer from "./SummaryDrawer";
import Summary from "./Summary";
import Overlay from "./Overlay";
import Office from "./Office";
import Privacy from "./Privacy";
import Generator from "./Generator";
import axios from "axios";
import ChipBar from "./ChipBar";
import chipData from "./ChipData";

const App = () => {
	const darkTheme = createMuiTheme({
		palette: {
			type: "dark",
			primary: {
				main: deepPurple["200"]
			},
			secondary: {
				main: yellow["400"],
				dark: yellow["600"]
			}
		}
	});

	const [chocoPackages, setChocoPackages] = React.useState([]);

	const toggleChocoPackage = (packageName, packageTitle, packageIcon) => {
		const index = chocoPackages.findIndex((chocoPackage) => chocoPackage.packageName == packageName);
		const newChocoPackages = [...chocoPackages];
		if (index < 0) {
			newChocoPackages.push({ packageName: packageName, packageTitle: packageTitle, packageIcon: packageIcon });
		} else {
			newChocoPackages.splice(index, 1);
		}
		setChocoPackages(newChocoPackages);
	};

	const addChocoPackages = (packageNames) => {
		const newChocoPackages = [...chocoPackages];
		packageNames.forEach((element) => {
			const index = chocoPackages.findIndex((chocoPackage) => chocoPackage.packageName == element);
			if (index < 0) {
				axios.get("/single/" + element)
					.then((response) => {
						newChocoPackages.push({
							packageName: response.data.name,
							packageTitle: response.data.title,
							packageIcon: response.data.icon
						});
					});
			}
		});
		setChocoPackages(newChocoPackages);
	};

	const removeChocoPackages = (packageNames) => {
		const newChocoPackages = [...chocoPackages];
		packageNames.forEach((element) => {
			const index = chocoPackages.findIndex((chocoPackage) => chocoPackage.packageName == element);
			if (index > -1) {
				newChocoPackages.splice(index, 1);
			}
		});
		setChocoPackages(newChocoPackages);
	};

	const [installOffice, setInstallOffice] = React.useState(true);
	const officePackages = ["Access", "Excel", "Groove", "Lync", "OneDrive", "OneNote", "Outlook", "PowerPoint", "Publisher", "Word"];
	const [officeSelection, setOfficeSelection] = React.useState([false, true, false, false, false, false, true, true, false, true]);

	const privacySettingNames = ["Apply recommended privacy settings?", "Remove bloatware apps?", "Uninstall OneDrive?"];
	const [privacySettings, setPrivacySettings] = React.useState([true, true, true]);

	const [openDrawer, setOpenDrawer] = React.useState(false);
	const [step, setStep] = React.useState(1);

	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<Overlay currentStep={step} />
			<Grid
				container
				direction="column"
				justify="center"
				alignItems="center"
			>
				<Navbar
					packages={chocoPackages}
					setOpenDrawer={setOpenDrawer}
					step={step}
					setStep={setStep}
				/>
				<SummaryDrawer
					open={openDrawer}
					setOpen={setOpenDrawer}
				>
					<Summary
						handlePackageClick={toggleChocoPackage}
						packages={chocoPackages}
						installOffice={installOffice}
						officePackages={officePackages}
						officeSelection={officeSelection}
						privacySettings={privacySettings}
					/>
				</SummaryDrawer>
				{step == 1 ? (
					<PackageSelection
						handlePackageClick={toggleChocoPackage}
						selectedPackages={chocoPackages}
					>
						<ChipBar
							chipData={chipData}
							addPackages={addChocoPackages}
							removePackages={removeChocoPackages}
						/>
					</PackageSelection>
				) : null}
				{step == 2 ? (
					<Office
						changePackageSelection={setOfficeSelection}
						packageNames={officePackages}
						packageSelection={officeSelection}
						toInstall={installOffice}
						toggleInstall={setInstallOffice}
					/>
				) : null}
				{step == 3 ? (
					<div>
						<Privacy
							changeSettings={setPrivacySettings}
							settings={privacySettings}
							settingNames={privacySettingNames}
						/>
						<Generator
							chocoPackages={chocoPackages}
							officeSettings={installOffice ? officeSelection : []}
							privacySettings={privacySettings}
						/>
					</div>
				) : null}
			</Grid>
		</ThemeProvider>
	);
};

export default App;
