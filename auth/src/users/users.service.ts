import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';
// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {

  constructor(
    private prisma: PrismaService
  ) { }

  async create(createUserDto: CreateUserDto) {
    const saltOrRounds = 10;
    const user = this.prisma.user.create({
      data: {
        username: createUserDto.username,
        password: await bcrypt.hash(createUserDto.password, saltOrRounds),
        name: createUserDto.name,
      }
    })

    return user
  }

  async findOne(id: string): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id
      }
    });

    delete user.password

    return user
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    const user = await this.prisma.user.findFirst({
      where: {
        username: username
      }
    });

    return user
  }

  async update(id: string, updateUserDto: CreateUserDto) {
    const user = await this.prisma.user.update({
      where: {
        id: id
      },
      data: {
        ...updateUserDto
      }
    })

    return user
  }
}