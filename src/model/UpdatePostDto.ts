interface UpdatePostDto {
  content: string;
  isAnnouncement: boolean;
  isPublic: boolean;
  imageUrls: string[];
}

export default UpdatePostDto;
