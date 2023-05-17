import { NonSensitivePatient, PatientEntry, NewPatient } from "../types";
import patientData from "../../data/patients";
import { v1 as uuid } from "uuid";

const patients: NonSensitivePatient[] = patientData.map(
  ({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  })
);

const getAll = (): NonSensitivePatient[] => {
  return patients;
};

const addPatient = (entry: NewPatient): PatientEntry => {
  const id = uuid();
  const newPatient = { id, ...entry };
  patients.push(newPatient);
  return newPatient;
};

export default { getAll, addPatient };
