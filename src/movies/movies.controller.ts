import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('movies') // url entry point
export class MoviesController {
  @Get()
  getAll(): string {
    return 'This will return all movies';
  }

  @Get('/:id')
  getOne(@Param('id') movieId: string): string {
    // ⭐ Nest에서는 무언가 필요하면 요청해야함 ⭐
    return `This will return one Movie with the id: ${movieId}`;
  }

  @Post()
  create() {
    return 'This will create a movie';
  }

  @Delete('/:id')
  remove(@Param('id') movieId: string) {
    return `This will delete a movie with the id: ${movieId}`;
  }

  @Patch('/:id')
  update(@Param('id') movieId: string) {
    return `This will update a movie with the id : ${movieId}`;
  }
}
