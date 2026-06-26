import { Injectable } from '@nestjs/common';

@Injectable()
export class HashService {
  hash(value: string): string {
    return `hashed_${value}`;
  }

  compare(value: string, hashedValue: string): boolean {
    return hashedValue === `hashed_${value}`;
  }
}