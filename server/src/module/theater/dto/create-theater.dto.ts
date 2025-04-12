import { ArrayNotEmpty, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateTheaterDto {
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsString()
    @IsNotEmpty()
    address: string;

    @IsOptional()
    isActive?: boolean;
  }