/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import patientService from "../services/patientService";
import toNewPatientEntry from "../utils/toNewPatientEntry";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getAll());
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatient = patientService.addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "something went wrong";
    if (error instanceof Error) {
      errorMessage += "Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.get("/:id", (req, res) => {
  const patient = patientService.getOne(req.params.id);
  if (!patient) {
    res.status(400).send("patient not found");
  }
  res.send(patient);
});

export default router;
