export enum OrderStatus {
  ORDERED = 'ORDERED',
  RUNNING = 'RUNNING',
  CANCELLED = 'CANCELLED',
  FINISHED = 'FINISHED',
}

export interface Order {
  id: string;
  from: string;
  to: string;
  passenger_n: number;
  status: OrderStatus;
  date: string;
  time: string;
}

export type CreateOrderData = Omit<Order, 'id' | 'status'>;
export type UpdateOrderData = Omit<Order, 'id'>;
