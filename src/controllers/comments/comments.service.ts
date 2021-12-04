import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { CommentModel } from './comments.interface';
import { Observable } from 'rxjs';
import { DynamoDbRepository } from 'src/repositories/dynamoDb.repository';
const dynamoDB = new AWS.DynamoDB.DocumentClient();

@Injectable()
export class CommentsService {
  constructor(private dbRepository: DynamoDbRepository) {}

  async createUserDB(dto: CommentModel): Promise<any> {
    const comment = {
      id: uuid(),
      commentId: dto.id,
      Comment: dto,
    };
    try {
      await dynamoDB
        .put({
          TableName: process.env.USERS_TABLE_NAME,
          Item: comment,
        })
        .promise();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    return comment;
  }

  async getUserByIdDB(id: string): Promise<Observable<CommentModel>> {
    let user;
    try {
      const result = await dynamoDB
        .get({
          TableName: process.env.USERS_TABLE_NAME,
          Key: { id },
        })
        .promise();
      user = result.Item.obj as Observable<CommentModel>;
      //console.log('db ' + user.obj.name);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    return user;
  }
}
