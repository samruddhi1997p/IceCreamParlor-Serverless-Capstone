import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { CreateOrderRequest } from '../../requests/CreateOrderRequest'
import { CreateOrder } from '../../businessLogic/posts'
import * as middy from 'middy';
import { cors } from 'middy/middlewares';
import { createLogger } from '../../utils/logger';
import { getUserId } from '../utils'
import { ResponseHelper } from '../../helpers/responseHelper'

const logger = createLogger ('Create Order')
const apiResponseHelper = new ResponseHelper()

export const handler = middy(
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
        try{
            logger.info('Processing event: ', event)

            const newPost: CreateOrderRequest = JSON.parse(event.body)
            const userId = getUserId(event)

            const newItem = await CreateOrder(newPost, userId)

            return apiResponseHelper.generateSuccessRespose(201, 'item', newItem)
        } 
        
        catch (e) {
            logger.error('Error: ' + e.message)
            
            return apiResponseHelper.generatErrorResponse(500, e.message)
        }
    }
)

handler.use(
    cors({
        credentials: true
      })
)
