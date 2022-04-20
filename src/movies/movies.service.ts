import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  } //end getAll()

  getOne(id: number): Movie {
    const movie = this.movies.find(movie => movie.id === id);

    if (!movie) {
      throw new NotFoundException(`Sorry. Movie with ID ${id} not found.`);
    }

    return movie;
    // filter는 id와 일치하는 Movie 한개만 찾는 것이 아니라 해당 조건을 만족하는 Movie 배열을 return하는거라 에러가 났던 것...
    // return 값을 Movie[]로 하면 에러는 안나지만 getOne의 취지와 맞지 않음!
    // return this.movies.filter((movie) => movie.id === id);
  } //end getOne()

  deleteOne(id: number) {
    this.getOne(id); // getOne 실행 후 해당 id를 가진 movie가 없으면 notFound 예외 발생됨. 고로 아래 코드는 실행 안됨
    this.movies = this.movies.filter(movie => movie.id !== id);
  } //end deleteOne()

  create(movieData: CreateMovieDto) {
    this.movies.push({
      id: this.movies.length + 1, //this.movies.length++ 하니까 null 배열이 생김... why?  >> a++은 a+=1 이고, arr.length++은 결국 arr의 length를 1늘리겠다는 말. arr의 index만 증가하고 안에 값은 없는 상태가 되지....
      ...movieData,
    });
  } //end create()

  update(id: number, updateData) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({ ...movie, ...updateData });
  }
}
