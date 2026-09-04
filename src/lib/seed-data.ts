import { Animal, User, Colony, OperationBatch } from './types';

export const mockUsers: User[] = [
  { userID: 'U1', name: 'Alice Admin', username: 'admin', contactInfo: 'alice@pawtrack.com', role: 'Admin', permissionLevel: 5 },
  { userID: 'U2', name: 'Bob Volunteer', username: 'volunteer', contactInfo: 'bob@pawtrack.com', role: 'Volunteer', assignedArea: 'North District', hoursLogged: 120 },
  { userID: 'U3', name: 'Dr. Sarah', username: 'vet', contactInfo: 'sarah@pawtrack.com', role: 'Veterinarian', licenseNumber: 'VET-98765' },
  { userID: 'U4', name: 'John Doe', username: 'adopter', contactInfo: 'john@gmail.com', role: 'Adopter', homeCheckStatus: 'Approved' },
  { userID: 'U5', name: 'Emma Wealth', username: 'donor', contactInfo: 'emma@wealth.com', role: 'Donor', isRecurringDonor: true },
];

export const mockAnimals: Animal[] = [
  {
    animalID: 'A1', name: 'Whiskers', species: 'Cat', age: 3, gender: 'Male', weight: 4.2, status: 'Trapped', intakeDate: '2026-09-01',
    breed: 'Domestic Shorthair', coatPattern: 'Tabby', earTipped: false, estimatedCareCost: 50, speciesLabel: 'Feline',
    medicalRecord: { vaccinations: [], surgeries: [], prescriptions: [], behavior: [] }
  },
  {
    animalID: 'A2', name: 'Luna', species: 'Cat', age: 1, gender: 'Female', weight: 3.5, status: 'InSurgery', intakeDate: '2026-09-02',
    breed: 'Siamese Mix', coatPattern: 'Colorpoint', earTipped: true, estimatedCareCost: 50, speciesLabel: 'Feline',
    medicalRecord: { vaccinations: [], surgeries: [{ id: 'S1', date: '2026-09-03', procedure: 'Spay', surgeonId: 'U3', notes: 'Routine' }], prescriptions: [], behavior: [] }
  },
  {
    animalID: 'A3', name: 'Rex', species: 'Dog', age: 4, gender: 'Male', weight: 22.0, status: 'AdoptionPending', intakeDate: '2026-08-15',
    breed: 'German Shepherd', sizeCategory: 'Large', temperament: 'Protective but sweet', estimatedCareCost: 80, speciesLabel: 'Canine',
    medicalRecord: { vaccinations: [{ id: 'V1', date: '2026-08-16', vaccineType: 'Rabies', administeredBy: 'U3' }], surgeries: [], prescriptions: [], behavior: [] }
  },
  {
    animalID: 'A4', name: 'Bella', species: 'Dog', age: 2, gender: 'Female', weight: 12.0, status: 'Adopted', intakeDate: '2026-07-20',
    breed: 'Beagle', sizeCategory: 'Medium', temperament: 'Energetic', estimatedCareCost: 80, speciesLabel: 'Canine',
    medicalRecord: { vaccinations: [], surgeries: [], prescriptions: [], behavior: [{ id: 'B1', date: '2026-07-22', assessorId: 'U2', temperamentScore: 9, notes: 'Very friendly' }] }
  },
  {
    animalID: 'A5', name: 'Bandit', species: 'Other', age: 1, gender: 'Male', weight: 5.0, status: 'Returned', intakeDate: '2026-08-01',
    customSpeciesName: 'Raccoon', estimatedCareCost: 100, speciesLabel: 'Raccoon',
    medicalRecord: { vaccinations: [], surgeries: [], prescriptions: [], behavior: [] }
  },
];

export const mockColonies: Colony[] = [
  { colonyID: 'C1', locationName: 'Downtown Alley 4', caretakerID: 'U2', residentAnimalIDs: ['A1', 'A2'] },
  { colonyID: 'C2', locationName: 'Westside Park', caretakerID: 'U1', residentAnimalIDs: ['A5'] },
];

export const mockOperationBatches: OperationBatch[] = [
  { batchID: 'OB1', scheduledDate: '2026-09-05', clinicName: 'Main Shelter Clinic', candidateAnimalIDs: ['A1'], status: 'Scheduled' },
];
