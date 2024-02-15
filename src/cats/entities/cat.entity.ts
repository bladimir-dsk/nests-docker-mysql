import { Breed } from "src/breeds/entities/breed.entity";
import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

}
