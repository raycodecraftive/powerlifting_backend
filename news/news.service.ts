import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

@Injectable()
export class NewsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(CreateNewsDto: CreateNewsDto) {
    return await this.prisma.news.create({
      data: CreateNewsDto,
    });
  }

  async findAll() {
    return await this.prisma.news.findMany({
      orderBy: { createdAt: 'desc'},
    });
  }

  async findOne(id: string) {
    const news = await this.prisma.news.findUnique({ where: { id } });
    if(!news) throw new NotFoundException('News not found');
    return news;
  }

  async update(id: string, updateNewsDto: UpdateNewsDto) {
    return await this.prisma.news.update({
      where: { id },
      data: updateNewsDto
    });
  }

  async remove(id: string) {
    return await this.prisma.news.delete({
      where: { id }
    });
  }
}
