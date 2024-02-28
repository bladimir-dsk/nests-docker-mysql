import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ){}

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto);
  }

  //creamos un metodo para que me busque el usuario en la base de datos
  findOneByEmail(email: string) {
    return this.usersRepository.findOneBy({email});
  }
  //buscar por email con password
  //metodo que busca el email para que me traiga los daemas datos del usuario
  finByEmailWithPassword(email: string) {
    return this.usersRepository.findOne({
    where: {email}, 
    select: ['id', 'name', 'email', 'password', 'role'],
      
    } );
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({id});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
