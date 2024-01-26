export interface Category {
  id:string;
  category: string;
  criado_em: MyDate;

}

export class MyDate {
  seconds: number;
}
