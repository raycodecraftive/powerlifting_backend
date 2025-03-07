import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDTO) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          email: dto.email,
        },
      });
      if(!user) {
        throw new BadRequestException('User not found');
      }

      const isPasswordValid = await bcrypt.compare(dto.password, user.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid password')
      }
      const accessToken = await this.jwtService.signAsync({sub: user.id});
      return { access_token : accessToken};
    
    } catch(error) {
      throw error;
    }
  }
  async registerUser(dto:RegisterDto) {
    try{
      let user exist = await this.prismaService.user.findUnique({
        where: {
          email: dto.email,
        }
      });

      if(userexist) {
        throw new BadRequestException('User already exist');
      }
      // create user
      const hashedPassword = await bcrypt.hash(dto.password, 10);
      const user = await this.prismaService.user.create({
        data: {
          email : dto.email,
          name: '${dto.firstName} ${dto.lastName}',
          password: hashedPassword
        },
      });
      delete user.password;

      // generate token
      const access_token = await this.jwtService.signAsync({ sub: user.id,})

      return {
        access_token: access_token,
      };
    
    } catch(error) {
      console.log(error);
      throw error;
    }

  }
}
