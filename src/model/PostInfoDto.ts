interface PostInfoDto {
  isAuthor: boolean;
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
  clubId: string;
  authorname: string;
}

export default PostInfoDto;
