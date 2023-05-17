export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: "male" | "female" | "other";
  occupation: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export type NewPatient = Omit<PatientEntry, "id">;

export type NonSensitivePatient = Omit<PatientEntry, "ssn">;
