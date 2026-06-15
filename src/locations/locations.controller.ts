import { Get, Query } from '@nestjs/common';
import { AutocompleteResponseDto } from './domain/locations';
import { AutocompleteUseCase } from './application/use-cases/autocomplete.use-case';

export class LocationsController {
  constructor(private readonly autocompleteUseCase: AutocompleteUseCase) {}

  @Get()
  async autocomplete(
    @Query('query') query: string,
  ): Promise<AutocompleteResponseDto> {
    const items = await this.autocompleteUseCase.execute(query);
    return { items };
  }
}
