import { Inject, Injectable } from '@nestjs/common';
import { RideNotFoundError } from '../../domain/errors/ride-not-found.error';
import type { Ride, UpdateRideData } from '../../domain/ride';
import { RIDES_REPOSITORY } from '../rides.repository';
import type { RidesRepository } from '../rides.repository';

@Injectable()
export class UpdateRideUseCase {
  constructor(
    @Inject(RIDES_REPOSITORY)
    private readonly ridesRepository: RidesRepository,
  ) {}

  async execute(id: string, data: UpdateRideData): Promise<Ride> {
    const existingRide = await this.ridesRepository.findById(id);

    if (!existingRide) {
      throw new RideNotFoundError(id);
    }

    return this.ridesRepository.update(id, data);
  }
}
