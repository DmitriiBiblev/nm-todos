import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/list',
    pathMatch: 'full'
  },
  {
    path: 'add',
    loadComponent: () => import('./pages/add-todo/add-todo.component').then(c => c.AddTodoComponent)
  },
  {
    path: 'list',
    loadComponent: () => import('./pages/todo-list/todo-list.component').then(c => c.TodoListComponent)
  },
  {
    path: 'favorites',
    loadComponent: () => import('./pages/favorite-todo/favorite-todo.component').then(c => c.FavoriteTodoComponent)
  }
];
