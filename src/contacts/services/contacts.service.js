const { contactRepository } = require("../repository/contact.repository");

const getContactsService = async (req, res) => {
  try {
    // TODO: probar query params
    const queryParam = req.query.q || "";
    console.log("queryParam", queryParam);

    const result = await contactRepository.findAll();

    return res
      .status(200)
      .send({ status: "SUCCESS", data: result, count: result.length });
  } catch (error) {
    console.error("Error en getContactsService:", error);

    return res.status(500).send({
      status: "ERROR",
      message: "Error al listar contactos.",
      error: error.message,
    });
  }
};

module.exports = { getContactsService };
