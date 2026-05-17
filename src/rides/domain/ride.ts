export enum RideStatus {
  PLANNED = 'PLANNED',
  RUNNING = 'RUNNING',
  CANCELLED = 'CANCELLED',
  FINISHED = 'FINISHED',
}

export interface Ride {
  id: string;
  from: string;
  to: string;
  passenger_n: number;
  status: RideStatus;
  date: string;
  time: string;
}

export type CreateRideData = Omit<Ride, 'id' | 'status'>;
export type UpdateRideData = Omit<Ride, 'id'>;
