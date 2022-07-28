import path from "path";
import express from "express";
import {
  getBirds,
  addBird,
  updateBird,
  removeBird,
} from "../controllers/birds.controller.js";

const router = express.Router();

router
  .get("/:id?", getBirds)
  .post("/", addBird)
  .put("/:id", updateBird)
  .delete("/:id", removeBird);

export default router;
