interface PostInfoDto {
  liked: boolean;
  likeCount: number;
  commentCount: number;
  id: string;
  authorId: string;
  content: string;
  imageUrls: string[];
  isAnnouncement: boolean;
  isPublic: boolean;
  createdAt: string;
}

export default PostInfoDto;
