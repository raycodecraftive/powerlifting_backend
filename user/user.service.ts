import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class UserProfileService {
  constructor(private prisma: PrismaService) {}

  // Create a new User
  async createUser(data: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phoneNumber: string;
    password: string;
  }) {
    // Check if the user already exists by email or username
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: data.email },
          { username: data.username },
          { phoneNumber: data.phoneNumber }
        ]
      }
    });

    if (existingUser) {
      throw new ConflictException('User with the same email, username, or phone number already exists');
    }

    // Create the user in the database
    const newUser = await this.prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password, // Make sure to hash the password before saving
      },
    });

    return newUser;
  }

  // Get User Profile
  async getUserProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, firstName: true, lastName: true, email: true, phoneNumber: true },
    });

    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  // Update User Profile
  async updateUserProfile(userId: string, data: { firstName?: string; lastName?: string; phoneNumber?: string }) {
    return await this.prisma.user.update({
      where: { id: userId },
      data,
    });
  }
}
