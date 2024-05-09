import 'dotenv/config';
import express from "express";
import cors from "cors";
import fileUpload from 'express-fileupload';

import routes from "./routers/routes.js"

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const filesConfig = {
  limits: { fileSize: 5000000 }, //tamaño en bytes =>  1kb => 1024bytes
  abortOnLimit: true, //Si se pasa de 5MB responde con el error de abajo ↓
  responseOnLimit:
    "El peso del archivo que intentas subir supera el limite permitido.",
};
app.use(fileUpload(filesConfig));
app.use('/static', express.static('./src/uploads'));

app.use("/", routes)

/* LEVANTAR EL SERVIDOR */
app.listen(PORT, () => {
  console.log("Servidor levantado en el puerto: ", PORT);
});