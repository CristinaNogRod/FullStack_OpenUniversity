import express from "express";
import cors from "cors";

const app = express();
const corsOptions = {
  origin: "http://localhost:5173", // Frontend URL
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Origin,X-Requested-With,Content-Type,Accept,Authorization",
};

app.use(cors(corsOptions));
app.use(express.json());

const PORT = 3000;

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
