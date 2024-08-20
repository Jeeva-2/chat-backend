import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ChatRoomModule } from './chat-room/chat-room.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://jeevananthamm:fdQimdjN3mTP4hzY@taskcluster.nbncpc1.mongodb.net/chat-app'),
    UserModule,
    ChatRoomModule,
    MessageModule,
  ],
})
export class AppModule {}
