import { Todo } from "./todo.interface";

export interface GroupedTodos {
  today: Todo[];
  other: Todo[];
}
