interface CreatePostDto {
  content: string;
  isAnnouncement: boolean;
  isPublic: boolean;
  imageUrls: string[];
}

export default CreatePostDto;
