import express from "express";
import { getForm, getForms, publishForm } from "../controllers/formController.js";

const router = express.Router();

router.post("/publish-form", publishForm);
router.get("/get-forms", getForms);
router.get("/get-form", getForm);
// router.post("change", Change);
// router.post("/publish-template", publishTemplate);

export default router;