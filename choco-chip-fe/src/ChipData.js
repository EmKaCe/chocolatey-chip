import React from "react";
import { AllInclusive, Code, Computer, VideogameAsset } from "@material-ui/icons";

const chipData = [
	{
		name: "Must-Haves",
		icon: (<Computer />),
		packages: [
			"7zip",
			"brave",
			"vlc"
		]
	},
	{
		name: "Developer",
		icon: (<Code />),
		packages: [
			"filezilla",
			"git",
			"insomnia-rest-api-client",
			"intellijidea-ultimate",
			"mobaxterm",
			"nodejs-lts",
			"pycharm",
			"python",
			"vscode",
			"webstorm"
		]
	},
	{
		name: "Gamer",
		icon: (<VideogameAsset />),
		packages: [
			"discord",
			"epicgameslauncher",
			"goggalaxy",
			"obs-studio",
			"origin",
			"steam-client",
			"teamspeak",
			"ubisoft-connect"
		]
	},
	{
		name: "Everything",
		icon: (<AllInclusive />),
		packages: [
			"7zip",
			"brave",
			"discord",
			"epicgameslauncher",
			"filezilla",
			"git",
			"goggalaxy",
			"insomnia-rest-api-client",
			"intellijidea-ultimate",
			"mobaxterm",
			"nodejs-lts",
			"obs-studio",
			"origin",
			"pycharm",
			"python",
			"steam-client",
			"teamspeak",
			"ubisoft-connect",
			"vlc",
			"vscode",
			"webstorm"
		]
	}
];

export default chipData;