const { validateContactData } = require("../utils");
const { contactRepository } = require("../repository/contact.repository");

const createContactService = async (req, res) => {
  try {
    const { names, email, phone, enterprise } = req.body;

    const validationError = validateContactData(req.body);
    if (validationError) {
      return res
        .status(400)
        .send({ status: "ERROR", message: validationError });
    }

    const newContact = await contactRepository.create(
      names,
      email,
      phone,
      enterprise || null
    );

    return res.status(201).send({
      status: "SUCCESS",
      message: "Contacto creado exitosamente.",
      data: newContact,
    });
  } catch (error) {
    // TODO: poner unique en email en la tabla
    if (error.code === "23505") {
      return res.status(409).send({
        status: "ERROR",
        message: "El contacto ya existe (ej. email duplicado).",
        error: error.message,
      });
    }

    console.error("Error en createContactService:", error);
    return res.status(500).send({
      status: "ERROR",
      message: "Error al crear el contacto.",
      error: error.message,
    });
  }
};

module.exports = { createContactService };
