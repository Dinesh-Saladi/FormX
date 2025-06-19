import express from "express";
import { deleteForm, formSubmission, getForm, getForms, getResponses, publishForm } from "../controllers/formController.js";

const router = express.Router();

router.post("/publish-form", publishForm);
router.get("/get-forms", getForms);
router.get("/get-form", getForm);
router.post("/submit-form", formSubmission);
router.delete("/delete", deleteForm);
router.get("/get-responses", getResponses);
// router.post("change", Change);
// router.post("/publish-template", publishTemplate);

export default router;