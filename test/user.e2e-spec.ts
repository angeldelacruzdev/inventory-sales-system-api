import { UserRepository } from '../src/data/repositories/users.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersModule } from './../src/users/users.module';

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('UsersContorller (e2e)', () => {
  let app: INestApplication;

  const mockUserRepository = {
    findAll: jest.fn().mockImplementation(() => Promise.resolve({})) ,

  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(getRepositoryToken(UserRepository))
      .useValue(mockUserRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer()).get('/users').expect(200);
  });
});
