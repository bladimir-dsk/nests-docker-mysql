import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from "./guard/auth.guard";
import { Request } from "express";
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guard/roles.guard';
import { Role } from '../common/enums/rol.enum';
import { Auth } from './decorators/auth.decorator';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';

//creamos una interfaz para poner el reques del profile y extender el reques
interface RequestWithUser extends Request {
    user: { 
        email: string,
        role: string
    }
}

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }


    @Post('register')//registramos un usuario
    register(
        @Body()
        registerDto: RegisterDto
    ){
        return this.authService.register(registerDto)
    }
    @Post('login')//generamos el token de acceso del usuario
    login(
        @Body()
        loginDto: LoginDto
    ){
        return this.authService.login(loginDto)
    }

    // @Get('profile')// ruta que nos da acceso dependiendo del rol
    // @Roles(Role.ADMIN)//Role viene del enum
    // @UseGuards(AuthGuard, RolesGuard)
    // profile(@Req() req: RequestWithUser) {
    // return this.authService.profile(req.user)
    // }


    @Get('profile')// ruta que nos da acceso dependiendo del rol
    @Auth(Role.USER)//auth es un decorador que une los guards y los roles
    profile(@ActiveUser() user: UserActiveInterface) {
    return this.authService.profile(user)
    }

}
