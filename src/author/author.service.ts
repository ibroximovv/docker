import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthorService {
  constructor(private readonly prisma: PrismaService){}
  async create(createAuthorDto: CreateAuthorDto) {
    try {
      const findone = await this.prisma.author.findFirst({ where: { name: createAuthorDto.name }})
      if (findone) throw new BadRequestException('author already esists')
      return await this.prisma.author.create({ data: createAuthorDto })
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException(error.message || 'Internal server error')
    }
  }

  async findAll() {
    try {
      return await this.prisma.author.findMany();
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException(error.message || 'Internal server error')
    }
  }

  async findOne(id: number) {
    try {
      const findone = await this.prisma.author.findFirst({ where: { id } })
      if (!findone) throw new BadRequestException('Author not found')
      return findone;
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException(error.message || 'Internal server error')
    }
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    try {
      const findone = await this.prisma.author.findFirst({ where: { id } })
      if (!findone) throw new BadRequestException('Author not found')
      return await this.prisma.author.update({ where: { id }, data: updateAuthorDto });
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException(error.message || 'Internal server error')
    }
  }

  async remove(id: number) {
    try {
      const findone = await this.prisma.author.findFirst({ where: { id } })
      if (!findone) throw new BadRequestException('Author not found')
      return await this.prisma.author.delete({ where: { id }});
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException(error.message || 'Internal server error')
    }
  }
}
