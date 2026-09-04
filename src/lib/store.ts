// TODO: swap for a real database (Postgres/Supabase/etc.)
// In-memory data store for the demo (resets on serverless cold start)

import { Animal, User, Colony, OperationBatch } from './types';
import { mockAnimals, mockUsers, mockColonies, mockOperationBatches } from './seed-data';

let animals: Animal[] = [...mockAnimals];
let users: User[] = [...mockUsers];
let colonies: Colony[] = [...mockColonies];
let batches: OperationBatch[] = [...mockOperationBatches];

export const db = {
  animals: {
    getAll: () => animals,
    getById: (id: string) => animals.find(a => a.animalID === id),
    add: (animal: Animal) => { animals.push(animal); return animal; },
    update: (id: string, partial: Partial<Animal>) => {
      const idx = animals.findIndex(a => a.animalID === id);
      if (idx !== -1) { animals[idx] = { ...animals[idx], ...partial } as Animal; return animals[idx]; }
      return null;
    }
  },
  users: {
    getAll: () => users,
    getById: (id: string) => users.find(u => u.userID === id),
    getByUsername: (username: string) => users.find(u => u.username === username),
  },
  colonies: {
    getAll: () => colonies,
  },
  batches: {
    getAll: () => batches,
  }
};
