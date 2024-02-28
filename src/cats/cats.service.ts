import { Breed } from './../breeds/entities/breed.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';
import { Role } from '../common/enums/rol.enum';


@Injectable()
export class CatsService {

  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,


    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,

  ) {}
  async create(createCatDto: CreateCatDto, user: UserActiveInterface) {
    const breed = await this.validateBreed(createCatDto.breed);
    
    //const cat = this.catRepository.create(createCatDto);
    return await this.catRepository.save({
      ...createCatDto,
      breed,
      userEmail: user.email
    });
    
  }

  //creamos un metodo para verificar si la raza existe, esto lo agregamos en el create
  private async validateBreed(breed: string) {
    const breedEntity = await this.breedRepository.findOneBy({ name: breed });
  
    if (!breedEntity) {
      throw new BadRequestException('Breed not found');
    }
  
    return breedEntity;
  }
  
  //hacemos una condicional que busque todos los datos mientras el email coincida con el perfil del usuario
  async findAll(user: UserActiveInterface) {
    //creamos una condicion que diga si eres admin puedes ver todos los datos
    if(user.role === Role.ADMIN) {
      return await this.catRepository.find();//retornar todos los datos 
    }
    return await this.catRepository.find({
      where: {userEmail: user.email},
    }); 
  }

  async findOne(id: number, user: UserActiveInterface) {
    //hacemos la busqueda del gato por id
    const cat = await this.catRepository.findOneBy({id});
    //verificamos si el id que estamos buscando existe en la db
    if (!cat) {
      throw new BadRequestException('El gato no existe');
    } 
    
    this.validateOwnership(cat, user);
    //verificamos si es el usuario NO ES ADMIN && EL USUARIO NO COIONSIDE CON EL EMAIL REGISTRADO EN EL CAT, LE MANDAMOS UN ERROR
    // if ( user.role !== Role.ADMIN && cat.userEmail!== user.email ) {
    //   throw new BadRequestException('El gato no pertenece al usuario');
    // }
    return cat;
  }
  
  //creamos un metodo para verificacion si el usuario no es admin y que no coinsida con ningun registro de email
  private validateOwnership(cat: Cat, user: UserActiveInterface){
    if (user.role!== Role.ADMIN && cat.userEmail !== user.email) {
      throw new BadRequestException('El gato no pertenece al usuario');
    }
  }



  async update(id: number, updateCatDto: UpdateCatDto, user: UserActiveInterface) {
  await this.findOne(id, user );
  return await this.catRepository.update(id, {
    ...updateCatDto,
    breed: updateCatDto.breed ? await this.validateBreed(updateCatDto.breed) : undefined,
    userEmail: user.email,
  })
}



  async remove(id: number, user: UserActiveInterface) {
    await this.findOne(id, user);
    //usamos el softdelete para los registros eliminados logicamente, todavia existen  en la base de datos
    //en este caso solo le asignamos la fecha de cuando se elimino pero deja de aparecer en la consulta.
    return await this.catRepository.softDelete({id}); //se le pasa el id
    //return await this.catRepository.softRemove({id});//se le pasa la instancia
  }
}
