import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './controllers/users/users.service';
import { PostsModule } from './controllers/posts/posts.module';
import { HttpModule } from '@nestjs/axios';
import { CommentsController } from './controllers/comments/comments.controller';
import { CommentsService } from './controllers/comments/comments.service';
import { DynamoDbRepository } from './repositories/dynamoDb.repository';

@Module({
  imports: [PostsModule, HttpModule],
  controllers: [AppController, UsersController, CommentsController],
  providers: [AppService, UsersService, CommentsService, DynamoDbRepository],
})
export class AppModule {}
