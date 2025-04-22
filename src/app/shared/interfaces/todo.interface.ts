export interface Todo {
  id: number;
  title: string;
  createdAt: Date;
  expiredAt: Date;
  isFavorite: boolean;
}
