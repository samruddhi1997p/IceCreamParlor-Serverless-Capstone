import { apiEndpoint } from '../config'
import { Post } from '../types/Post';
import { CreateOrderRequest } from '../types/CreateOrderRequest';
import Axios from 'axios'
import { UpdateOrderRequest } from '../types/UpdateOrderRequest';

export async function GetOrders(idToken: string): Promise<Post[]> {
  console.log('Fetching my posts')

  const response = await Axios.get(`${apiEndpoint}/posts/myposts`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })
  console.log('Posts:', response.data)
  return response.data.items
}

export async function getPublicPosts(idToken: string): Promise<Post[]> {
  console.log('Fetching public posts')

  const response = await Axios.get(`${apiEndpoint}/posts`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })
  console.log('Posts:', response.data)
  return response.data.items
}

export async function GetOrdersById(idToken: string, postId: string): Promise<Post> {
  console.log('Fetching posts by ID')

  const response = await Axios.get(`${apiEndpoint}/posts/${postId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })

  console.log("post by id: " + JSON.stringify(response.data.item))
  return response.data.item
}

export async function CreateOrder(
  idToken: string,
  newPost: CreateOrderRequest
): Promise<Post> {
  const response = await Axios.post(`${apiEndpoint}/posts`,  JSON.stringify(newPost), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })

  console.log(JSON.stringify(response))
  return response.data.item
}

export async function patchPost(
  idToken: string,
  postId: string,
  updatedPost: UpdateOrderRequest
): Promise<void> {
  await Axios.patch(`${apiEndpoint}/posts/${postId}`, JSON.stringify(updatedPost), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
}

export async function DeleteOrder(
  idToken: string,
  postId: string
): Promise<void> {
  await Axios.delete(`${apiEndpoint}/posts/${postId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
}

export async function getUploadUrl(
  idToken: string,
  postId: string
): Promise<string> {
  const response = await Axios.post(`${apiEndpoint}/posts/${postId}/attachment`, '', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
  return response.data.uploadUrl
}

export async function uploadFile(uploadUrl: string, file: Buffer): Promise<void> {
  await Axios.put(uploadUrl, file)
}
