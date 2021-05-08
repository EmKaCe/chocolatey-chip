const axios = require("axios").default;
const express = require("express");
const cors = require("cors");
const xmljs = require("xml-js");
const path = require("path");
const createScript = require("./CreateScript");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "choco-chip-fe", "build")))

app.get("/search/:query", (req, res) => {
	if (req.params.query) {
		axios.get("https://community.chocolatey.org/api/v2/Search()?$filter=IsLatestVersion&$skip=0&$top=30&searchTerm='" + req.params.query + "'&targetFramework=''&includePrerelease=false",
			{
				headers: {
					"DataServiceVersion": "1.0;NetFx",
					"MaxDataServiceVersion": "2.0;NetFx",
					"User-Agent": "Chocolatey Core",
					"Accept": "application/atom+xml,application/xml",
					"Accept-Charset": "UTF-8",
					"Host": "community.chocolatey.org",
					"Accept-Encoding": "gzip, deflate"
				}
			})
			.then((chocoRes) => {
				res.type("json").status(200).send(xmljs.xml2json(chocoRes.data, { compact: true }));
			});
	}
});

app.get("/generate", (req, res) => {
	const host = `${req.protocol}://${req.hostname}`;
	if (req.body.chocolatey && req.body.office && req.body.privacy) {
		try {
			const script = createScript.generateAll(host, req.body.chocolatey, req.body.office, req.body.privacy);
			res.type("text/plain").status(200).send(script);
		} catch (e) {
			res.status(400).send(`Bad ${e} configuration.`);
		}
	} else {
		res.status(400).send("Bad request.");
	}
});

app.get("/office", (req, res) => {
	if (req.query.config) {
		try {
			const config = createScript.generateOffice(req.query.config);
			res.type("application/xml").status(200).send(config);
		} catch (e) {
			res.status(400).send(`Bad ${e} configuration.`);
		}
	} else {
		if (req.query.setup) {
			res.sendFile(path.join(__dirname, "additional-files/office.exe"));
		} else {
			res.status(404).send("Not found.");
		}
	}
});

app.get("/privacy", (req, res) => {
	if (req.query.oosu == "software") {
		res.sendFile(path.join(__dirname, "additional-files/oosu.exe"));
	} else {
		if (req.query.oosu == "config") {
			res.sendFile(path.join(__dirname, "additional-files/oosu.cfg"));
		} else {
			res.status(404).send("Not found.");
		}
	}
});

app.listen(port, () => {
	console.log(`Express listening on port ${port}`);
});