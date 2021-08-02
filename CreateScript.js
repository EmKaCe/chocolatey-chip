const generateAll = (software, office, privacy) => {
	const commands = ["#Requires -RunAsAdministrator", "Set-ExecutionPolicy Bypass -Scope Process -Force"];

	if (software.length > 0) {
		commands.push(`# Chocolatey Install`);
		commands.push(`echo "Installing Chocolatey..."`);
		commands.push(`if (!(Test-Path -Path "$env:ProgramData\\Chocolatey")) {`);
		commands.push(`Invoke-Expression((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))`);
		commands.push(`}`);
		commands.push(`echo "Installing software..."`);
		software.forEach((element) => {
			commands.push(`choco install ${element} -y`);
		});
	}

	if (office.length == 10) {
		let configuration = "";
		office.forEach((element) => {
			if (element) {
				configuration += 1;
			} else {
				configuration += 0;
			}
		});
		commands.push(`# Office Install`);
		commands.push(`$officeExe = $PSScriptRoot + '\\office.exe'`);
		commands.push(`$officeXml = $PSScriptRoot + '\\office.xml'`);
		commands.push(`$officeExp = "\`"$officeExe\`" /configure \`"$officeXml\`""`);
		commands.push(`echo "Downloading office installer and configuration..."`);
		commands.push(`wget https://choco.emkace.de/office?config=${configuration} -OutFile office.xml`);
		commands.push(`wget https://choco.emkace.de/office?setup=true -OutFile office.exe`);
		commands.push(`echo "Installing office..."`);
		commands.push(`Invoke-Expression $officeExp`);
		commands.push(`echo "Deleting installer and configuration file..."`);
		commands.push(`Remove-Item -Path $officeExe`);
		commands.push(`Remove-Item -Path $officeXml`);
	} else {
		if (office.length != 0) throw "office";
	}

	if (privacy.length == 3) {
		if (privacy[0]) {
			commands.push(`# OOSU10`);
			commands.push(`$oosuExe = $PSScriptRoot + '\\oosu10.exe'`);
			commands.push(`$oosuCfg = $PSScriptRoot + '\\oosu10.cfg'`);
			commands.push(`$oosuExp = "\`"$oosuExe\`" \`"$oosuCfg\`" /quiet"`);
			commands.push(`echo "Downloading recommended privacy settings..."`);
			commands.push(`wget https://choco.emkace.de/privacy?oosu=software -OutFile oosu10.exe`);
			commands.push(`wget https://choco.emkace.de/privacy?oosu=config -OutFile oosu10.cfg`);
			commands.push(`echo "Applying recommended privacy settings..."`);
			commands.push(`Invoke-Expression $oosuExp`);
			commands.push(`sleep 10`);
			commands.push(`echo "Deleting remporary files..."`);
			commands.push(`Remove-Item -Path $oosuExe`);
			commands.push(`Remove-Item -Path $oosuCfg`);
		}
		if (privacy[1]) {
			commands.push(`# Remove Apps`);
			commands.push(`echo "Removing bloatware..."`);
			commands.push(`Get-AppxPackage *3dviewer* | Remove-AppxPackage`);
			commands.push(`Get-AppxPackage *feedbackhub* | Remove-AppxPackage`);
			commands.push(`Get-AppxPackage *getstarted* | Remove-AppxPackage`);
			commands.push(`Get-AppxPackage *gethelp* | Remove-AppxPackage`);
			commands.push(`Get-AppxPackage *mixedreality* | Remove-AppxPackage`);
			commands.push(`Get-AppxPackage *officehub* | Remove-AppxPackage`);
			commands.push(`Get-AppxPackage *onenote* | Remove-AppxPackage`);
			commands.push(`Get-AppxPackage *skypeapp* | Remove-AppxPackage`);
			commands.push(`Get-AppxPackage *solitairecollection* | Remove-AppxPackage`);
			commands.push(`Get-AppxPackage *soundrecorder* | Remove-AppxPackage`);
			commands.push(`Get-AppxPackage *windowsmaps* | Remove-AppxPackage`);
			commands.push(`Get-AppxPackage *zunemusic* | Remove-AppxPackage`);
			commands.push(`Get-AppxPackage *zunevideo* | Remove-AppxPackage`);
		}
		if (privacy[2]) {
			commands.push(`# Remove OneDrive`);
			commands.push(`echo "Removing OneDrive..."`);
			commands.push(`if (Test-Path "$env:systemroot\System32\OneDriveSetup.exe") {`);
			commands.push(`& "$env:systemroot\System32\OneDriveSetup.exe" /uninstall`);
			commands.push(`}`);
			commands.push(`if (Test-Path "$env:systemroot\SysWOW64\OneDriveSetup.exe") {`);
			commands.push(`& "$env:systemroot\SysWOW64\OneDriveSetup.exe" /uninstall`);
			commands.push(`}`);
		}
	} else {
		throw "privacy";
	}

	commands.push(`echo "Rebooting in 15 seconds..."`);
	commands.push(`shutdown -r -t 15`);
	return commands.join(`\n`);
};

const generateOffice = (settingsString) => {
	const settings = settingsString.split(``);
	const config = [];
	if (settings.length == 10) {
		config.push(`<Configuration>`);
		config.push(`<Add OfficeClientEdition="64" Channel="PerpetualVL2019">`);
		config.push(`<Product ID="ProPlus2019Volume" PIDKEY="NMMKJ-6RK4F-KMJVX-8D9MJ-6MWKP">`);
		config.push(`<Language ID="MatchOS" />`);
		if (settings[0] == 0) config.push(`<ExcludeApp ID="Access" />`);
		if (settings[1] == 0) config.push(`<ExcludeApp ID="Excel" />`);
		if (settings[2] == 0) config.push(`<ExcludeApp ID="Groove" />`);
		if (settings[3] == 0) config.push(`<ExcludeApp ID="Lync" />`);
		if (settings[4] == 0) config.push(`<ExcludeApp ID="OneDrive" />`);
		if (settings[5] == 0) config.push(`<ExcludeApp ID="OneNote" />`);
		if (settings[6] == 0) config.push(`<ExcludeApp ID="Outlook" />`);
		if (settings[7] == 0) config.push(`<ExcludeApp ID="PowerPoint" />`);
		if (settings[8] == 0) config.push(`<ExcludeApp ID="Publisher" />`);
		if (settings[9] == 0) config.push(`<ExcludeApp ID="Word" />`);
		config.push(`</Product>`);
		config.push(`</Add>`);
		config.push(`<Property Name="SharedComputerLicensing" Value="0" />`);
		config.push(`<Property Name="SCLCacheOverride" Value="0" />`);
		config.push(`<Property Name="AUTOACTIVATE" Value="0" />`);
		config.push(`<Property Name="FORCEAPPSHUTDOWN" Value="FALSE" />`);
		config.push(`<Property Name="DeviceBasedLicensing" Value="0" />`);
		config.push(`<Updates Enabled="TRUE" />`);
		config.push(`<RemoveMSI />`);
		config.push(`<Display Level="Full" AcceptEULA="TRUE" />`);
		config.push(`</Configuration>`);
		return config.join(`\n`);
    } else {
		throw "office";
	}
};

module.exports = {
	generateAll,
	generateOffice
};