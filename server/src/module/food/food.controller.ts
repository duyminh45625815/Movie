import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FoodService } from './food.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post('add-foods')
  @UseInterceptors(FileInterceptor('imageFood', {
      storage: diskStorage({
        destination: './public/uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;
          const ext = extname(file.originalname);
          callback(null, uniqueSuffix);
        },
      }),
    }))
  create(
    @Body() createFoodDto: CreateFoodDto,
      @UploadedFile() file: Express.Multer.File,
    ) {
      if (!file) {
        throw new BadRequestException('No file uploaded');
      }
      createFoodDto.imageFood = `/uploads/${file.filename}`;
    return this.foodService.create(createFoodDto);
  }

  @Get('findallFood')
  findAll() {
    return this.foodService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFoodDto: UpdateFoodDto) {
    return this.foodService.update(+id, updateFoodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodService.remove(+id);
  }
}
