import { getForEntity, postForEntity } from "../HttpRequests";
import ClubInfoDto from "../../model/ClubInfoDto";

class ClubsApi {
  static postClubs(clubName: string, description: string, imageUrl: string) {
    return postForEntity('/clubs', { clubname: clubName, description, canApply: true, imageUrl })
  }

  static getClubDetailByClubId(clubId: string) {
    return getForEntity<ClubInfoDto>(`/clubs/${clubId}`, {});
  }
}

export default ClubsApi;
