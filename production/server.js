var path = require("path");
var express = require("express");
var subdomain = require("express-subdomain");
var router = express.Router();

var DIST_DIR = path.join(__dirname, "../dist");
var PORT = 8080;
var app = express();

//Serving the files on the dist folder
app.use(express.static(DIST_DIR));

//Send index.html when the user access the web
router.get("*", function(req, res) {
    res.sendFile(path.join(DIST_DIR, "index.html"));
});
app.use(subdomain("seat-checkin", router));

app.listen(PORT);
