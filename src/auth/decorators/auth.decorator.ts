import { UseGuards, applyDecorators } from "@nestjs/common";
import { Role } from "../../common/enums/rol.enum";
import { RolesGuard } from "../guard/roles.guard";
import { AuthGuard } from "../guard/auth.guard";
import { Roles } from './roles.decorator';


export function Auth(role: Role){
    //el aplydecorators nos junta mas de un decorador
    return applyDecorators(
        Roles(role),
        UseGuards(AuthGuard, RolesGuard)
    )
}