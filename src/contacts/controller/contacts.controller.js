const router = require("express").Router();

const {
  createContactService,
  deleteContactService,
  getContactByIdService,
  getContactsService,
  updateContactService,
} = require("../services");

router.get("/", getContactsService);
router.get("/:id", getContactByIdService);
router.post("/", createContactService);
router.put("/:id", updateContactService);
router.delete("/:id", deleteContactService);

module.exports = router;
