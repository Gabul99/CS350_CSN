interface ScheduleInfoDto {
  isAuthor: boolean;
  authorName: string;
  id: string;
  clubId: string;
  authorId: string;
  name: string;
  description: string;
  startDttm: string;
  endDttm: string;
  imageUrls: string[];
  isPublic: boolean;
  createdAt: string;
}

export default ScheduleInfoDto;
