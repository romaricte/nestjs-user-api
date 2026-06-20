import {
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParsePositiveIntPipe implements PipeTransform {
  transform(value: string): number {
    const parsedValue = Number(value);

    if (!Number.isInteger(parsedValue)) {
      throw new BadRequestException('La valeur doit être un nombre entier');
    }

    if (parsedValue <= 0) {
      throw new BadRequestException('La valeur doit être un entier positif');
    }

    return parsedValue;
  }
}