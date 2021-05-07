import React from "react";
import { createMuiTheme, CssBaseline, Grid, ThemeProvider } from "@material-ui/core";
import { deepPurple, yellow } from "@material-ui/core/colors";
import PackageSelection from "./PackageSelection";
import Navbar from "./Navbar";
import SummaryDrawer from "./SummaryDrawer";
import Summary from "./Summary";

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

	const [openDrawer, setOpenDrawer] = React.useState(false);
	const [step, setStep] = React.useState(1);

	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
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
				<PackageSelection handlePackageClick={toggleChocoPackage} selectedPackages={chocoPackages} />
			</Grid>
		</ThemeProvider>
	);
};

export default App;
