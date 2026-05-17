import { Inject, Injectable } from '@nestjs/common';
import { ORDERS_REPOSITORY_TOKEN } from '../orders.repository';
import type { OrdersRepository } from '../orders.repository';

@Injectable()
export class DeleteOrderUseCase {
  constructor(
    @Inject(ORDERS_REPOSITORY_TOKEN)
    private readonly ordersRepository: OrdersRepository,
  ) {}

  execute(id: string): Promise<void> {
    return this.ordersRepository.delete(id);
  }
}
