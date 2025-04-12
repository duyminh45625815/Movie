import {  IsOptional, IsString } from 'class-validator';
export class CreateFoodDto {
 @IsString()
 titleFood:string

 @IsString()
 price:string

 @IsString()
 details:string

 @IsOptional()
 imageFood?:string

 @IsOptional()
 @IsString()
 statusFood?:string
}
