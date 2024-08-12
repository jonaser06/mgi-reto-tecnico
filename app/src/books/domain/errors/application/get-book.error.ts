import { ApplicationError } from "./application.error";

export class GetBookError extends ApplicationError {
  constructor(
    message: string = "An unexpected error has ocurred processing event",
    public readonly details: Array<{ message: string }> = []
  ) {
    super(message);
  }
}