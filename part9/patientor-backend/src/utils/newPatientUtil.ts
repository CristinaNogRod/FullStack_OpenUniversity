import { NewPatient, Gender } from "../types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseString = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error("Incorrect or missing name: " + text);
  }
  return text;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Invalid gender: " + gender);
  }
  return gender;
};

export const toNewPatient = (object: any): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if ("name" in object && "occupation" in object && "gender" in object) {
    const newPatient: NewPatient = {
      name: parseString(object.name),
      occupation: parseString(object.occupation),
      gender: parseGender(object.gender),
      ssn: object.ssn ? parseString(object.ssn) : undefined,
      dateOfBirth: object.dateOfBirth
        ? parseString(object.dateOfBirth)
        : undefined,
    };
    return newPatient;
  }

  throw new Error("Incorrect data: a field missing");
};
