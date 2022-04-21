import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  // beforeEach > beforeAll: 테스트 실행마다 app을 생성하는게 아닌 한 번만 생성할 수 있게끔 변경

  // 다시 이해하기로는 Each는 각각의 it()을 실행할 떄 마다 app을 생성하는거고,
  // All은 npm run test:e2e 요청 시 한번 만들어 놓고 it()실행 시에는 이미 생성한 app에서 모든 라우터들이 실행됨
  // 그래서 it() 요청마다 movie를 만들어주지 않아도 되는거지
  // beforeEach로 바꿔서 테스트 실행하니까 getAll 과 create만 테스트 통과하고 나머지 개별 조회 및 업데이트 삭제는 테스트 통과 못했네! 속 시원...
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // 실제 환경과 동일한 application을 만들어줄 수 있게끔 설정해야함
    // 이것이 /movies/1로 url 파라미터를 넘겼을 때 404에러가 난 이유다.
    // >> 자동 형변환을 해주지 않았기 떄문에 1파라미터가 string으로 함수에 전달되었고
    // entity의 id는 number타입이기 떄문에 string으로는 조회 및 삭제가 되지 않았던 것... 두둥
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // 데코레이터 없는건 통과 못함
        forbidNonWhitelisted: true, //whitelist에서 통과 못한 속성이 있으면 request 거부
        transform: true, // 타입 형변환
      }),
    ); // dto 유효성 검사
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my Movie API');
  });

  describe('/movies', () => {
    it('(GET)', () => {
      return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
    }); // it('(GET)')
    it('(POST)', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'insert Test',
          year: 2000,
          genres: ['test'],
        })
        .expect(201);
    }); // it('(POST)')

    it('POST 400', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'insert Test',
          year: 2000,
          genres: ['test'],
          others: 'bad parameters',
        })
        .expect(400);
    }); // it('(POST 400)')
    it('(DELETE)', () => {
      return request(app.getHttpServer()).delete('/movies').expect(404); // id parameter 어떻게 전달하노..? >> #4.1강의, 실제 환경과 동일한 테스트 applictaion 생성해주기.(url 파라미터 형변환)
    }); // it('(DELETE)')
  }); // describe('/movies')

  describe('/movies/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer()).get('/movies/1').expect(200);
    });
    it('GET 404', () => {
      return request(app.getHttpServer()).get('/movies/99').expect(404);
    });
    it('PATCH 200', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({ title: 'update Test' })
        .expect(200);
    });
    it('DELETE 200', () => {
      return request(app.getHttpServer()).delete('/movies/1').expect(200);
    });
    it('PATCH 404', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({ title: 'update Test' })
        .expect(404);
    });
  });
});
