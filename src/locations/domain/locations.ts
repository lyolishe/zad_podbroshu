export interface ILocation {
  name: string;
  description?: string;
  cords: {
    latitude: number;
    longitude: number;
  };
}

export type Locations = Array<ILocation>;

export interface AutocompleteResponseDto {
  items: Locations;
}
