import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  // 테스트 실행 전 아래 코드 수행
  // 테스트 별 공통적으로 존재하는 로직(ex. 영화 데이터 생성)이 있다면 아래에 기술
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // afterAll: 테스트를 끝난 후 진행할 로직 ex) 데이터 베이스 삭제 등
  // 이 외에도 다양한 함수가 존재

  // getAll() 테스트
  describe('getAll', () => {
    // return이 array 타입인지.
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  }); // describe('getAll')

  describe('getOne', () => {
    it('should return a movie', () => {
      const id = service.create({ title: 'test', year: 2000, genres: ['test'] });

      const result = service.getOne(id);
      expect(result).toBeDefined();
      expect(result.id).toEqual(id);
    });

    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual('Sorry. Movie with ID 999 not found.');
      }
    });
  }); // describe('getOne')

  describe('deleteOne', () => {
    it('delete a movie', () => {
      const id = service.create({ title: 'test', year: 2000, genres: ['test'] });
      // 강의 내용
      const beforeDeleteLength = service.getAll().length;

      service.deleteOne(id);

      const afterDeleteMovieLength = service.getAll().length;

      expect(afterDeleteMovieLength).toBeLessThan(beforeDeleteLength);

      // 강의 전 혼자 테스트 한 내용
      /*
      try {
        expect(service.getOne(id)).toBeDefined();

        service.deleteOne(id);
        service.getOne(id);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
      */
    });

    it('should throw 404 error', () => {
      try {
        service.deleteOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual('Sorry. Movie with ID 999 not found.');
      }
    });
  }); // describe('deleteOne')

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;

      service.create({ title: 'test', year: 2000, genres: ['test'] });

      const afterCreate = service.getAll().length;

      expect(afterCreate).toBeGreaterThan(beforeCreate);

      // 강의 전 혼자 테스트 한 내용
      /*
      const movieData = { title: 'test', year: 2000, genres: ['test'] };
      try {
        const id = service.create({ ...movieData });

        const movie = service.getOne(id);

        expect(movie.title).toEqual(movieData.title);
      } catch (error) {
        expect(error).toBeUndefined();
      }
      */
    });
  }); // describe('create')

  describe('update', () => {
    it('should update a movie', () => {
      const id = service.create({ title: 'test', year: 2000, genres: ['test'] });

      service.update(id, { title: 'Update Test' });

      const movie = service.getOne(id);

      expect(movie.title).toEqual('Update Test');
    });

    it('should throw a NotFoundException', () => {
      try {
        service.update(999, { title: 'Update Test' });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual('Sorry. Movie with ID 999 not found.');
      }
    });
  });
}); // describe('MoviesService')
