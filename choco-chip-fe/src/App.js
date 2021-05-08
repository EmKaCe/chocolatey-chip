import React from "react";
import { createMuiTheme, CssBaseline, Grid, ThemeProvider } from "@material-ui/core";
import { deepPurple, yellow } from "@material-ui/core/colors";
import PackageSelection from "./PackageSelection";
import Navbar from "./Navbar";
import SummaryDrawer from "./SummaryDrawer";
import Summary from "./Summary";
import Overlay from "./Overlay";
import Office from "./Office";

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

	const [installOffice, setInstallOffice] = React.useState(false);
	const officePackages = ["Access", "Excel", "Groove", "Lync", "OneDrive", "OneNote", "Outlook", "PowerPoint", "Publisher", "Word"];
	const [officeSelection, setOfficeSelection] = React.useState([false, true, false, false, false, false, true, true, false, true]);

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
					<Summary handlePackageClick={toggleChocoPackage} packages={chocoPackages} />
				</SummaryDrawer>
				{step == 1 ? (<PackageSelection handlePackageClick={toggleChocoPackage} selectedPackages={chocoPackages} />) : null}
				{step == 2 ? (
					<Office
						changePackageSelection={setOfficeSelection}
						packageNames={officePackages}
						packageSelection={officeSelection}
						toInstall={installOffice}
						toggleInstall={setInstallOffice}
					/>
				) : null}
			</Grid>
		</ThemeProvider>
	);
};

export default App;
