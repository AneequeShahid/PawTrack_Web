// TODO: swap for a real database (Postgres/Supabase/etc.)
// In-memory data store for the demo (resets on serverless cold start)
import { Animal, User } from './types';

let animals: Animal[] = [
  { animalID: "A1", name: "Mittens", species: "Cat", age: 2, gender: "Female", weight: 4.5, status: "Trapped", intakeDate: "2026-08-10", breed: "DSH", coatPattern: "Tabby", earTipped: false, medicalRecord: { vaccinations: [], surgeries: [], prescriptions: [], behavior: [] } }
];

let users: User[] = [
  { userID: "U1", name: "Admin User", username: "admin", contactInfo: "admin@pawtrack.local", role: "Admin" },
  { userID: "U2", name: "Vol User", username: "vol", contactInfo: "vol@pawtrack.local", role: "Volunteer" }
];

export const getAnimals = () => animals;
export const getUsers = () => users;
