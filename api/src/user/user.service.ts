import { Injectable } from "@nestjs/common";
import { User } from "generated/prisma";
import { RegisterDTO } from "src/auth/dto/register.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  // helps finding a single user by email
  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: email,
      },
    });

    return user;
  }

  // create user
  async createUser(registerDTO: RegisterDTO): Promise<User | null> {
    const createdUser = await this.prismaService.user.create({
      data: {
        name: registerDTO.name,
        email: registerDTO.email,
        hashedPassword: registerDTO.password,
      },
    });
    return createdUser;
  }
}
