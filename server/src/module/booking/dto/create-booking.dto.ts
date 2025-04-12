import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";
export class CreateBookingDto {
    @IsString()
    showtime:string

    @IsString()
    user:string

    @IsArray()
    @IsOptional()
    combo?:string[]

    @IsArray()
    seats:string[]

    @IsNumber()
    totalPrice:number;

    @IsOptional()
    status?:string
}
