const validateContactData = (data) => {
  if (!data.names || !data.email || !data.phone) {
    return "Los campos names, email y phone son requeridos.";
  }

  return null;
};

module.exports = validateContactData;
