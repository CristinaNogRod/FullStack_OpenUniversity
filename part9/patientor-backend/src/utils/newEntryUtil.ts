import { Diagnosis, EntryWithoutId, HealthCheckRating } from "../types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isNumber = (value: unknown): value is number => {
  return typeof value === "number" || value instanceof Number;
};

const parseString = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error("Incorrect or missing name: " + text);
  }
  return text;
};

const isHCRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!isNumber(rating) || !isHCRating(rating)) {
    throw new Error("Invalid rating: " + rating);
  }
  return rating;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    console.log("no codes...");
    return [] as Array<Diagnosis["code"]>;
  }
  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

export const toEntry = (object: any): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  const type = parseString(object.type);

  if ("description" in object && "date" in object && "specialist" in object) {
    switch (type) {
      case "Hospital":
        return {
          type: type,
          date: parseString(object.date),
          specialist: parseString(object.specialist),
          description: parseString(object.description),
          diagnosisCodes: object.diagnosisCodes
            ? parseDiagnosisCodes(object)
            : undefined,
          discharge: {
            date: parseString(object.discharge.date),
            criteria: parseString(object.discharge.criteria),
          },
        };
      case "OccupationalHealthcare":
        return {
          type: type,
          date: parseString(object.date),
          specialist: parseString(object.specialist),
          description: parseString(object.description),
          diagnosisCodes: object.diagnosisCodes
            ? parseDiagnosisCodes(object)
            : undefined,
          employerName: parseString(object.employerName),
          sickLeave: object.sickLeave
            ? {
                startDate: parseString(object.sickLeave.startDate),
                endDate: parseString(object.sickLeave.endDate),
              }
            : undefined,
        };
      case "HealthCheck":
        return {
          type: type,
          date: parseString(object.date),
          specialist: parseString(object.specialist),
          description: parseString(object.description),
          diagnosisCodes: object.diagnosisCodes
            ? parseDiagnosisCodes(object)
            : undefined,
          healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        };
      default:
        throw new Error(`Unsupported entry type: ${type}`);
    }
  }

  throw new Error("Incorrect data: a field missing");
};
