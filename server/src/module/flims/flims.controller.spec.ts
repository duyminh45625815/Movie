import { Test, TestingModule } from '@nestjs/testing';
import { FlimsController } from './flims.controller';
import { FlimsService } from './flims.service';

describe('FlimsController', () => {
  let controller: FlimsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlimsController],
      providers: [FlimsService],
    }).compile();

    controller = module.get<FlimsController>(FlimsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
