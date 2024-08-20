import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatRoom, ChatRoomDocument } from './chat-room.schema';

@Injectable()
export class ChatRoomService {
  constructor(@InjectModel(ChatRoom.name) private chatRoomModel: Model<ChatRoomDocument>) {}

  async create(name: string): Promise<ChatRoom> {
    const createdChatRoom = new this.chatRoomModel({ name });
    return createdChatRoom.save();
  }

  async findAll(): Promise<ChatRoom[]> {
    return this.chatRoomModel.find().exec();
  }
}
