export interface Ride {
  id: string;
  from: string;
  to: string;
  passenger_n: number;
  date: string;
  time: string;
}

export type CreateRideData = Omit<Ride, 'id'>;
export type UpdateRideData = CreateRideData;
