import { Injectable } from '@nestjs/common';

export interface Dog {
  id: number;
  name: string;
}

@Injectable()
export class DogsService {
  private dogs: Dog[] = [
    { id: 1, name: 'Buddy' },
    { id: 2, name: 'Max' },
  ];

  // Method to retrieve all dogs
  findAll(): Dog[] {
    return this.dogs;
  }

  // Method to retrieve a dog by ID
  findOne(id: number): Dog {
    return this.dogs.find(dog => dog.id === id);
  }

  // Method to add a new dog
  create(name: string): Dog {
    const newDog: Dog = {
      id: this.dogs.length + 1, // Simple ID generation
      name,
    };
    this.dogs.push(newDog);
    return newDog;
  }
}