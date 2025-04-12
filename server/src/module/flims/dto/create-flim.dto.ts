
import { IsString, IsNotEmpty, IsOptional } from "class-validator";


export class CreateFlimDto {
    
    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsString()
    age: string

    @IsNotEmpty()
    @IsString()
    timeLength:string

    @IsNotEmpty()
    @IsString()
    year:string
    
    @IsNotEmpty()
    @IsString()
    onStage:string

    @IsNotEmpty()
    @IsString()
    description:string

    @IsOptional()
    image?:string
}
