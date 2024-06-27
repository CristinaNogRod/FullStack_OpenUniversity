import express from "express";
import diagnosesRouter from "./routes/diagnoses";
import patientsRouter from "./routes/patients";
import cors from "cors";

const app = express();
// const corsOptions = {
//   origin: "http://localhost:5173",
//   methods: "GET,POST,PUT,DELETE,OPTIONS",
//   allowedHeaders: "Origin,X-Requested-With,Content-Type,Accept,Authorization",
// };
app.use(cors());
app.use(express.json());

const PORT = 3000;

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/diagnoses", diagnosesRouter);

app.use("/api/patients", patientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
