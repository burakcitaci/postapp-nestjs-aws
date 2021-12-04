import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from './user.interface';
import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { DynamoDbRepository } from 'src/repositories/dynamoDb.repository';
import { DynamoDbObject } from 'src/repositories/dynamoDb.object';
const dynamoDB = new AWS.DynamoDB.DocumentClient();

@Injectable()
export class UsersService {
  public user!: User;

  constructor(
    private httpService: HttpService,
    private dbRepository: DynamoDbRepository,
  ) {
    this.dbRepository.DYNAMODB_TABLE_NAME = process.env.USERS_TABLE_NAME;
  }

  async getUserById(userId: number): Promise<Observable<DynamoDbObject>> {
    //await this.getUserByIdDB('');
    /*const user = this.httpService
      .get<User>('https://jsonplaceholder.typicode.com/users/' + userId)
      .pipe(map((axiosResponse) => (this.user = axiosResponse.data)));
    await this.createUser(user);*/
    const user = await this.dbRepository.getDbObjectByIdDB(userId + '');
    return user;
  }

  async createUserDB(dto: DynamoDbObject): Promise<any> {
    await this.dbRepository.addDbObjectToDB(dto);
  }

  async getUserByIdDB(id: string): Promise<Observable<DynamoDbObject>> {
    return await this.dbRepository.getDbObjectByIdDB(id);
  }
}
