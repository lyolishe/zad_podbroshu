import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { GetAllOrdersUseCase } from './application/use-cases/get-orders.use-case';
import { GetOrderByIdUseCase } from './application/use-cases/get-order-by-id.use-case';
import { CreateOrderUseCase } from './application/use-cases/create-order.use-case';
import { UpdateOrderUseCase } from './application/use-cases/update-order.use-case';
import { DeleteOrderUseCase } from './application/use-cases/delete-order.use-case';
import { ORDERS_REPOSITORY_TOKEN } from './application/orders.repository';
import { FileOrdersRepository } from './infrastructure/persistance/file-orders.repository';

@Module({
  controllers: [OrdersController],
  providers: [
    GetAllOrdersUseCase,
    GetOrderByIdUseCase,
    CreateOrderUseCase,
    UpdateOrderUseCase,
    DeleteOrderUseCase,
    { provide: ORDERS_REPOSITORY_TOKEN, useExisting: FileOrdersRepository },
  ],
})
export class OrdersModule {}
