import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CatsService {
  private cats = [];

  findAll() {
    return this.cats;
  }

  findOne(id: number) {
    const cat = this.cats.find(cat => cat.id === id);
    if (!cat) {
      throw new NotFoundException('Cat not found');
    }
    return cat;
  }

  create(cat) {
    const newCat = { id: Date.now(), ...cat };
    this.cats.push(newCat);
    return newCat;
  }
}