export interface Todo {
  id: number;
  title: string;
  createdAt: Date;
  expiredAtDate: Date;
  expiredAtTime: string;
  isFavorite: boolean;
}
