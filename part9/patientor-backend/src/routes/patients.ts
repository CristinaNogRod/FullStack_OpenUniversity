import express from "express";
import patientService from "../services/patientService";
import { toNewPatient } from "../utils/newPatientUtil.ts";
import { toEntry } from "../utils/newEntryUtil.ts";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.get("/:id", (req, res) => {
  const id: string = req.params.id;
  res.send(patientService.getPatientById(id));
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const id: string = req.params.id;
    const newEntry = toEntry(req.body);
    const updatedPatient = patientService.addEntry(newEntry, id);
    res.json(updatedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
