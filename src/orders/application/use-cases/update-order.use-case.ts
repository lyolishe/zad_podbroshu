import { Inject, Injectable } from '@nestjs/common';
import { ORDERS_REPOSITORY_TOKEN } from '../orders.repository';
import type { OrdersRepository } from '../orders.repository';
import { CreateOrderData, Order } from '../../domain/ride';

@Injectable()
export class UpdateOrderUseCase {
  constructor(
    @Inject(ORDERS_REPOSITORY_TOKEN)
    private readonly ordersRepository: OrdersRepository,
  ) {}

  execute(id: string, data: CreateOrderData): Promise<Order> {
    return this.ordersRepository.update(id, data);
  }
}
