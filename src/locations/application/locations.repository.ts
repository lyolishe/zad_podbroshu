import { Locations } from '../domain/locations';

export const LOCATIONS_REPOSITORY = Symbol('LOCATIONS_REPOSITORY');

export interface LocationsRepository {
  requestAutocomplete(query: string): Promise<Locations>;
}
