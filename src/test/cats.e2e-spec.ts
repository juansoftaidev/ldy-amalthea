import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { CatsModule } from '../cats/cats.module';
import { CatsService } from '../cats/cats.service';
import { INestApplication } from '@nestjs/common';

describe('Cats', () => {
  let app: INestApplication;
  let catsService = {
    findAll: () => ['test'],
    findOne: (id: number) => (id === 1 ? { id: 1, name: 'Tom' } : null),
    create: (cat) => ({ id: 1, ...cat }),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CatsModule],
    })
      .overrideProvider(CatsService)
      .useValue(catsService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET cats`, () => {
    return request(app.getHttpServer())
      .get('/cats')
      .expect(200)
      .expect({
        data: catsService.findAll(),
      });
  });

  it(`/GET cats/:id`, () => {
    return request(app.getHttpServer())
      .get('/cats/1')
      .expect(200)
      .expect({
        id: 1,
        name: 'Tom',
      });
  });

  it(`/GET cats/:id (not found)`, () => {
    return request(app.getHttpServer())
      .get('/cats/2')
      .expect(404);
  });

  it(`/POST cats`, () => {
    const newCat = { name: 'Whiskers' };
    return request(app.getHttpServer())
      .post('/cats')
      .send(newCat)
      .expect(201)
      .expect({
        id: 1,
        ...newCat,
      });
  });

  it(`/POST cats (validation error)`, () => {
    return request(app.getHttpServer())
      .post('/cats')
      .send({}) // Sending an empty object to trigger validation error
      .expect(400);
  });

  afterAll(async () => {
    await app.close();
  });
});