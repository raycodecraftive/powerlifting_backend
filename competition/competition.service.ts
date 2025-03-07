import { Injectable } from '@nestjs/common';
import { CreateCompetitionDto } from './dto/create-competition.dto';
import { UpdateCompetitionDto } from './dto/update-competition.dto';
import { connect } from 'http2';

@Injectable()
export class CompetitionService {
  constructor(private prisma: PrismaService) {}
  
  async create(createCompetitionDto: CreateCompetitionDto) {
    return this.prisma.competition.create({
      data: {
        name: createCompetitionDto.name,
        location: createCompetitionDto.location,
        date: createCompetitionDto.date,
        category: createCompetitionDto.category,
      },
    });
  }

  async findAll() {
    return this.prisma.competition.findMany;
  }

  async findOne(id: string) {
    return this.prisma.competition.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateCompetitionDto: UpdateCompetitionDto) {
    return this.prisma.competition.update({
      where: { id },
      data: updateCompetitionDto,
    });
  }

  remove(id: string) {
    return this.prisma.competition.delete({
      where: { id },
    });
  }

  // Register User for Competition

  async registerUserForCompetition(userId : string , competitionId : string) {
    return this.prisma.competition.update({
      where: { id : competitionId },
      data: {
        participants: {
          connect: { id : userId }
        }
      }
    })
  }
}
