import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { PostModel } from './post.interface';
//import * as AWS from 'aws-sdk';
//import { v4 as uuid } from 'uuid';
import { DynamoDbRepository } from 'src/repositories/dynamoDb.repository';
import { DynamoDbObject } from 'src/repositories/dynamoDb.object';

//const dynamoDB = new AWS.DynamoDB.DocumentClient();

@Injectable()
export class PostsService {
  constructor(
    private httpService: HttpService,
    private dbRepository: DynamoDbRepository,
  ) {
    this.dbRepository.DYNAMODB_TABLE_NAME = process.env.POSTS_TABLE_NAME;
  }

  async getPostById(postId: number): Promise<Observable<DynamoDbObject>> {
    return this.httpService
      .get<DynamoDbObject>(
        'https://jsonplaceholder.typicode.com/posts/' + postId,
      )
      .pipe(map((axiosResponse) => axiosResponse.data));
  }

  async getAllPosts(): Promise<Observable<Array<PostModel>>> {
    return this.httpService
      .get<PostModel[]>('https://jsonplaceholder.typicode.com/posts')
      .pipe(map((axiosResponse) => axiosResponse.data));
  }

  async addPostToDB(post: DynamoDbObject): Promise<any> {
    return await this.dbRepository.addDbObjectToDB(post);
    /*console.log(post);
    {
      const postDb = {
        id: uuid(),
        postId: post.id,
      };
      try {
        await dynamoDB
          .put({
            TableName: process.env.POSTS_TABLE_NAME,
            Item: postDb,
          })
          .promise();
      } catch (error) {
        throw new InternalServerErrorException(error);
      }
      return postDb;
    }*/
    //await this.dbRepository.createUserDB(post);
  }

  async getPostByIdDB(id: string): Promise<Observable<DynamoDbObject>> {
    /*let post;
    try {
      const result = await dynamoDB
        .get({
          TableName: process.env.POSTS_TABLE_NAME,
          Key: { id },
        })
        .promise();
      post = result.Item.postObj as Observable<DynamoDbObject>;
      //console.log('db ' + user.obj.name);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    return post;*/
    return await this.dbRepository.getDbObjectByIdDB(id);
  }
}
