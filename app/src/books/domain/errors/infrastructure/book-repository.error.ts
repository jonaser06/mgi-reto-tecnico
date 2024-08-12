import { InfrastructureError } from "src/auth/domain/errors/infrastructure/infrastructure.error";

export class BookRepositoryError extends InfrastructureError {
  constructor(
    message: string = "An unexpected error has ocurred processing event",
    public readonly details: Array<{ message: string }> = []
  ) {
    super(message, details);
  }
}