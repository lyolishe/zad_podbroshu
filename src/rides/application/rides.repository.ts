import { CreateRideData, Ride, UpdateRideData } from '../domain/ride';

export const RIDES_REPOSITORY = Symbol('RIDES_REPOSITORY');

export interface RidesRepository {
  findAll(): Promise<Ride[]>;
  findById(id: string): Promise<Ride | null>;
  create(data: CreateRideData): Promise<Ride>;
  update(id: string, data: UpdateRideData): Promise<Ride>;
  delete(id: string): Promise<void>;
}
