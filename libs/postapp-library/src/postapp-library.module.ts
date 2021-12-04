import { Module } from '@nestjs/common';
import { PostappLibraryService } from './postapp-library.service';

@Module({
  providers: [PostappLibraryService],
  exports: [PostappLibraryService],
})
export class PostappLibraryModule {}
