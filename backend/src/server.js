import 'dotenv/config';
import express from "express";
import cors from "cors";
import fileUpload from 'express-fileupload';

import routes from "./routers/routes.js"

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(fileUpload());

app.use("/", routes)

/* LEVANTAR EL SERVIDOR */
app.listen(PORT, () => {
  console.log("Servidor levantado en el puerto: ", PORT);
});