var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
	const serverTime = Math.floor(Date.now() / 1000);
	res.send(`${serverTime}`);
});

module.exports = router;
