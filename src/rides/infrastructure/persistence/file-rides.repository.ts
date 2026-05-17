import { randomUUID } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { Injectable } from '@nestjs/common';
import { join } from 'node:path';
import {
  CreateRideData,
  Ride,
  RideStatus,
  UpdateRideData,
} from '../../domain/ride';
import type { RidesRepository } from '../../application/rides.repository';

@Injectable()
export class FileRidesRepository implements RidesRepository {
  private readonly dataDirectory =
    process.env.DATA_DIR ?? join(process.cwd(), 'data');
  private readonly filePath = join(this.dataDirectory, 'rides.json');
  private readonly initialized: Promise<void>;
  private rides: Ride[] = [];

  constructor() {
    this.initialized = this.loadData();
  }

  async findAll(): Promise<Ride[]> {
    await this.initialized;
    return [...this.rides];
  }

  async findById(id: string): Promise<Ride | null> {
    await this.initialized;
    return this.rides.find((ride) => ride.id === id) ?? null;
  }

  async create(data: CreateRideData): Promise<Ride> {
    await this.initialized;

    const ride: Ride = {
      id: randomUUID(),
      status: RideStatus.PLANNED,
      ...data,
    };

    this.rides.push(ride);
    await this.syncStorage();

    return ride;
  }

  async update(id: string, data: UpdateRideData): Promise<Ride> {
    await this.initialized;

    const rideIndex = this.rides.findIndex((ride) => ride.id === id);
    const updatedRide: Ride = { id, ...data };

    this.rides.splice(rideIndex, 1, updatedRide);
    await this.syncStorage();

    return updatedRide;
  }

  async delete(id: string): Promise<void> {
    await this.initialized;

    const rideIndex = this.rides.findIndex((ride) => ride.id === id);
    this.rides.splice(rideIndex, 1);

    await this.syncStorage();
  }

  private async loadData(): Promise<void> {
    try {
      const fileContent = await readFile(this.filePath, 'utf8');
      this.rides = JSON.parse(fileContent) as Ride[];
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
        throw error;
      }

      this.rides = [];
    }
  }

  private async syncStorage(): Promise<void> {
    await writeFile(this.filePath, JSON.stringify(this.rides), 'utf8');
  }
}
