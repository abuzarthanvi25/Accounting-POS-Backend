const express = require("express");
const cors = require("cors");
const connection = require("./db/connection")
require("dotenv").config();
const router = require("./routes/index");
const app = express();

app.use(cors());
const PORT = process.env.PORT || 5000;
app.use(express.json())

app.use(router);

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
    return;
  }
  console.log('Connected to the database');
});

app.listen(PORT, () =>
  console.log(`Server is success full running on : http://localhost:${PORT}`)
);
