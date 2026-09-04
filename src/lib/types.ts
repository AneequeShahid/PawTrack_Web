export type AnimalStatus = 'Trapped' | 'Quarantined' | 'InSurgery' | 'Recovering' | 'Returned' | 'AdoptionPending' | 'Adopted' | 'Deceased';
export type UserRole = 'Admin' | 'Volunteer' | 'Veterinarian' | 'Adopter' | 'Donor';

export interface BaseAnimal {
  animalID: string;
  name: string;
  species: 'Cat' | 'Dog' | 'Other';
  age: number;
  gender: string;
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
}

export interface Dog extends BaseAnimal {
  species: 'Dog';
  breed: string;
  sizeCategory: string;
  temperament: string;
}

export interface OtherAnimal extends BaseAnimal {
  species: 'Other';
  customSpeciesName: string;
}

export type Animal = Cat | Dog | OtherAnimal;

export interface MedicalRecord {
  vaccinations: any[];
  surgeries: any[];
  prescriptions: any[];
  behavior: any[];
}

export interface User {
  userID: string;
  name: string;
  username: string;
  contactInfo: string;
  role: UserRole;
}
