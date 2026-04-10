export class RideNotFoundError extends Error {
  constructor(id: string) {
    super(`Ride with id "${id}" was not found.`);
  }
}
