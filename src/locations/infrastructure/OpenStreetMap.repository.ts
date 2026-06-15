import { LocationsRepository } from '../application/locations.repository';
import { Locations } from '../domain/locations';
import { OSMRestClient } from './clients/OSMRestClient';

export class OpenStreetMapRepository implements LocationsRepository {
  constructor(private readonly OSMRestClient: OSMRestClient) {}
  requestAutocomplete(query: string): Promise<Locations> {
    return this.OSMRestClient.autocomplete(query);
  }
}
