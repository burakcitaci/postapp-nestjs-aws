import { DynamoDbObject } from 'src/repositories/dynamoDb.object';

export interface CommentModel extends DynamoDbObject {
  postId: number;
  name: string;
  email: string;
  body: string;
}
