import patientData from "../../data/patients.ts";
import { Patient, NoSsnPatient, NewPatient } from "../types";
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

const getNoSsnPatients = (): NoSsnPatient[] => {
  return patients.map(({ id, name, occupation, gender, dateOfBirth }) => ({
    id,
    name,
    occupation,
    gender,
    dateOfBirth,
  }));
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

export default {
  getPatients,
  getNoSsnPatients,
  addPatient,
};
