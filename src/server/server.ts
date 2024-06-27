import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import AppDataSource from "../data/data-source";

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors());

try {
  AppDataSource.initialize();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
} catch (error) {
  console.log(`Error: ${error}`)
}

export default app;