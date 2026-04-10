import { Inject, Injectable } from '@nestjs/common';
import { RideNotFoundError } from '../../domain/errors/ride-not-found.error';
import type { Ride } from '../../domain/ride';
import { RIDES_REPOSITORY } from '../rides.repository';
import type { RidesRepository } from '../rides.repository';

@Injectable()
export class GetRideByIdUseCase {
  constructor(
    @Inject(RIDES_REPOSITORY)
    private readonly ridesRepository: RidesRepository,
  ) {}

  async execute(id: string): Promise<Ride> {
    const ride = await this.ridesRepository.findById(id);

    if (!ride) {
      throw new RideNotFoundError(id);
    }

    return ride;
  }
}
