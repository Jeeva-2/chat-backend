import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(nickname: string): Promise<User> {
    const createdUser = new this.userModel({ nickname });
    return createdUser.save();
  }

  async findById(userId: string): Promise<User> {
    return this.userModel.findById(userId).exec();
  }
}
