import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  const mocckUserService = {
    create: jest.fn((dto) => {
      return {
        id: +1,
        ...dto,
      };
    }),
    update: jest
      .fn((id, dto) => ({
        id,
        ...dto,
      }))
      .mockImplementation((id, dto) => ({
        id,
        ...dto,
      })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mocckUserService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  //Create user
  it('should create a user', () => {
    let dto = {
      full_name: 'Pedro',
      email: 'pedro@gmail.com',
      password: 'admin123',
    };

    expect(controller.create(dto)).toEqual({
      id: expect.any(Number),
      full_name: dto.full_name,
      email: dto.email,
      password: dto.password,
    });

    expect(mocckUserService.create).toHaveBeenCalledWith(dto);
  });


  

  // Update user
  it('should updated user', () => {
    let dto = {
      full_name: 'Pedro',
      email: 'pedro@gmail.com',
      password: 'admin123',
    };

    expect(controller.update(1, dto)).toEqual({
      id: 1,
      ...dto,
    });

    expect(mocckUserService.update).toHaveBeenCalled();
  });
});
