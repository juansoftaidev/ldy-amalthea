import { Test, TestingModule } from '@nestjs/testing';
import { DogsResolver } from './dogs.resolver';

describe('DogsResolver', () => {
  let resolver: DogsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DogsResolver],
    }).compile();

    resolver = module.get<DogsResolver>(DogsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
