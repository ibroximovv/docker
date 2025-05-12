import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, Max, Min } from "class-validator";

export class CreateAuthorDto {
    @ApiProperty({ example: 'Kimdir' })
    @IsString()
    name: string

    @ApiProperty({ example: 'photo.png' })
    @IsOptional()
    @IsString()
    photo?: string

    @ApiProperty({ example: 1990 })
    @IsInt()
    @Min(1900)
    @Max(2100)
    year: number
}
