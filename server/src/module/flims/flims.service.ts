  import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
  import { CreateFlimDto } from './dto/create-flim.dto';
  import { UpdateFlimDto } from './dto/update-flim.dto';
  import { FilmsProp } from './responsitories/responsitory-sericeFilms';

export const FILM_TOKEN = "FILMS-RESPONSITORY"

  @Injectable()
  export class FlimsService {
    constructor( 
      @Inject(FILM_TOKEN) 
      private readonly filmsResponsitory : FilmsProp ){}



    /**
 * Creates a new film.
 * @param {CreateFlimDto} createFlimDto - Data to create the film.
 * @returns {Promise<Flim>} - The newly created film.
 * @throws {BadRequestException} - If a film with the same title already exists.
 * @throws {Error} - If an unexpected error occurs.
 * 
 * Steps:
 * 1. Checks if a film with the same title already exists.
 * 2. If the film exists, throws a BadRequestException.
 * 3. Creates a new film with the provided data.
 * 4. Returns the created film.
 */
  async create(createFlimDto: CreateFlimDto) {
      try {
        await this.filmsResponsitory.checkFilmExists(createFlimDto.title);
        const createFlim = await this.filmsResponsitory.create(createFlimDto)
        return createFlim;
      } catch (error) {
        throw new Error(error.message);
      }
    }





 /**
 * Retrieves all films from the database.
 * @returns {Promise<{ results: Flim[] }>} - List of all films.
 * @throws {Error} - If no films are found.
 * 
 * Steps:
 * 1. Finds all films in the database.
 * 2. If no films are found, throws an error.
 * 3. Returns the list of films.
 */
    async findAll() {
      const results = await this.filmsResponsitory.findAll()
      return results;
    }




    /**
 * Finds a film by its ID.
 * @param {string} id - The ID of the film to find.
 * @returns {Promise<Flim>} - The found film.
 * @throws {NotFoundException} - If the film is not found.
 * 
 * Steps:
 * 1. Finds the film by ID in the database.
 * 2. If the film is not found, throws a NotFoundException.
 * 3. Returns the film.
 */
    async findOne(id: string) {
    return this.filmsResponsitory.findOne(id);
    }







    /**
 * Updates a film by its ID.
 * @param {string} id - The ID of the film to update.
 * @param {UpdateFlimDto} updateFilmDto - Data to update the film.
 * @returns {Promise<Flim>} - The updated film.
 * @throws {NotFoundException} - If the film is not found.
 * 
 * Steps:
 * 1. Finds the film by ID and updates it with the provided data.
 * 2. If the film is not found, throws a NotFoundException.
 * 3. Returns the updated film.
 */
    async update(id: string, updateFilmDto: UpdateFlimDto) {
      return  await this.filmsResponsitory.update(id,updateFilmDto,) 
  }











  /**
 * Deletes a film by its ID.
 * @param {string} id - The ID of the film to delete.
 * @returns {Promise<{ message: string, deletedFlim: Flim }>} - A success message and the deleted film.
 * @throws {NotFoundException} - If the film is not found.
 * 
 * Steps:
 * 1. Finds the film by ID and deletes it.
 * 2. If the film is not found, throws a NotFoundException.
 * 3. Returns a success message and the deleted film.
 */
    async remove(id: string) {
     return this.filmsResponsitory.remove(id);
    }








    /**
 * Checks if a film with the given title already exists.
 * @param {string} title - The title of the film to check.
 * @returns {Promise<boolean>} - True if the film exists, otherwise false.
 * 
 * Steps:
 * 1. Finds a film with the provided title in the database.
 * 2. Returns true if the film exists, otherwise false.
 */
    async checkFlimexitst(title: string): Promise<boolean> {
      return await this.filmsResponsitory.checkFilmExists(title)
    }
    
  }
