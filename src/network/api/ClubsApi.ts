import { deleteForEntity, getForEntity, patchForEntity, postForEntity } from "../HttpRequests";
import ClubInfoDto from "../../model/ClubInfoDto";
import UpdateClubInfoDto from "../../model/UpdateClubInfoDto";
import MemberDto from "../../model/MemberDto";

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

  static getClubMembersByClubId(clubId: string) {
    return getForEntity<MemberDto[]>(`/clubs/${clubId}/members`, {});
  }

  static patchClubMember(clubId: string, userId: string, adminPrivilege: boolean) {
    return patchForEntity(`/clubs/${clubId}/members/${userId}`, {adminPrivilege});
  }

  static deleteClubMember(clubId: string, userId: String) {
    return deleteForEntity(`/clubs/${clubId}/members/${userId}`, {});
  }
}

export default ClubsApi;
