import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([User])//hace que me genere la tabla que le estamos proporcionando en la entity, se genera en la db.
  ],
  controllers: [UsersController],
  providers: [UsersService],
  //exportamos el modulo de usersservice para que otro modulo lo pueda usar
  exports: [UsersService]
})
export class UsersModule {}
