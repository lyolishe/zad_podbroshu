import { Inject, Injectable } from '@nestjs/common';
import { LOCATIONS_REPOSITORY } from '../locations.repository';
import type { LocationsRepository } from '../locations.repository';

@Injectable()
export class AutocompleteUseCase {
  constructor(
    @Inject(LOCATIONS_REPOSITORY)
    private readonly locationsRepository: LocationsRepository,
  ) {}

  execute(query: string) {
    return this.locationsRepository.requestAutocomplete(query);
  }
}
