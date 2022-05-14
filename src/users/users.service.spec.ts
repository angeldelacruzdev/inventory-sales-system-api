import { UserRepository } from './../repositories/users.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';

const mockRepository = {
  create: jest.fn().mockImplementation((dto) => dto),
  saveOne: jest
    .fn()
    .mockImplementation((user) => Promise.resolve({ id: +1, ...user })),
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserRepository),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user record and return that', async () => {
    let dto = {
      full_name: 'Pedro',
      email: 'pedro@gmail.com',
      password: 'admin123',
    };

    expect(await service.create(dto)).toEqual({
      id: expect.any(Number),
      ...dto,
    });
  });
});
