import { Injectable } from '@nestjs/common';

@Injectable()
export class AuditService {
 log(action: string, resource: string, resourceId: number): void {
    console.log(`[AUDIT] ${action} ${resource} with id ${resourceId}`);
  }
}
