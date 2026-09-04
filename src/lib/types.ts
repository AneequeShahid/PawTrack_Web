export type AnimalStatus = 'Trapped' | 'Quarantined' | 'InSurgery' | 'Recovering' | 'Returned' | 'Available' | 'AdoptionPending' | 'Adopted' | 'Deceased';
export type UserRole = 'Admin' | 'Volunteer' | 'Veterinarian' | 'Adopter' | 'Donor';

export interface VaccinationRecord {
  id: string;
  date: string;
  vaccineType: string;
  administeredBy: string;
}

export interface SurgeryLog {
  id: string;
  date: string;
  procedure: string;
  surgeonId: string;
  notes: string;
}

export interface Prescription {
  id: string;
  medication: string;
  dosage: string;
  startDate: string;
  endDate: string;
}

export interface BehaviorAssessment {
  id: string;
  date: string;
  assessorId: string;
  temperamentScore: number;
  notes: string;
}

export interface MedicalRecord {
  vaccinations: VaccinationRecord[];
  surgeries: SurgeryLog[];
  prescriptions: Prescription[];
  behavior: BehaviorAssessment[];
}

export interface BaseAnimal {
  animalID: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Unknown';
  weight: number;
  status: AnimalStatus;
  intakeDate: string;
  medicalRecord: MedicalRecord;
}

export interface Cat extends BaseAnimal {
  species: 'Cat';
  breed: string;
  coatPattern: string;
  earTipped: boolean;
  estimatedCareCost: 50;
  speciesLabel: 'Feline';
}

export interface Dog extends BaseAnimal {
  species: 'Dog';
  breed: string;
  sizeCategory: 'Small' | 'Medium' | 'Large' | 'Giant';
  temperament: string;
  estimatedCareCost: 80;
  speciesLabel: 'Canine';
}

export interface OtherAnimal extends BaseAnimal {
  species: 'Other';
  customSpeciesName: string;
  estimatedCareCost: 100;
  speciesLabel: string;
}

export type Animal = Cat | Dog | OtherAnimal;

export interface BaseUser {
  userID: string;
  name: string;
  username: string;
  contactInfo: string;
}

export interface Admin extends BaseUser {
  role: 'Admin';
  permissionLevel: number;
}

export interface Volunteer extends BaseUser {
  role: 'Volunteer';
  assignedArea: string;
  hoursLogged: number;
}

export interface Veterinarian extends BaseUser {
  role: 'Veterinarian';
  licenseNumber: string;
}

export interface Adopter extends BaseUser {
  role: 'Adopter';
  homeCheckStatus: 'Pending' | 'Approved' | 'Rejected';
}

export interface Donor extends BaseUser {
  role: 'Donor';
  isRecurringDonor: boolean;
}

export type User = Admin | Volunteer | Veterinarian | Adopter | Donor;

export interface Colony {
  colonyID: string;
  locationName: string;
  caretakerID: string;
  residentAnimalIDs: string[];
}

export interface OperationBatch {
  batchID: string;
  scheduledDate: string;
  clinicName: string;
  candidateAnimalIDs: string[];
  status: 'Scheduled' | 'InProgress' | 'Completed';
}
