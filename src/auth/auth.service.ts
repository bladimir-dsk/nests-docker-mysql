import { BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ){}
    

    //en el register resivimos el registerDto que se comporta como RegisterDto 
    async register({name,email,password}: RegisterDto) {
        
        //capturo el email y si el usuario existe le mando un error 400 bad_request
        const user = await this.usersService.findOneByEmail(email);
        if(user){
            throw new BadRequestException("Email already exists");
        }
        return await this.usersService.create({
            name,
            email,
            //bcryptjs.hash es para incryptar el password
            password: await bcryptjs.hash(password, 10)//el numero 10 es la cadena de texto que se le pondra al encryptar, es texto aleatorio.
        });
        
    }
    async login({email, password} : LoginDto){

        //captura el email, si le pone una condicion, si no existe el usuario le mostramos un error de que el usuario no existe
        const user = await this.usersService.finByEmailWithPassword(email);
        if(!user){
            throw new UnauthorizedException("Invalid email");
        }
        //verificamos que el password coincida 
        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if(!isPasswordValid){
            throw new UnauthorizedException("Invalid password");
        }
        //payload le pasamos en el token es el email
        const payload = { email: user.email, role: user.role}
        //firma
        const token = await this.jwtService.signAsync(payload);
        //retornamos el token de acceso si las credenciales son validas
        return {
            token,
            email,
        }
    }

    async profile({email, role}: {email: string, role: string}){
            //VALIDAMOS QUE EL USUARIO CUMPLA CON EL ROL DE ADMIN PARA DEJARLO INGRESAR
            //if(role !== 'admin'){
            //    throw new UnauthorizedException('NO ESTAS AUTORIZADO PARA INGRESAR, DEBES DE SER ADMIN')
           // }
        
        return await this.usersService.findOneByEmail(email);
    }
}
