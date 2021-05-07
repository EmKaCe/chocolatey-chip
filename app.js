const axios = require("axios").default;
const express = require("express");
const cors = require("cors");
const xmljs = require("xml-js");
const path = require("path");

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

app.listen(port, () => {
    console.log(`Express listening on port ${port}`);
});