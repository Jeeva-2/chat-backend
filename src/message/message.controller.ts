import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('chatrooms/:roomId/messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async create(
    @Param('roomId') roomId: string,
    @Body('userId') userId: string,
    @Body('message') message: string,
  ) {
    return this.messageService.create(userId, roomId, message);
  }

  @Get()
  async findByRoomId(@Param('roomId') roomId: string) {
    return this.messageService.findByRoomId(roomId);
  }
}
