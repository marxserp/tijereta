import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import connectDB from "./mongodb/connect.js";
// Rutas
import authRouter from "./routes/auth.routes.js";
import turnoRouter from "./routes/turno.routes.js";
import clienteRouter from "./routes/cliente.routes.js";
import productoRouter from "./routes/producto.routes.js";

// Configuración
dotenv.config();
const app = express(); // Initializing app
app.use(bodyParser.json({ limit: "30mb", extended: "true" })); // Límite para los archivos enviados desde el front
app.use(bodyParser.urlencoded({ limit: "30mb", extended: "true" }));
app.use(cors()); // Añadido de middleware

app.get("/", (req, res) => {
  res.send({ message: "Hello World!" });
});

// Rutas
app.use("/auth", authRouter);
app.use("/turnos", turnoRouter);
app.use("/productos", productoRouter);
app.use("/clientes", clienteRouter);

// Mangosta
const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () =>
      console.log("Server started on port http://localhost:8080")
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
