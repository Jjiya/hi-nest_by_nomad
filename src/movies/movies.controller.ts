import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('movies') // url entry point
export class MoviesController {
  @Get()
  getAll(): string {
    return 'This will return all movies';
  }

  @Get('search')
  search(@Query('year') searchingYear: string) {
    return `We are searching for a movie with a made after: ${searchingYear}`;
  }

  // search를 위에 나두고 나니, search로 입력했을 땐 search가
  // id를 입력했을 땐 id로 매핑됨
  // 내 생각엔 search랑 일치하면 search타고 그 외에는 자동으로 id로 매핑되는듯
  @Get('/:id')
  getOne(@Param('id') movieId: string): string {
    // ⭐ Nest에서는 무언가 필요하면 요청해야함 ⭐
    return `This will return one Movie with the id: ${movieId}`;
  }

  @Post()
  create(@Body() movieData) {
    return movieData;
  }

  @Delete('/:id')
  remove(@Param('id') movieId: string) {
    return `This will delete a movie with the id: ${movieId}`;
  }

  @Patch('/:id')
  update(@Param('id') movieId: string, @Body() updateData) {
    return {
      updatedMovie: movieId,
      ...updateData,
    };
  }

  // search가 여기 있으면 같은 Get mapping이면서 파일 상단에 있는 /:id가 실행된다.
  // @Get('search')
  // search() {
  //   return `We are searching for a movie with a title`;
  // }
}
