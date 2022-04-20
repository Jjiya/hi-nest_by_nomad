import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  } //end getAll()

  getOne(id: string): Movie {
    const movie = this.movies.find((movie) => movie.id === +id);

    if (!movie) {
      throw new NotFoundException(`Sorry. Movie with ID ${id} not found.`);
    }

    return movie;
    // filter는 id와 일치하는 Movie 한개만 찾는 것이 아니라 해당 조건을 만족하는 Movie 배열을 return하는거라 에러가 났던 것...
    // return 값을 Movie[]로 하면 에러는 안나지만 getOne의 취지와 맞지 않음!
    // return this.movies.filter((movie) => movie.id === +id);
  } //end getOne()

  deleteOne(id: string) {
    this.getOne(id); // getOne 실행 후 해당 id를 가진 movie가 없으면 notFound 예외 발생됨. 고로 아래 코드는 실행 안됨
    this.movies = this.movies.filter( movie => movie.id !== +id );
  } //end deleteOne()

  create(movieData) {
    this.movies.push({
      id: this.movies.length + 1, //this.movies.length++ 하니까 null 배열이 생김... why?
      ...movieData,
    });
  } //end create()

  update(id: string, updateData) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({ ...movie, ...updateData });
  }
}
