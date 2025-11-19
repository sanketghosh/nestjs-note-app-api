import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class CUIDValidationPipe implements PipeTransform {
  private readonly cuidRegex = /^c[0-9a-z]{24}$/;

  transform(value: string) {
    if (!this.cuidRegex.test(value)) {
      throw new BadRequestException("Invalid ID format, Expected a CUID.");
    }
    return value;
  }
}
