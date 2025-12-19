const { validateContactData } = require("../utils");
const { contactRepository } = require("../repository/contact.repository");

const updateContactService = async (req, res) => {
  try {
    const { id } = req.params;
    const { names, email, phone, enterprise } = req.body;

    const contactId = parseInt(id, 10);
    if (isNaN(contactId)) {
      return res.status(400).send({ status: "ERROR", message: "ID inválido." });
    }

    const validationError = validateContactData(req.body);
    if (validationError) {
      return res
        .status(400)
        .send({ status: "ERROR", message: validationError });
    }

    const updatedContact = await contactRepository.update(
      contactId,
      names,
      email,
      phone,
      enterprise || null
    );

    if (!updatedContact) {
      return res.status(404).send({
        status: "ERROR",
        message: `Contacto con ID ${contactId} no encontrado para actualizar.`,
      });
    }

    return res.status(200).send({
      status: "SUCCESS",
      message: "Contacto actualizado exitosamente.",
      data: updatedContact,
    });
  } catch (error) {
    // TODO: probar si esta validacion funciona
    if (error.code === "23505") {
      return res.status(409).send({
        status: "ERROR",
        message: "Error: El email que intenta usar ya está registrado.",
        error: error.message,
      });
    }

    console.error(
      `Error en updateContactService para ID ${req.params.id}:`,
      error
    );
    return res.status(500).send({
      status: "ERROR",
      message: "Error al actualizar el contacto.",
      error: error.message,
    });
  }
};

module.exports = { updateContactService };
