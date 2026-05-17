import { Module } from '@nestjs/common';
import { CreateRideUseCase } from './application/use-cases/create-ride.use-case';
import { DeleteRideUseCase } from './application/use-cases/delete-ride.use-case';
import { GetRideByIdUseCase } from './application/use-cases/get-ride-by-id.use-case';
import { GetRidesUseCase } from './application/use-cases/get-rides.use-case';
import { UpdateRideUseCase } from './application/use-cases/update-ride.use-case';
import { RIDES_REPOSITORY } from './application/rides.repository';
import { FileRidesRepository } from './infrastructure/persistence/file-rides.repository';
import { RidesController } from './rides.controller';

@Module({
  controllers: [RidesController],
  providers: [
    GetRidesUseCase,
    GetRideByIdUseCase,
    CreateRideUseCase,
    UpdateRideUseCase,
    DeleteRideUseCase,
    {
      provide: RIDES_REPOSITORY,
      useExisting: FileRidesRepository,
    },
  ],
})
export class RidesModule {}
