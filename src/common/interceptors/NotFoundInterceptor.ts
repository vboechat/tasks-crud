import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap((data) => {
        if (data === undefined) {
          return data;
        }

        if (data === null || data.length === 0) {
          throw new NotFoundException();
        }
      })
    );
  }
}
