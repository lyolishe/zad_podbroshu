export interface Ride {
  id: string;
  from: string;
  to: string;
  passenger_n: number;
  date: string;
  time: string;
}

export type RideDto = Omit<Ride, 'id'>;

export interface IRidesService {
  getRides: () => Promise<Ride[]>;
  getRideById: (id: string) => Promise<Ride>;
  createRide: (newRide: RideDto) => Promise<Ride>;
  updateRideById: (id: string, newRide: Ride) => Promise<Ride>;
  deleteRideById: (id: string) => Promise<void>;
}
