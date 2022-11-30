import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {

  constructor(private readonly usersRepository: UsersRepository) {}

  async create(name: string,  email: string, nickname: string): Promise<User> {
    return this.usersRepository.create({
      name, email, nickname, favoriteGroups: []
    });
  }

  async findAll() {
    return this.usersRepository.find({});
  }

  async findOne(id: string) {
    return this.usersRepository.findOne({_id: id})
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersRepository.findOneAndUpdate({_id: id}, updateUserDto);
  }

  /*async remove(id: string) {
    return this.userModel.deleteOne({_id: id});
  }*/
}
