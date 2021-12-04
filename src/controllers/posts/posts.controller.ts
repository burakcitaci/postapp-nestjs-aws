import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DynamoDbObject } from 'src/repositories/dynamoDb.object';
import { PostModel } from './post.interface';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get()
  async getPosts(): Promise<Observable<Array<PostModel>>> {
    return await this.postService.getAllPosts();
  }

  @Get(':postId')
  async getPostByID(@Param() params): Promise<Observable<DynamoDbObject>> {
    const post = await this.postService.getPostById(params.postId);
    //post.subscribe((re) => console.log((re as PostModel).body));
    return post;
  }

  @Post('/addPost')
  async postUserDb(@Body() post: PostModel) {
    await this.postService.addPostToDB(post);
    //console.log(user);
  }
}
