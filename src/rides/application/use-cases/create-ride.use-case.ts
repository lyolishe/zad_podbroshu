import { Inject, Injectable } from '@nestjs/common';
import type { CreateRideData, Ride } from '../../domain/ride';
import { RIDES_REPOSITORY } from '../rides.repository';
import type { RidesRepository } from '../rides.repository';

@Injectable()
export class CreateRideUseCase {
  constructor(
    @Inject(RIDES_REPOSITORY)
    private readonly ridesRepository: RidesRepository,
  ) {}

  execute(data: CreateRideData): Promise<Ride> {
    return this.ridesRepository.create(data);
  }
}
