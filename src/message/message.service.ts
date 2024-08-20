import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Message, MessageDocument } from './message.schema';
import { User, UserDocument } from '../user/user.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) { }

  async create(
    userId: string,
    roomId: string,
    message: string,
  ): Promise<Message> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      return null;
    }
    const createdMessage = new this.messageModel({ userId, roomId, message });
    return createdMessage.save();
  }

  async findByRoomId(roomId: string) {
    const messages = await this.messageModel.find({ roomId }).exec();

    const messagesWithUsernames = await Promise.all(
      messages.map(async (message) => {
        let userObjectId;
        try {
          userObjectId = new Types.ObjectId(message.userId); // Convert userId to ObjectId using 'new'
        } catch (error) {
          console.error(`Invalid userId: ${message.userId}`);
          userObjectId = null;
        }

        let username = 'Unknown';
        if (userObjectId) {
          const user = await this.userModel.findById(userObjectId).exec();
          if (user) {
            username = user.nickname; // Assume the User schema has a username field
          }
        }

        return {
          ...message.toObject(),
          username,
        };
      }),
    );

    console.log("🚀 ~ MessageService ~ findByRoomId ~ messagesWithUsernames:", messagesWithUsernames);

    return messagesWithUsernames;
  }
}
