import { InjectModel } from "@nestjs/mongoose";
import { Flim } from "../schemas/flim.schema";
import { Model } from "mongoose";
import { Injectable, NotFoundException } from "@nestjs/common";

export interface FilmsProp {
  create(createFlimDto: any): Promise<Flim>;
  findOne(id: string);
  findAll();
  remove(id:string)
  update(id: string, updateFlimDto: any);
  checkFilmExists(title: string): Promise<boolean>;
}
      



export  class FilmsImplementation implements FilmsProp {
   constructor(@InjectModel(Flim.name) private flimModel : Model<Flim> ){}
    async create(createFlimDto:any):Promise<Flim> {
      
            const createFlim = await this.flimModel.create({
                title:createFlimDto.title,
                age: createFlimDto.age,
                timeLength:createFlimDto.timeLength,
                year: createFlimDto.year,
                onStage:createFlimDto.onStage,
                description:createFlimDto.description,
                image:createFlimDto.image,
              })
              return createFlim;
    }

    async findOne(id: string)  {
        // Implement findOne logic here
        const flim = await this.flimModel.findById(id).exec();
        if (!flim) {
          throw new NotFoundException(`not found with ID: ${id}`);
        }
        return flim;
    }

    async findAll() {
        // Implement findAll logic here
        const results = await this.flimModel
        .find()
        if (!results) {
          throw new Error('Movie not found');
        }
      return {results};
    }

    async update(id: string,updateFilmDto:any) {
        // Implement update logic here
        const updatedFilm = await this.flimModel.findByIdAndUpdate(
            id,
            updateFilmDto,
            { new: true }
        ).exec();
  
        if (!updatedFilm) {
            throw new NotFoundException(`Không tìm thấy phim để cập nhật với id: ${id}`);
        }
        return updatedFilm;
    }

    async checkFilmExists(title: string){
        const flim = await this.flimModel.findOne({ title }).exec();
      return flim !== null;
    }
    async remove(id: string) {
        const deletedFlim = await this.flimModel.findByIdAndDelete(id).exec();
        if (!deletedFlim) {
          throw new NotFoundException(`Not found with ID : ${id}`);
        }
        return { message: 'Deleted', deletedFlim };
    }
}