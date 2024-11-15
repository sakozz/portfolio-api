import { NestInterceptor, ExecutionContext, CallHandler, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DtoClass } from 'src/types/dtos';
import { Role } from 'src/types/roles';

export function Serialize(dto: DtoClass) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: DtoClass) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const currentUserRole: Role = 'admin';
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
          groups: [currentUserRole],
        });
      }),
    );
  }
}
