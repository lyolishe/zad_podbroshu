import { readFile, writeFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { IRidesService, Ride, RideDto } from './types';

@Injectable()
export class RidesService implements IRidesService {
  private readonly filePath = join(process.cwd(), 'rides');
  private data: Ride[];

  constructor() {
    readFile(this.filePath, 'utf8')
      .then((data) => {
        this.data = JSON.parse(data) as Ride[];
      })
      .catch((err) => {
        console.error(err);
        this.data = [];
      });
  }

  getRides: () => Promise<Ride[]> = () => {
    return Promise.resolve(this.data);
  };

  getRideById: (id: string) => Promise<Ride> = (id) => {
    return new Promise((resolve, reject) => {
      const ride = this.data.find((r) => r.id === id);

      if (!ride) {
        reject(new Error('Ride not found.'));
        return;
      }

      resolve(ride);
    });
  };
  createRide: (newRide: RideDto) => Promise<Ride> = (newRide) => {
    return new Promise((resolve, reject) => {
      const uuid = randomUUID();
      const rideWId: Ride = { id: uuid, ...newRide };
      this.data.push(rideWId);
      this.syncStorage()
        .then(() => resolve(rideWId))
        .catch((error) => {
          if (error instanceof Error) {
            reject(error);
          } else {
            reject(new Error('unable to create a ride', { cause: error }));
          }
        });
    });
  };
  updateRideById: (id: string, newRide: Ride) => Promise<Ride> = (
    id,
    newRide,
  ) => {
    return new Promise((resolve, reject) => {
      const rideIndex = this.data.findIndex((r) => r.id === id);

      if (rideIndex < 0) {
        reject(new Error('Ride not found.'));
        return;
      }

      this.data.splice(rideIndex, 1, newRide);
      this.syncStorage()
        .then(() => {
          resolve(newRide);
        })
        .catch((err) => {
          if (err instanceof Error) {
            reject(err);
          } else {
            reject(new Error('unable to create a ride', { cause: err }));
          }
        });
    });
  };

  deleteRideById: (id: string) => Promise<void> = (id) => {
    return new Promise((resolve, reject) => {
      const rideIndex = this.data.findIndex((r) => r.id === id);

      if (rideIndex < 0) {
        reject(new Error('Ride not found.'));
      }

      this.data.splice(rideIndex, 1);
      this.syncStorage()
        .then(() => {
          resolve();
        })
        .catch((err) => {
          if (err instanceof Error) {
            reject(err);
          } else {
            reject(new Error('unable to create a ride', { cause: err }));
          }
        });
    });
  };

  private async syncStorage(): Promise<void> {
    try {
      await writeFile(this.filePath, JSON.stringify(this.data), 'utf8');
    } catch (error) {
      console.error(error);
      throw new Error('unable to write data to rides.json', {
        cause: error,
      });
    }
  }
}
