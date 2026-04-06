import { Controller, Get } from '@nestjs/common';
import { RidesService } from './rides.service';
import { Ride } from './types';

@Controller('rides')
export class RidesController {
  constructor(private readonly ridesService: RidesService) {}

  @Get()
  rides(): Ride[] {
    return this.ridesService.getRides();
  }
}
