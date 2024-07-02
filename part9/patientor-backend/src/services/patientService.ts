import patientData from "../../data/patients.ts";
import {
  Patient,
  NonSensitivePatient,
  NewPatient,
  EntryWithoutId,
  Entry,
} from "../types";
import { v1 as uuid } from "uuid";
import { toNewPatient } from "../utils/newPatientUtil.ts";

const patients: Patient[] = patientData.map((obj) => {
  const object = toNewPatient(obj) as Patient;
  object.id = obj.id;
  return object;
});

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(
    ({ id, name, occupation, gender, dateOfBirth, entries }) => ({
      id,
      name,
      occupation,
      gender,
      dateOfBirth,
      entries,
    })
  );
};

const getPatientById = (id: string): Patient => {
  return patients.find((patient) => patient.id === id) as Patient;
};

const addPatient = (patient: NewPatient): Patient => {
  const id = uuid();
  const newPatient = {
    id,
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (entry: EntryWithoutId, patientId: string): Patient => {
  const patient = patients.find((p) => p.id === patientId);
  if (!patient) {
    throw new Error(`Patient with id ${patientId} not found`);
  }

  const id = uuid();
  const newEntry: Entry = {
    id,
    ...entry,
  };
  patient.entries = patient.entries.concat(newEntry);
  return patient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  getPatientById,
  addEntry,
};
