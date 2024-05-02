import { Sequelize } from "sequelize";

/* VARIABLES DE ENTORNO */
const USER_DB = process.env.DB_USER || "postgres";
const PASS_DB = process.env.DB_PASSWORD || "postgres";
const HOST_DB = process.env.DB_HOST || "localhost";
const PORT_DB = "5432";
const NAME_DB = process.env.DB_NAME || "skatepark";

/* Inicio una instancia de sequelize y conecto con la base de datos */
export const sequelize = new Sequelize(
  `postgres://${USER_DB}:${PASS_DB}@${HOST_DB}:${PORT_DB}/${NAME_DB}`,
  {
    logging: false, // cambiar a true para ver las query que se ejecutan desde la consola
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
