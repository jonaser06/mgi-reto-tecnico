import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApplicationError } from 'src/auth/domain/errors/application/application.error';
import { InfrastructureError } from 'src/auth/domain/errors/infrastructure/infrastructure.error';
import { BookRepositoryError } from 'src/books/domain/errors/infrastructure/book-repository.error';
import { CollectionsRepositoryError } from 'src/collections/domain/errors/infrastructure/collections-repository.error';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  private invalidRequest(error: string, detailsMessage: string = ""): HttpException {
    return new HttpException({
        code: HttpStatus.BAD_REQUEST,
        message: error,
        details: {
          message: detailsMessage
        }
      },
      HttpStatus.BAD_REQUEST
    );
  }

  private forbidden(error: string, detailsMessage: string = ""): HttpException {
    return new HttpException({
        code: HttpStatus.FORBIDDEN,
        message: error,
        details: {
          message: detailsMessage
        }
      },
      HttpStatus.FORBIDDEN
    );
  }

  private notFound(error: string, detailsMessage: string = ""): HttpException {
    return new HttpException({
        code: HttpStatus.NOT_FOUND,
        message: error,
        details: {
          message: detailsMessage
        }
      },
      HttpStatus.NOT_FOUND
    );
  }

  private databaseError(error: string, detailsMessage: any): HttpException {
    return new HttpException({
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      message: error,
      details: {
        message: detailsMessage
      }
      },
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }

  private fail(error: string, detailsMessage: string = ""): HttpException {
    return new HttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
        details: {
          message: detailsMessage
        },
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(catchError( (error) => {
      console.log(error.constructor.name);
      if ( error instanceof ApplicationError ) {
        return throwError(() => this.invalidRequest(error.message, error.details.toString()));
      }else if ( error instanceof InfrastructureError ) {
        return throwError(() => this.databaseError(error.message, error.details[0].message));
      }else if (error instanceof BookRepositoryError ) {
        return throwError(() => this.databaseError(error.message, error.details[0].message));
      }else if (error instanceof CollectionsRepositoryError ) {
        return throwError(() => this.databaseError(error.message, error.details[0].message));
      }
      const message = error.message || "";
      const response = error.response?.[0] || "";

      return throwError(() => this.fail(message, response ));
    }))
  }
}
