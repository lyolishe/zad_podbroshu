import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import type { CreateOrderData, UpdateOrderData } from './domain/ride';
import { GetAllOrdersUseCase } from './application/use-cases/get-orders.use-case';
import { GetOrderByIdUseCase } from './application/use-cases/get-order-by-id.use-case';
import { UpdateOrderUseCase } from './application/use-cases/update-order.use-case';
import { CreateOrderUseCase } from './application/use-cases/create-order.use-case';
import { DeleteOrderUseCase } from './application/use-cases/delete-order.use-case';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly getOrdersUseCase: GetAllOrdersUseCase,
    private readonly getOrderByIdUseCase: GetOrderByIdUseCase,
    private readonly updateOrderUseCase: UpdateOrderUseCase,
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly deleteOrderUseCase: DeleteOrderUseCase,
  ) {}

  @Get()
  orders() {
    return this.getOrdersUseCase.execute();
  }

  @Get(':id')
  order(@Param('id') id: string) {
    return this.getOrderByIdUseCase.execute(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createOrder: CreateOrderData) {
    return this.createOrderUseCase.execute(createOrder);
  }

  @Put()
  update(@Param('id') id: string, @Body() updateOrder: UpdateOrderData) {
    return this.updateOrderUseCase.execute(id, updateOrder);
  }

  @Delete()
  delete(@Param('id') id: string) {
    return this.deleteOrderUseCase.execute(id);
  }
}
