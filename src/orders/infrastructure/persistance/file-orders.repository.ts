import {
  Order,
  CreateOrderData,
  UpdateOrderData,
  OrderStatus,
} from 'src/orders/domain/order';
import { OrdersRepository } from '../../application/orders.repository';
import { Injectable } from '@nestjs/common';
import { join } from 'node:path';
import { readFile, writeFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';

@Injectable()
export class FileOrdersRepository implements OrdersRepository {
  private readonly dataDir =
    process.env.DATA_DIR ?? join(process.cwd(), 'data');
  private readonly filePath = join(this.dataDir, 'orders.json');
  private readonly initialized: Promise<void>;
  private orders: Order[] = [];

  constructor() {
    this.initialized = this.loadData();
  }

  async findAll(): Promise<Order[]> {
    await this.initialized;
    return [...this.orders];
  }
  async findById(id: string): Promise<Order | null> {
    await this.initialized;
    return this.orders.find((order) => order.id === id) ?? null;
  }

  async create(data: CreateOrderData): Promise<Order> {
    await this.initialized;

    const order: Order = {
      id: randomUUID(),
      status: OrderStatus.ORDERED,
      ...data,
    };

    this.orders.push(order);
    await this.syncStorage();

    return order;
  }

  async update(id: string, data: UpdateOrderData): Promise<Order> {
    await this.initialized;

    const orderIndex = this.orders.findIndex((o) => o.id === id);
    const updatedOrder = { id, ...data };

    this.orders.splice(orderIndex, 1, updatedOrder);
    await this.syncStorage();

    return updatedOrder;
  }

  async delete(id: string): Promise<void> {
    await this.initialized;

    const orderIndex = this.orders.findIndex((o) => o.id === id);
    this.orders.splice(orderIndex, 1);

    await this.syncStorage();
  }

  private async loadData(): Promise<void> {
    try {
      const fileContent = await readFile(this.filePath, 'utf8');
      this.orders = JSON.parse(fileContent) as Order[];
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code !== 'ENOENT') {
        throw e;
      }

      this.orders = [];
    }
  }

  async syncStorage() {
    await writeFile(this.filePath, JSON.stringify(this.orders), 'utf8');
  }
}
