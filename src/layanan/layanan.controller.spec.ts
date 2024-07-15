import { Test, TestingModule } from '@nestjs/testing';
import { LayananController } from './layanan.controller';
import { LayananService } from './layanan.service';

describe('LayananController', () => {
  let controller: LayananController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LayananController],
      providers: [LayananService],
    }).compile();

    controller = module.get<LayananController>(LayananController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
