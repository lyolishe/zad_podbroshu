import { Inject, Injectable } from '@nestjs/common';
import { ORDERS_REPOSITORY_TOKEN } from '../orders.repository';
import type { OrdersRepository } from '../orders.repository';
import { Order } from '../../domain/order';

@Injectable()
export class GetAllOrdersUseCase {
  constructor(
    @Inject(ORDERS_REPOSITORY_TOKEN)
    private readonly ordersRepository: OrdersRepository,
  ) {}

  execute(): Promise<Order[]> {
    return this.ordersRepository.findAll();
  }
}
