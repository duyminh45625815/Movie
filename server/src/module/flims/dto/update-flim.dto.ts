import { PartialType } from '@nestjs/mapped-types';
import { CreateFlimDto } from './create-flim.dto';

export class UpdateFlimDto extends PartialType(CreateFlimDto) {}
