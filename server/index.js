import { dummyListData } from "./dummyListData";
const express = require("express");

const PORT = 3001;

const app = express();

app.get("/api/charts", (req, res) => {
  res.json({ charts: dummyListData });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
