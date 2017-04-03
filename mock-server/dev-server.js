const express = require("express");

const bodyParser = require("body-parser");
const publicCache = (req, res, next) => {
    res.set("Cache-Control", "public; max-age=604800");
    next();
};

var httpApp = express();

httpApp.use("/api", bodyParser.json());
// httpApp.use("/api", apiRouter);
httpApp.use(express.static(__dirname));
httpApp.use("/dist", express.static(__dirname + "/../dist"));
httpApp.use("/assets", express.static(__dirname + "/../src/assets"));

var server = require("http").createServer(httpApp);
server.listen(8080, ()=> console.log(`Server started at 8080`));
