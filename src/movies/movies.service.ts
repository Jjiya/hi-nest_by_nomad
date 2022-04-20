import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  } //end getAll()

  getOne(id: string): Movie {
    return this.movies.find((movie) => movie.id === +id);
    // filter는 id와 일치하는 Movie 한개만 찾는 것이 아니라 해당 조건을 만족하는 Movie 배열을 return하는거라 에러가 났던 것...
    // return 값을 Movie[]로 하면 에러는 안나지만 getOne의 취지와 맞지 않음!
    // return this.movies.filter((movie) => movie.id === +id);
  } //end getOne()

  deleteOne(id: string): boolean {
    const deleteResult: Movie[] = this.movies.filter( movie => movie.id !== +id );

    if (deleteResult.length < this.movies.length) {
      this.movies = deleteResult;
      return true;
    } else {
      return false;
    }
    /* 원래 코드는
    this.movies.filter((movie) => movie.id !== +id);
    return true;
    이거였는데 확실히 삭제 했는지 안했는지 알 길이 없어서 걍 추가함
  */
  } //end deleteOne()

  create(movieData) {
    this.movies.push({
      id: this.movies.length + 1, //this.movies.length++ 하니까 null 배열이 생김... why?
      ...movieData,
    });
  } //end create()
}
