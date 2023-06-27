const app = require("./index");
const db = require("./src/configs/db");

const PORT = process.env.PORT || 300;

app.listen(PORT, async () => {
  db();
  console.log("listening to port", PORT);
});