import { DynamoDbObject } from 'src/repositories/dynamoDb.object';

export interface PostModel extends DynamoDbObject {
  userId: number;
  title: string;
  body: string;
}
