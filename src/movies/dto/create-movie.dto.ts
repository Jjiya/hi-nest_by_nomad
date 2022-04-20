import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  readonly title: string;
  @IsNumber()
  readonly year: number;
  @IsOptional() // 필수 x
  @IsString({ each: true }) // 배열 내의 값을 하나씩 다 검사함
  readonly genres: string[];
}