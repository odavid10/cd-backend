const router = require("express").Router();

const appRoutes = require("../app.routes");
const contactRoutes = require("../contacts/controller/contacts.controller");

router.use(appRoutes);

router.use("/api/contacts", contactRoutes);

module.exports = router;
