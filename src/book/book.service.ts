import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateAuthorDto } from 'src/author/dto/update-author.dto';

@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService){}
  async create(createBookDto: CreateBookDto) {
    try {
      const findauthor = await this.prisma.author.findFirst({ where: { id: createBookDto.authorId }})
      if (!findauthor) throw new BadRequestException('Author not found')
      const findone = await this.prisma.book.findFirst({ where: {
        AND: [
          { name: createBookDto.name },
          { authorId: createBookDto.authorId }
        ]
      }})
      if (findone) throw new BadRequestException('Book already exists')
      return await this.prisma.book.create({ data: createBookDto });
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException(error.message || 'INternal server error')
    }
  }

  async findAll() {
    try {
      return await this.prisma.book.findMany({
        include: {
          Author: {
            select: {
              id: true,
              name: true
            }
          }
        },
        omit: {
          authorId: true
        }
      });
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException(error.message || 'INternal server error')
    }
  }

  async findOne(id: number) {
    try {
      const findone = await this.prisma.book.findFirst({ where: { id },
        include: {
          Author: {
            select: {
              id: true,
              name: true
            }
          }
        },
        omit: {
          authorId: true
        }
      })
      if (!findone) throw new BadRequestException('Book not found')
      return findone;
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException(error.message || 'INternal server error')
    }
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    try {
      const findone = await this.prisma.book.findFirst({ where: { id }})
      if (!findone) throw new BadRequestException('Book not found')
      
      const findauthor = await this.prisma.author.findFirst({ where: { id: findone.authorId }})
      if (!findauthor) throw new BadRequestException('Author not found')
      const find = await this.prisma.book.findFirst({ where: {
        AND: [
          { name: updateBookDto.name },
          { authorId: updateBookDto.authorId }
        ]
      }})
      if (find) throw new BadRequestException('Book already exists')
      
      return await this.prisma.book.update({ where: { id }, data: updateBookDto });
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException(error.message || 'INternal server error')
    }
  }

  async remove(id: number) {
    try {
      const findone = await this.prisma.book.findFirst({ where: { id }})
      if (!findone) throw new BadRequestException('Book not found')
      return await this.prisma.book.delete({ where: { id }});
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException(error.message || 'INternal server error')
    }
  }
}
