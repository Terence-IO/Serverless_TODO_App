import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

//import { updateTodo } from '../../businessLogic/todos'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { updateTodoBuilder } from '../../helpers/todos'
import { getTodoById, updateTodoTag } from '../../helpers/todosAcess'
//import { getUserId } from '../utils'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId
    const updatedTodoData: UpdateTodoRequest = JSON.parse(event.body)

    // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
    
    const todo = updateTodoBuilder(updatedTodoData)

    const oldTodo = await getTodoById(todoId)
    await updateTodoTag(oldTodo, todo)

    return {
      statusCode: 201,
      body: JSON.stringify({
        item: todo
      })
    }
  }
)

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
