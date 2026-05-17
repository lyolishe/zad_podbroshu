import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ORDERS_REPOSITORY_TOKEN } from '../orders.repository';
import type { OrdersRepository } from '../orders.repository';
import { Order } from '../../domain/ride';
import { OrderNotFoundError } from '../../domain/errors/order-not-found.error';

@Injectable()
export class GetOrderByIdUseCase {
  constructor(
    @Inject(ORDERS_REPOSITORY_TOKEN)
    private readonly ordersRepository: OrdersRepository,
  ) {}

  async execute(id: string): Promise<Order> {
    const order = await this.ordersRepository.findById(id);

    if (!order) {
      throw new OrderNotFoundError(id);
    }

    return order;
  }
}
