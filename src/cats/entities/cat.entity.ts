import { Breed } from "../../breeds/entities/breed.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from '../../users/entities/user.entity';

//creamos una entidad que tenga una clase exportable que se llama cat
@Entity()
export class Cat {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    age: number;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => Breed, (breed) => breed.id, {
        eager: true, //para que traiga el nombre de la raza y no solo el id cuando hagamos un finOne
    } )
    breed: Breed;

    // @ManyToOne(() => User, (user) => user.email,)
    // @JoinColumn({name: 'userEmail', referencedColumnName: 'email', })
    // user: User;

    // //creamos una columna para el email de referencedcolumn
    // @Column()
    // userEmail: string;

    

    @ManyToOne(() => User, (user) => user.email, {
        eager: true, 
    })
    user: User;

    @Column()
    userEmail: string;
}

