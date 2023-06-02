import { deleteForEntity, getForEntity, patchForEntity, postForEntity, putForEntity } from "../HttpRequests";
import PostInfoDto from "../../model/PostInfoDto";
import UpdatePostDto from "../../model/UpdatePostDto";
import CommentEntity from "../../model/CommentEntity";

class PostsApi {
  static getPosts(lastPostId: string, lastCreatedAt: string) {
    return getForEntity<PostInfoDto[]>('/posts', {limit: 10, lastPostId, lastCreatedAt});
  }

  static getPostByPostId(postId: string) {
    return getForEntity<PostInfoDto>('/posts', {postId});
  }

  static patchPost(postId: string, data: UpdatePostDto) {
    return patchForEntity(`/posts/${postId}`, data);
  }

  static deletePostByPostId(postId: string) {
    return deleteForEntity('/posts', {postId});
  }

  static getPostCommentsByPostId(postId: string) {
    return getForEntity<CommentEntity[]>(`/posts/${postId}/comments`, {});
  }

  static postPostCommentsByPostId(postId: string, content: string) {
    return postForEntity<CommentEntity>(`/posts/${postId}/comments`, {content});
  }

  static deletePostComments(postId: string, commentId: string) {
    return deleteForEntity(`/posts/${postId}/comments/${commentId}`, {});
  }

  static putPostLikeByPostId(postId: string) {
    return putForEntity(`/posts/${postId}/likes`, {});
  }

  static deletePostLikeByPostId(postId: string) {
    return deleteForEntity(`/posts/${postId}/likes`, {});
  }
}

export default PostsApi;
