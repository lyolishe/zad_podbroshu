import { Inject, Injectable } from '@nestjs/common';
import { RideNotFoundError } from '../../domain/errors/ride-not-found.error';
import { RIDES_REPOSITORY } from '../rides.repository';
import type { RidesRepository } from '../rides.repository';

@Injectable()
export class DeleteRideUseCase {
  constructor(
    @Inject(RIDES_REPOSITORY)
    private readonly ridesRepository: RidesRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const existingRide = await this.ridesRepository.findById(id);

    if (!existingRide) {
      throw new RideNotFoundError(id);
    }

    await this.ridesRepository.delete(id);
  }
}
