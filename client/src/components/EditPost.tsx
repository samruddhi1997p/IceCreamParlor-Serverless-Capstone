import * as React from 'react'
import { Form, Button } from 'semantic-ui-react'
import Auth from '../auth/Auth'
import { getUploadUrl, uploadFile, patchPost, GetOrdersById } from '../api/posts-api'
import { UpdateOrderRequest } from '../types/UpdateOrderRequest'
import { Post } from '../types/Post'
import { History } from 'history'

enum UpdateState {
  NoUpload,
  FetchingPresignedUrl,
  UploadingFile
}

interface EditPostProps {
  match: {
    params: {
      postId: string
    }
  }
  auth: Auth
  history: History
}

interface EditPostState {
  file: any
  post: Post
  caption: string
  isPublic: string
  uploadState: UpdateState
}

export class EditPost extends React.PureComponent<
  EditPostProps,
  EditPostState
> {
  state: EditPostState = {
    file: undefined,
    post: {} as Post,
    caption: '',
    isPublic: '',
    uploadState: UpdateState.NoUpload
  }

  handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    this.setState({
      file: files[0]
    })
  }

  handlePropertyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    if(event.target.id == "caption"){
      this.setState({
        caption: event.target.value
      })
    }

    if(event.target.id == "isPublic"){
      if (event.target.checked){
        this.setState({
          isPublic: 'true'
        })
      }
      else{
        this.setState({
          isPublic: 'false'
        })
      }
    }
    
  }

  handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    try {
      if(this.state.file) {
        this.setUploadState(UpdateState.FetchingPresignedUrl)
        const uploadUrl = await getUploadUrl(this.props.auth.getIdToken(), this.props.match.params.postId)

        this.setUploadState(UpdateState.UploadingFile)
        await uploadFile(uploadUrl, this.state.file)

        alert('File was uploaded!')
      }

    } catch (e) {
      alert('Could not upload a file: ' + e.message)
    } finally {
      this.setUploadState(UpdateState.NoUpload)
    }

    //Upating caption
    try{ 
      const updatedPost: UpdateOrderRequest =  {
        caption: this.state.post.caption,
        isPublic: this.state.post.isPublic
      }
      
      if(this.state.caption != '') {updatedPost.caption = this.state.caption}
      if(this.state.isPublic != '') {updatedPost.isPublic = this.state.isPublic}

      await patchPost(this.props.auth.getIdToken(), this.props.match.params.postId, updatedPost)
      alert('Post was updated!')
    }
    catch (e) {
      alert('Could not update the post: ' + e.message)
    }
  }

  setUploadState(uploadState: UpdateState) {
    this.setState({
      uploadState
    })
  }

  async componentDidMount() {
    try {
      const post = await GetOrdersById(this.props.auth.getIdToken(), this.props.match.params.postId)
      console.log(post)
      this.setState({post})
    } catch (e) {
      alert(`Failed to fetch posts: ${e.message}`)
    }
  }

  render() {
    return (
      <div>
        <h1>Edit Tweet</h1>

        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label></label>
            <input type="text" placeholder="Caption" id="caption" value={this.state.caption} onChange={this.handlePropertyChange}></input>
            <br></br>

          </Form.Field>

          {this.renderButton()}
        </Form>
      </div>
    )
  }

  renderButton() {

    return (
      <div>
        {this.state.uploadState === UpdateState.FetchingPresignedUrl && <p>Freezing</p>}
        {this.state.uploadState === UpdateState.UploadingFile && <p>Freezing</p>}
        <Button
          loading={this.state.uploadState !== UpdateState.NoUpload}
          type="submit"
        >
          Place Order
        </Button>
      </div>
    )
  }
}
