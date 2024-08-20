import { Controller, Post, Body, Get } from '@nestjs/common';
import { ChatRoomService } from './chat-room.service';

@Controller('chatrooms')
export class ChatRoomController {
  constructor(private readonly chatRoomService: ChatRoomService) {}

  @Post()
  async create(@Body('name') name: string) {
    return this.chatRoomService.create(name);
  }

  @Get()
  async findAll() {
    return this.chatRoomService.findAll();
  }
}
