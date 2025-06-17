import express from "express";
import { publishForm } from "../controllers/formController.js";

const router = express.Router();

router.post("/publish-form", publishForm);
// router.post("/publish-template", publishTemplate);

export default router;