import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";

export class RegisterDto{

    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(1)
    name:string;


    @IsEmail()
    email:string;


    //transform nos sirve para validar que no envien espacios en blanco
    @Transform(({value}) => value.trim()) //el value.trim limpia los caracteres en blanco
    @IsString()
    @MinLength(6)
    password:string;
}