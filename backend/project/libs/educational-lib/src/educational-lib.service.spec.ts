import { Test, TestingModule } from '@nestjs/testing';
import { EducationalLibService } from './educational-lib.service';

describe('EducationalLibService', () => {
  let service: EducationalLibService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EducationalLibService],
    }).compile();

    service = module.get<EducationalLibService>(EducationalLibService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
