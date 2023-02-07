var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var metricAPIRouter = require("./routes/metricAPI");
const client = require("prom-client");
const promMid = require("express-prometheus-middleware");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/metricAPI", metricAPIRouter);

app.use(
	promMid({
		metricsPath: "/metrics",
		collectDefaultMetrics: true,
	})
);

app.get("/metrics", async function (req, res) {
	// Return all metrics the Prometheus exposition format
	res.set("Content-Type", register.contentType);
	let metrics = await register.metrics();
	res.send(metrics);
});

let server = app.listen(9090, function () {
	let port = server.address().port;
	console.log("Application running on port: %s", port);
});

// error handler

module.exports = app;
