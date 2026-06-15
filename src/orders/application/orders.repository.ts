import { CreateOrderData, Order, UpdateOrderData } from '../domain/order';

export const ORDERS_REPOSITORY_TOKEN = Symbol('ORDERS_REPOSITORY_TOKEN');

export interface OrdersRepository {
  findAll(): Promise<Order[]>;
  findById(id: string): Promise<Order | null>;
  create(data: CreateOrderData): Promise<Order>;
  update(id: string, data: UpdateOrderData): Promise<Order>;
  delete(id: string): Promise<void>;
}
