const { contactRepository } = require("../repository/contact.repository");

const getContactByIdService = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .send({ status: "ERROR", message: "ID del contacto es requerido." });
    }

    const result = await contactRepository.findById(id);

    if (!result) {
      return res.status(404).send({
        status: "ERROR",
        message: `Contacto con ID ${id} no encontrado.`,
      });
    }

    return res.status(200).send({ status: "SUCCESS", data: result });
  } catch (error) {
    console.error(
      `Error en getContactByIdService para ID ${req.params.id}:`,
      error
    );

    return res.status(500).send({
      status: "ERROR",
      message: "Error al obtener el contacto por ID.",
      error: error.message,
    });
  }
};

module.exports = { getContactByIdService };
