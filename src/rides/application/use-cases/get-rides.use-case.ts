import { Inject, Injectable } from '@nestjs/common';
import type { Ride } from '../../domain/ride';
import { RIDES_REPOSITORY } from '../rides.repository';
import type { RidesRepository } from '../rides.repository';

@Injectable()
export class GetRidesUseCase {
  constructor(
    @Inject(RIDES_REPOSITORY)
    private readonly ridesRepository: RidesRepository,
  ) {}

  execute(): Promise<Ride[]> {
    return this.ridesRepository.findAll();
  }
}
