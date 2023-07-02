import { IsNotEmpty, IsString } from "class-validator";

export class ProductUserDto {

    @IsNotEmpty()
    userId: number;

    @IsString()
    username: string;

    @IsString()
    password: string;

}

