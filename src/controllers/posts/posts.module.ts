import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { DynamoDbRepository } from 'src/repositories/dynamoDb.repository';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [HttpModule],
  providers: [PostsService, DynamoDbRepository],
  controllers: [PostsController],
  exports: [PostsService, DynamoDbRepository],
})
export class PostsModule {}
