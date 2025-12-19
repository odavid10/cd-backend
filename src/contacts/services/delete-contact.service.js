const { contactRepository } = require("../repository/contact.repository");

const deleteContactService = async (req, res) => {
  try {
    const { id } = req.params;

    const contactId = parseInt(id, 10);
    if (isNaN(contactId)) {
      return res.status(400).send({ status: "ERROR", message: "ID inválido." });
    }

    const success = await contactRepository.delete(contactId);

    if (!success) {
      return res.status(404).send({
        status: "ERROR",
        message: `Contacto con ID ${contactId} no encontrado para eliminar.`,
      });
    }

    return res.status(200).send({
      status: "SUCCESS",
      message: "Contacto eliminado exitosamente.",
    });
  } catch (error) {
    console.error(
      `Error en deleteContactService para ID ${req.params.id}:`,
      error
    );
    return res.status(500).send({
      status: "ERROR",
      message: "Error al eliminar el contacto.",
      error: error.message,
    });
  }
};

module.exports = { deleteContactService };
