import express from "express";
import "./db.js";
import middlewareSetup from "./middleware.js";
import setupRoutes from "./routes/index.js";

const {} = process.env;
const app = express();

// middleware
middlewareSetup(app);
setupRoutes(app);

export default app;
