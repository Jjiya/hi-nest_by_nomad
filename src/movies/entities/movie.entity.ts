/* 서비스로 보내고 받을 클래스(인터페이스) export
  movies를 구성하는 objext
  원래라면 DB의 데이터와 동일한 object로 작성해야함
*/

export class Movie {
  id: number;
  title: string;
  year: number;
  genres: string[];
}