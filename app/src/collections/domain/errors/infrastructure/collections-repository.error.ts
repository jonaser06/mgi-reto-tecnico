import { InfrastructureError } from "./infrastructure.error";

export class CollectionsRepositoryError extends InfrastructureError {
  constructor(
    message: string = "An unexpected error has ocurred processing event",
    public readonly details: Array<{ message: string }> = []
  ) {
    super(message, details);
  }
}