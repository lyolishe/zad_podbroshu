import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateRideUseCase } from './application/use-cases/create-ride.use-case';
import { DeleteRideUseCase } from './application/use-cases/delete-ride.use-case';
import { GetRideByIdUseCase } from './application/use-cases/get-ride-by-id.use-case';
import { GetRidesUseCase } from './application/use-cases/get-rides.use-case';
import { UpdateRideUseCase } from './application/use-cases/update-ride.use-case';
import { RideNotFoundError } from './domain/errors/ride-not-found.error';
import type { CreateRideData, Ride, UpdateRideData } from './domain/ride';

@Controller('rides')
export class RidesController {
  constructor(
    private readonly getRidesUseCase: GetRidesUseCase,
    private readonly getRideByIdUseCase: GetRideByIdUseCase,
    private readonly createRideUseCase: CreateRideUseCase,
    private readonly updateRideUseCase: UpdateRideUseCase,
    private readonly deleteRideUseCase: DeleteRideUseCase,
  ) {}

  @Get()
  rides(): Promise<Ride[]> {
    return this.getRidesUseCase.execute();
  }

  @Get(':id')
  async ride(@Param('id') id: string): Promise<Ride> {
    try {
      return await this.getRideByIdUseCase.execute(id);
    } catch (error) {
      this.rethrowRideError(error);
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreateRideData): Promise<Ride> {
    return this.createRideUseCase.execute(body);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateRideData,
  ): Promise<Ride> {
    try {
      return await this.updateRideUseCase.execute(id, body);
    } catch (error) {
      this.rethrowRideError(error);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    try {
      await this.deleteRideUseCase.execute(id);
    } catch (error) {
      this.rethrowRideError(error);
    }
  }

  private rethrowRideError(error: unknown): never {
    if (error instanceof RideNotFoundError) {
      throw new NotFoundException(error.message);
    }

    throw error;
  }
}
