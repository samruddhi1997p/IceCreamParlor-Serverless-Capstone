import * as uuid from 'uuid'
import { PostItem } from '../models/PostItem'
import { CreateOrderRequest } from '../requests/CreateOrderRequest'
import { UpdateOrderRequest } from '../requests/UpdateOrderRequest'
import { PostAccess } from '../dataLayer/PostsAccess'
import { createLogger } from '../utils/logger'

const postAccess = new PostAccess()
const logger = createLogger('todos')

export async function GetOrders(userId: string): Promise<PostItem[]>{
    
    logger.info('In GetOrder() function')
    return await postAccess.GetOrders(userId)
}

export async function GetPublicOrder(): Promise<PostItem[]>{
    
    logger.info('In GetPublicOrder() function')
    return await postAccess.GetPublicOrder()
}

export async function GetOrdersById(postId): Promise<PostItem>{
    
    logger.info('In GetOrdersById() function')
    return await postAccess.GetOrdersById(postId)
}

export async function CreateOrder(CreateOrderRequest: CreateOrderRequest, userId: string): Promise<PostItem>{
    
    logger.info('In CreateOrder() function')
    const postId = uuid.v4()

    return await postAccess.CreateOrder({
        userId: userId,
        postId: postId,
        createdAt: new Date().toISOString(),
        caption: CreateOrderRequest.caption,
        isPublic: CreateOrderRequest.isPublic
    })
}

export async function UpdateOrder(postId: string, updatedPost: UpdateOrderRequest, userId: string): Promise<string>{

    logger.info('In UpdateOrder() function')
    return await postAccess.UpdateOrder({
        userId: userId,
        postId: postId,
        createdAt: new Date().toISOString(),
        caption: updatedPost.caption,
        isPublic: updatedPost.isPublic,
    })
}

export async function DeleteOrder(postId: string, userId: string): Promise<string>{

    logger.info('In DeleteOrder() function')
    return await postAccess.DeleteOrder(postId, userId)
}

export async function GenerateUploadUrl(postId: string): Promise<string>{

    logger.info('In GenerateUploadUrl() function')
    return await postAccess.GenerateUploadUrl(postId)
}