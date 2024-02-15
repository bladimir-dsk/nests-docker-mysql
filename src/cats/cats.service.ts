import { Breed } from './../breeds/entities/breed.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';


@Injectable()
export class CatsService {

  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,


    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,

  ) {}
  async create(createCatDto: CreateCatDto) {
    const breed = await this.breedRepository.findOneBy({name: createCatDto.breed})
    
    if (!breed) {
      throw new BadRequestException('la raza no existe')
    }

    //const cat = this.catRepository.create(createCatDto);
    return await this.catRepository.save({
      ...createCatDto,
      breed,
    });
    
  }

  async findAll() {
    return await this.catRepository.find(); 
  }

  async findOne(id: number) {
    return await this.catRepository.findOneBy({id});
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    //return await this.catRepository.update(id, updateCatDto);
    return 
  }

  async remove(id: number) {
    //usamos el softdelete para los registros eliminados logicamente, todavia existen  en la base de datos
    //en este caso solo le asignamos la fecha de cuando se elimino pero deja de aparecer en la consulta.
    return await this.catRepository.softDelete({id}); //se le pasa el id
    //return await this.catRepository.softRemove({id});//se le pasa la instancia
  }
}
