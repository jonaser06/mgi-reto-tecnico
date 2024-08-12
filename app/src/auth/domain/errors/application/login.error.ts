import { ApplicationError } from "./application.error";

export class LoginError extends ApplicationError {
  constructor(message: string) {
    super(message);
  }
}