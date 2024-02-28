import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../../common/enums/rol.enum';


@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean{
    //atraves de reflector podemos leer el metadata que nos estan enviando desde el controller
    //getallandoverride <Role> lo que devuelve es de tipo role del enum
    const role = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if (!role) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    //con esta condiccion le decimos que los roles de user los administradores pondran entrar sin problema
    if(user.role === Role.ADMIN) {
      return true;
    }

    return role === user.role;
  }
}
