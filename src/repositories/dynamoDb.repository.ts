import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DynamoDbObject } from './dynamoDb.object';
import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { Observable } from 'rxjs';
const dynamoDB = new AWS.DynamoDB.DocumentClient();

@Injectable()
export class DynamoDbRepository {
  public DYNAMODB_TABLE_NAME: string;

  async addDbObjectToDB(dto: DynamoDbObject): Promise<any> {
    const dbOject = {
      id: uuid(),
      dbOject: dto,
    };
    try {
      await dynamoDB
        .put({
          TableName: this.DYNAMODB_TABLE_NAME,
          Item: dbOject,
        })
        .promise();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    return dbOject;
  }

  async getDbObjectByIdDB(id: string): Promise<Observable<DynamoDbObject>> {
    let post;
    try {
      const result = await dynamoDB
        .get({
          TableName: this.DYNAMODB_TABLE_NAME,
          Key: { id },
        })
        .promise();
      post = result.Item.dbOject as Observable<DynamoDbObject>;
      //console.log('db ' + user.obj.name);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    return post;
  }
}
