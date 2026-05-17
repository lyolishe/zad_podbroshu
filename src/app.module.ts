import { Module } from '@nestjs/common';
import { RidesModule } from './rides/rides.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [RidesModule, OrdersModule],
})
export class AppModule {}
