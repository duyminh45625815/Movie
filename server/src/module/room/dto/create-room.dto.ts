import { IsArray, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  capacity: number; 


  @IsEnum(['2D', '3D', 'IMAX', '4DX'])
  @IsOptional()
  screenType?: string;

  
}