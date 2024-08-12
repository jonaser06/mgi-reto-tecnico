
export class InfrastructureError extends Error {
  constructor(
    message: string = "An unexpected error has ocurred processing event",
    public readonly details: Array<{ message: string }> = []
  ) {
    super(message);
    this.message = message;
    this.details = details;
  }
}