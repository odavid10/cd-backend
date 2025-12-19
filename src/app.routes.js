const router = require("express").Router();

const { appService } = require("./app.service");

router.get("/", appService);

module.exports = router;
