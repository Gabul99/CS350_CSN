interface CommentEntity {
  isAuthor: boolean;
  commentId: string;
  postId: string;
  authorId: string;
  content: string;
  createdAt: string;
  authorname: string;
}

export default CommentEntity;
