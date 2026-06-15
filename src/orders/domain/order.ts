export enum OrderStatus {
  ORDERED = 'ORDERED',
  RUNNING = 'RUNNING',
  CANCELLED = 'CANCELLED',
  FINISHED = 'FINISHED',
}

export interface Order {
  id: string;
  rideId: string;
  from: string;
  to: string;
  status: OrderStatus;
  date: string;
  time: string;
}

export type CreateOrderData = Omit<Order, 'id' | 'status'>;
export type UpdateOrderData = Omit<Order, 'id'>;
