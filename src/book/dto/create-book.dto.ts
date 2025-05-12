import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsPositive, IsString } from "class-validator";

export class CreateBookDto {
    @ApiProperty({ example: 'nimadir' })
    @IsString()
    name: string

    @ApiProperty({ example: 12132 })
    @IsInt()
    @IsPositive()
    price: number

    @ApiProperty({ example: 1 })
    @IsInt()
    @IsPositive()
    authorId: number
}
