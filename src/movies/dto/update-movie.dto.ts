import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';

/* CreateMovieDto의 인자를 가질 수 있으며, 모두 필수 인자는 아님
  
  CreateMovieDto의 값에 ? 를 붙여준 코드와 아래 PartialType으로 CreateMovieDto를 받아온 것의 결과는 동일

  @IsString()
  readonly title?: string;
  @IsNumber()
  readonly year?: number;
  @IsString({ each: true })
  readonly genres?: string[];
*/
export class UpdateMovieDto extends PartialType(CreateMovieDto) {}