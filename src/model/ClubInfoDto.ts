interface ClubInfoDto {
  adminIds: string[];
  memberCount: number;
  id: string;
  imageUrl: string;
  clubname: string;
  description: string;
  canApply: boolean;
  createdAt: boolean;
}

export default ClubInfoDto;
