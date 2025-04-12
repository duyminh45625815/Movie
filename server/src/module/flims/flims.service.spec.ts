import { Test, TestingModule } from '@nestjs/testing';
import { FlimsService } from './flims.service';

describe('FlimsService', () => {
  let service: FlimsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlimsService],
    }).compile();

    service = module.get<FlimsService>(FlimsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
