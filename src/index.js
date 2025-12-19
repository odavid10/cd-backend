const app = require("./app");

require("dotenv").config();

const port = process.env.PORT || 3000;

app.listen(port, (err) => {
  if (err) {
    console.error("Error al iniciar el servidor:", err);
  } else {
    console.log(`API REST Contact Directory en http://localhost:${port}`);
  }
});
