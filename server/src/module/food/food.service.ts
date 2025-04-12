import { ConflictException, Injectable } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Food } from './schemas/food.schema';
import { Model } from 'mongoose';

@Injectable()
export class FoodService {
  constructor(@InjectModel(Food.name)
  private foodModel : Model<Food>
 ){}
 async create(createFoodDto: CreateFoodDto): Promise<{ message: string | null }> {
  const checkfood = await this.foodModel.findOne({ titleFood: createFoodDto.titleFood })
  if(checkfood){
      throw new ConflictException('Title already exist');
  }
     await this.foodModel.create({
      titleFood:createFoodDto.titleFood,
      price:createFoodDto.price,
      details:createFoodDto.details,
      imageFood:createFoodDto.imageFood
    })
    return {message:"Created food"}  
  }

async findAll() {
  const res = await this.foodModel.find();
  return res;
}

  findOne(id: number) {
    return `This action returns a #${id} food`;
  }

  update(id: number, updateFoodDto: UpdateFoodDto) {
    return `This action updates a #${id} food`;
  }

  remove(id: number) {
    return `This action removes a #${id} food`;
  }
}
