import { getForEntity, patchForEntity, postForEntity } from "../HttpRequests";
import ClubInfoDto from "../../model/ClubInfoDto";
import UpdateClubInfoDto from "../../model/UpdateClubInfoDto";

class ClubsApi {
  static getClubs(lastClubName?: string, limit?: string) {
    return getForEntity<string[]>('/clubs', {lastClubName, limit});
  }

  static postClubs(clubName: string, description: string, imageUrl: string) {
    return postForEntity('/clubs', {clubname: clubName, description, canApply: true, imageUrl})
  }

  static getClubDetailByClubId(clubId: string) {
    return getForEntity<ClubInfoDto>(`/clubs/${clubId}`, {});
  }

  static patchClubDetailByClubId(clubId: string, data: UpdateClubInfoDto) {
    return patchForEntity(`/clubs/${clubId}`, data);
  }
}

export default ClubsApi;
