import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ParseIdPipe implements PipeTransform {
  transform(value: number) {
    if (isNaN(value)) {
      throw new BadRequestException();
    }

    return Math.abs(value);
  }
}
