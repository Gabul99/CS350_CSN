interface CreateScheduleDto {
  clubId: string;
  authorId: string;
  name: string;
  description: string;
  startDttm: string;
  endDttm: string;
  imageUrls: string[];
  isPublic: boolean;
}

export default CreateScheduleDto;
