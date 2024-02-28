import { SetMetadata } from "@nestjs/common";
import { Role } from '../../common/enums/rol.enum';


export const ROLES_KEY = 'roles';

//hacemos una importacion de una constante llamado roles
//el metadata es agregar decoradores personalizados, resive el key & value
//el role: puede ser de tipo Role que solo permita resivir esos valores del enum
export const Roles = (role: Role) => SetMetadata(ROLES_KEY, role);