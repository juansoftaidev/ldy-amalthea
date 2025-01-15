import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { DogsService, Dog } from './dogs.service';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class DogType {
  @Field(type => Int)
  id: number;

  @Field()
  name: string;
}

@Resolver(of => DogType)
export class DogsResolver {
  constructor(private dogsService: DogsService) {}

  // Query to get all dogs
  @Query(returns => [DogType])
  dogs(): DogType[] {
    return this.dogsService.findAll();
  }

  // Query to get a dog by ID
  @Query(returns => DogType, { nullable: true })
  dog(@Args('id', { type: () => Int }) id: number): DogType {
    return this.dogsService.findOne(id);
  }

  // Mutation to create a new dog
  @Mutation(returns => DogType)
  createDog(@Args('name') name: string): DogType {
    return this.dogsService.create(name);
  }
}