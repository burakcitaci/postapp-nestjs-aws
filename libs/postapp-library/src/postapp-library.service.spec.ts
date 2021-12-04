import { Test, TestingModule } from '@nestjs/testing';
import { PostappLibraryService } from './postapp-library.service';

describe('PostappLibraryService', () => {
  let service: PostappLibraryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostappLibraryService],
    }).compile();

    service = module.get<PostappLibraryService>(PostappLibraryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
