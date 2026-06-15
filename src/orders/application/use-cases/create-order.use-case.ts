import { Inject, Injectable } from '@nestjs/common';
import { ORDERS_REPOSITORY_TOKEN } from '../orders.repository';
import type { OrdersRepository } from '../orders.repository';
import { CreateOrderData, Order } from '../../domain/order';

@Injectable()
export class CreateOrderUseCase {
  constructor(
    @Inject(ORDERS_REPOSITORY_TOKEN)
    private readonly ordersRepository: OrdersRepository,
  ) {}

  execute(data: CreateOrderData): Promise<Order> {
    return this.ordersRepository.create(data);
  }
}
