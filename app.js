const express = require('express');
const APP_SERVER = express();

APP_SERVER.use("/api",require("./Routes/usermasterroute"));
APP_SERVER.use("/api",require("./Routes/categorymasterroute"));
APP_SERVER.use("/api",require("./Routes/languageroute"));
APP_SERVER.use("/api",require("./Routes/authormasterroute"));
APP_SERVER.use("/api",require("./Routes/audiouploadroute"));


module.exports = APP_SERVER;