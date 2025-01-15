import { Module } from '@nestjs/common';
import { DogsResolver } from './dogs.resolver';
import { DogsService } from './dogs.service';

@Module({
  providers: [DogsResolver, DogsService],
  exports: [DogsService], // Optional: Export the service if you need to use it in other modules
})
export class DogsModule {}