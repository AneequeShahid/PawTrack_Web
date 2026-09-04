import { Animal, User, Colony, OperationBatch } from './types';

export const mockUsers: User[] = [
  { userID: 'U1', name: 'Aneeque Shahid', username: 'admin', contactInfo: 'aneeque@pawtrack.pk', role: 'Admin', permissionLevel: 5 },
  { userID: 'U2', name: 'Abdullah Zahoor', username: 'vet', contactInfo: 'dr.abdullah@pawtrack.pk', role: 'Veterinarian', licenseNumber: 'VET-PK-987' },
  { userID: 'U3', name: 'Hassan Raza', username: 'volunteer', contactInfo: 'hassan@pawtrack.pk', role: 'Volunteer', assignedArea: 'Gulberg & Model Town', hoursLogged: 340 },
  { userID: 'U4', name: 'Fatima Ali', username: 'adopter', contactInfo: 'fatima.ali@gmail.com', role: 'Adopter', homeCheckStatus: 'Approved' },
  { userID: 'U5', name: 'Hamza Tariq', username: 'donor', contactInfo: 'hamza.t@business.pk', role: 'Donor', isRecurringDonor: true },
  { userID: 'U6', name: 'Aisha Khan', username: 'volunteer2', contactInfo: 'aisha.k@pawtrack.pk', role: 'Volunteer', assignedArea: 'DHA Phase 5', hoursLogged: 120 },
  { userID: 'U7', name: 'Dr. Usman', username: 'vet2', contactInfo: 'dr.usman@pawtrack.pk', role: 'Veterinarian', licenseNumber: 'VET-PK-112' },
];

export const mockAnimals: Animal[] = [
  {
    animalID: 'A1', name: 'Sheru', species: 'Dog', age: 4, gender: 'Male', weight: 24.5, status: 'Available', intakeDate: '2026-08-10',
    breed: 'Gaddi Kutta Mix', sizeCategory: 'Large', temperament: 'Loyal and protective', estimatedCareCost: 80, speciesLabel: 'Canine',
    medicalRecord: { vaccinations: [{ id: 'V1', date: '2026-08-11', vaccineType: 'Rabies', administeredBy: 'U2' }], surgeries: [], prescriptions: [], behavior: [] }
  },
  {
    animalID: 'A2', name: 'Mano', species: 'Cat', age: 2, gender: 'Female', weight: 3.8, status: 'Recovering', intakeDate: '2026-09-01',
    breed: 'Persian Cross', coatPattern: 'Solid White', earTipped: false, estimatedCareCost: 50, speciesLabel: 'Feline',
    medicalRecord: { vaccinations: [], surgeries: [{ id: 'S1', date: '2026-09-02', procedure: 'Spay (TNVR)', surgeonId: 'U2', notes: 'Recovering well' }], prescriptions: [], behavior: [] }
  },
  {
    animalID: 'A3', name: 'Moti', species: 'Dog', age: 1, gender: 'Male', weight: 12.0, status: 'Available', intakeDate: '2026-08-20',
    breed: 'Street Dog (Desi)', sizeCategory: 'Medium', temperament: 'Very playful and energetic', estimatedCareCost: 80, speciesLabel: 'Canine',
    medicalRecord: { vaccinations: [{ id: 'V2', date: '2026-08-21', vaccineType: 'DHLPP', administeredBy: 'U7' }], surgeries: [], prescriptions: [], behavior: [] }
  },
  {
    animalID: 'A4', name: 'Billi', species: 'Cat', age: 5, gender: 'Female', weight: 4.1, status: 'Returned', intakeDate: '2025-11-10',
    breed: 'Domestic Shorthair', coatPattern: 'Tabby', earTipped: true, estimatedCareCost: 50, speciesLabel: 'Feline',
    medicalRecord: { vaccinations: [{ id: 'V3', date: '2025-11-10', vaccineType: 'FVRCP', administeredBy: 'U2' }], surgeries: [{ id: 'S2', date: '2025-11-12', procedure: 'Spay & Ear Tip', surgeonId: 'U2', notes: 'Released back to Liberty Market' }], prescriptions: [], behavior: [] }
  },
  {
    animalID: 'A5', name: 'Bhalu', species: 'Dog', age: 6, gender: 'Male', weight: 32.0, status: 'Quarantined', intakeDate: '2026-09-04',
    breed: 'Bhagyari Kutta', sizeCategory: 'Giant', temperament: 'Timid, needs socialization', estimatedCareCost: 80, speciesLabel: 'Canine',
    medicalRecord: { vaccinations: [], surgeries: [], prescriptions: [{ id: 'P1', medication: 'Amoxicillin', dosage: '500mg twice daily', startDate: '2026-09-04', endDate: '2026-09-14' }], behavior: [] }
  },
  {
    animalID: 'A6', name: 'Chiku', species: 'Cat', age: 0, gender: 'Male', weight: 1.2, status: 'Available', intakeDate: '2026-08-25',
    breed: 'Stray Kitten', coatPattern: 'Tuxedo', earTipped: false, estimatedCareCost: 50, speciesLabel: 'Feline',
    medicalRecord: { vaccinations: [], surgeries: [], prescriptions: [], behavior: [] }
  },
  {
    animalID: 'A7', name: 'Tuffy', species: 'Dog', age: 3, gender: 'Male', weight: 18.0, status: 'AdoptionPending', intakeDate: '2026-07-15',
    breed: 'Desi Mix', sizeCategory: 'Medium', temperament: 'Great with kids', estimatedCareCost: 80, speciesLabel: 'Canine',
    medicalRecord: { vaccinations: [{ id: 'V4', date: '2026-07-16', vaccineType: 'Rabies', administeredBy: 'U7' }], surgeries: [], prescriptions: [], behavior: [] }
  },
  {
    animalID: 'A8', name: 'Rani', species: 'Dog', age: 2, gender: 'Female', weight: 15.0, status: 'Trapped', intakeDate: '2026-09-03',
    breed: 'Desi', sizeCategory: 'Medium', temperament: 'Scared', estimatedCareCost: 80, speciesLabel: 'Canine',
    medicalRecord: { vaccinations: [], surgeries: [], prescriptions: [], behavior: [] }
  },
  {
    animalID: 'A9', name: 'Simba', species: 'Cat', age: 4, gender: 'Male', weight: 5.5, status: 'InSurgery', intakeDate: '2026-09-04',
    breed: 'Ginger Tabby', coatPattern: 'Orange Mackerel', earTipped: false, estimatedCareCost: 50, speciesLabel: 'Feline',
    medicalRecord: { vaccinations: [], surgeries: [], prescriptions: [], behavior: [] }
  },
  {
    animalID: 'A10', name: 'Sultan', species: 'Dog', age: 5, gender: 'Male', weight: 28.0, status: 'Adopted', intakeDate: '2026-01-10',
    breed: 'German Shepherd Cross', sizeCategory: 'Large', temperament: 'Calm', estimatedCareCost: 80, speciesLabel: 'Canine',
    medicalRecord: { vaccinations: [], surgeries: [], prescriptions: [], behavior: [] }
  },
  {
    animalID: 'A11', name: 'Pari', species: 'Cat', age: 1, gender: 'Female', weight: 3.0, status: 'Available', intakeDate: '2026-08-30',
    breed: 'Siamese Mix', coatPattern: 'Colorpoint', earTipped: false, estimatedCareCost: 50, speciesLabel: 'Feline',
    medicalRecord: { vaccinations: [{ id: 'V5', date: '2026-08-31', vaccineType: 'FVRCP', administeredBy: 'U2' }], surgeries: [], prescriptions: [], behavior: [] }
  },
  {
    animalID: 'A12', name: 'Tiger', species: 'Dog', age: 2, gender: 'Male', weight: 20.0, status: 'Recovering', intakeDate: '2026-09-01',
    breed: 'Desi', sizeCategory: 'Medium', temperament: 'Energetic', estimatedCareCost: 80, speciesLabel: 'Canine',
    medicalRecord: { vaccinations: [], surgeries: [{ id: 'S3', date: '2026-09-02', procedure: 'Neutering', surgeonId: 'U7', notes: 'Routine' }], prescriptions: [], behavior: [] }
  },
  {
    animalID: 'A13', name: 'Laila', species: 'Cat', age: 3, gender: 'Female', weight: 4.0, status: 'Returned', intakeDate: '2026-05-10',
    breed: 'Stray', coatPattern: 'Calico', earTipped: true, estimatedCareCost: 50, speciesLabel: 'Feline',
    medicalRecord: { vaccinations: [], surgeries: [{ id: 'S4', date: '2026-05-12', procedure: 'Spay', surgeonId: 'U2', notes: 'TNVR' }], prescriptions: [], behavior: [] }
  },
  {
    animalID: 'A14', name: 'Max', species: 'Dog', age: 4, gender: 'Male', weight: 25.0, status: 'Quarantined', intakeDate: '2026-09-02',
    breed: 'Labrador Retriever Cross', sizeCategory: 'Large', temperament: 'Friendly but sick', estimatedCareCost: 80, speciesLabel: 'Canine',
    medicalRecord: { vaccinations: [], surgeries: [], prescriptions: [], behavior: [] }
  },
  {
    animalID: 'A15', name: 'Kalu', species: 'Other', age: 2, gender: 'Male', weight: 8.0, status: 'Available', intakeDate: '2026-08-15',
    customSpeciesName: 'Monkey', estimatedCareCost: 100, speciesLabel: 'Primate',
    medicalRecord: { vaccinations: [], surgeries: [], prescriptions: [], behavior: [] }
  },
];

export const mockColonies: Colony[] = [
  { colonyID: 'C1', locationName: 'Model Town Park', caretakerID: 'U3', residentAnimalIDs: ['A4', 'A13'] },
  { colonyID: 'C2', locationName: 'DHA Phase 5 Commercial', caretakerID: 'U6', residentAnimalIDs: ['A1', 'A3'] },
  { colonyID: 'C3', locationName: 'Gulberg Liberty Market', caretakerID: 'U3', residentAnimalIDs: ['A2', 'A6'] },
  { colonyID: 'C4', locationName: 'Johar Town Block G', caretakerID: 'U1', residentAnimalIDs: ['A5', 'A8'] },
  { colonyID: 'C5', locationName: 'Bahria Town Safari', caretakerID: 'U6', residentAnimalIDs: ['A15'] },
];

export const mockOperationBatches: OperationBatch[] = [
  { batchID: 'OB1', scheduledDate: '2026-09-05', clinicName: 'BNU Veterinary Hospital', candidateAnimalIDs: ['A8', 'A9'], status: 'Scheduled' },
  { batchID: 'OB2', scheduledDate: '2026-09-04', clinicName: 'Defense Animal Clinic', candidateAnimalIDs: ['A2', 'A12'], status: 'InProgress' },
  { batchID: 'OB3', scheduledDate: '2026-08-30', clinicName: 'Liberty Vet Care', candidateAnimalIDs: ['A4', 'A13'], status: 'Completed' },
];
