import { describe, it, expect, test, vi } from 'vitest'
import axios from 'axios'
import { serverOf } from '../src/server'
import MockAdapter from 'axios-mock-adapter'
import { addTodo, deleteTodo, getTodos, updateTodoStatus } from '../src/services/todo'
import { Todo, TodoBody } from '../src/types/todo'
import * as repo from '../src/repo/todo'

describe('Server Testing', () => {

  // 測試返回所有todos
  it('should return all todos', async () => {
    const mockedTodos: Array<Todo> = [
      { id: '1', name: 'Test Todo 1', description: 'Test Description 1', status: false },
      { id: '2', name: 'Test Todo 2', description: 'Test Description 2', status: true },
    ];

    vi.spyOn(repo, 'findAllTodos').mockResolvedValue(mockedTodos);
    const result = await getTodos();

    expect(result).toEqual(mockedTodos);
    vi.restoreAllMocks();
  });
  // 測試一筆新增資料
  it('should add a new todo and return it', async () => {
    const todoBody: TodoBody = {
      name: 'Test Todo',
      description: 'Test Description',
      status: false,
    };

    const mockedTodo: Todo = {
      ...todoBody,
      id: '1', 
    };

    vi.spyOn(repo, 'createTodo').mockResolvedValue(mockedTodo);
    const result = await addTodo(todoBody);

    expect(result).toEqual(mockedTodo);
    vi.restoreAllMocks();
    
  });
  // 更新一筆已有資料
  it('should update the status of an existing todo', async () => {
    const todoId = '1';
    const newStatus = true;

    const mockedTodo: Todo = {
      id: todoId,
      name: 'Test Todo',
      description: 'Test Description',
      status: newStatus, 
    };

    vi.spyOn(repo, 'updateTodoById').mockResolvedValue(mockedTodo);

    const result = await updateTodoStatus(todoId, newStatus);

    expect(result).toEqual(mockedTodo);
    expect(result?.status).toBe(newStatus);

    vi.restoreAllMocks();
  });
  // 刪除一筆已有資料
  it('should delete an existing todo', async () => {
    const todoId = '1';

    const mockedResult = {
      acknowledged: true,
      deletedCount: 1,
    };

    vi.spyOn(repo, 'deleteTodoById').mockResolvedValue(mockedResult);

    const result = await deleteTodo(todoId);

    expect(result).toEqual(mockedResult);
    expect(repo.deleteTodoById).toHaveBeenCalledWith(todoId);

    vi.restoreAllMocks();
  });

})


