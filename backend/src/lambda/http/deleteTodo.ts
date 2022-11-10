import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'
//import { deleteTodo } from '../../helpers/todosAcess'
// import { deleteTodoBuilder } from '../../helpers/todos'

//import { deleteTodo } from '../../businessLogic/todos'
import { getUserId } from '../utils'
import { deleteTodo } from '../../helpers/todos'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId

    // TODO: Remove a TODO item by id

    const userId = getUserId(event)
    await deleteTodo(todoId, userId);
    
    return {
      statusCode: 201,
      body: JSON.stringify({
        body: ""
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
