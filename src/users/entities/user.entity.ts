//no usemos el src/../commo.....-- usaremos de manejar puras rutas relativas usando el ../../coommon
import { Role } from "../../common/enums/rol.enum";
import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    //el unique en el amail tiene que ser unico
    // el nullable quiere decir que ese campo no puede estar vacio
    @Column({unique: true, nullable: false})
    email: string;

    //select: false es para que no se muestre en la respuesta de la peticion, en este caso no devuelve el resultado del password
    @Column({nullable: false, select: false})
    password: string;

    //es de tipo enum 
    //el rol por defecto lo va a guardar como user
    @Column({ type: 'enum', default: Role.USER, enum: Role})//tipamos enum para que solo pueda resivir los tipos de roles del enum
    role:  Role;

    //deletedatecolumn es para hacer eliminaciones logicas y no fisicas en la base de datos
    @DeleteDateColumn()
    deletedAt: Date;

    


}
