var path = require("path");
var express = require("express");
var router = express.Router();

var DIST_DIR = path.join(__dirname, "../dist");
var PORT = 8080;

var app = express();
app.use(express.static(DIST_DIR));

router.get("*", function(req, res) {
    res.sendFile(path.join(DIST_DIR, "index.html"));
});

app.use(router);

app.listen(PORT);
