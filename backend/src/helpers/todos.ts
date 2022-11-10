// import { TodosAccess } from './todosAcess'
// import { AttachmentUtils } from './attachmentUtils';
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
// import { createLogger } from '../utils/logger'
import { APIGatewayProxyEvent } from 'aws-lambda';
import * as uuid from 'uuid'
import { getUserId } from '../lambda/utils';
// import * as createError from 'http-errors'
import { TodoUpdate } from '../models/TodoUpdate'
import { deleteTodoItem } from './todosAcess';

// // TODO: Implement businessLogic

export function todoBuilder(todoRequest: CreateTodoRequest, event: APIGatewayProxyEvent): TodoItem {
    const todoId = uuid.v4()
    const todo = {

      todoId: todoId,
      userId: getUserId(event),
      createdAt: new Date().toISOString(),
      done: false,
      attachmentUrl: "",
      ...todoRequest
     }
        return todo as TodoItem
}

export function updateTodoBuilder (updateTodoData: UpdateTodoRequest): TodoUpdate {

  const todo = {
    "name": updateTodoData.name,
    "dueDate": updateTodoData.dueDate,
    "done": updateTodoData.done
  }

  return todo as TodoUpdate
}

export function deleteTodo(todoId: string, userId: string): Promise<string> {
  return deleteTodoItem(todoId, userId);
}