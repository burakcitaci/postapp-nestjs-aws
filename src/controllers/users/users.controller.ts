import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DynamoDbObject } from 'src/repositories/dynamoDb.object';
import { User } from './user.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly appService: UsersService) {}

  @Get(':userId')
  async getHello(@Param() params): Promise<Observable<DynamoDbObject>> {
    console.log(params.userId + ' hh');
    const user = await this.appService.getUserById(params.userId);
    //console.log((await user).email);
    return user;
  }

  @Post('/createUser')
  async postUserDb(@Body() user: DynamoDbObject) {
    console.log(user);
    await this.appService.createUserDB(user);
    //console.log(user);
  }
}
