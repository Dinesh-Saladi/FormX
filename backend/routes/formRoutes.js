import express from "express";
import { formSubmission, getForm, getForms, publishForm } from "../controllers/formController.js";

const router = express.Router();

router.post("/publish-form", publishForm);
router.get("/get-forms", getForms);
router.get("/get-form", getForm);
router.post("/submit-form", formSubmission);
// router.post("change", Change);
// router.post("/publish-template", publishTemplate);

export default router;