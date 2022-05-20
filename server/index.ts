import express from "express";
import { parseRequest } from "./requestParser";

const PORT = 3001;

const app = express();

app.get("/api/charts", (req, res) => {
  parseRequest(req, res);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
