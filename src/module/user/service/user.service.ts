import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from '../dto/user.dto';
import { User } from '../model/user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async save(userDto: UserDto): Promise<User> {
    const user = new this.userModel({ ...userDto });
    return await user.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }
}
