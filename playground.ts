import express from "express";
import { badServer } from "./src/main";

const app = express();
const port = 3000;

app.use(badServer());

app.get("/", (req, res) => {
  res.send("Hello World from BadServer!");
});

app.listen(port, () => {
  console.log(`Bad Server running on http://localhost:${port}`);
});
