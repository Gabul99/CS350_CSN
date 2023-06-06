import { deleteForEntity, getForEntity, postForEntity } from "../HttpRequests";
import ApplicationEntity from "../../model/ApplicationEntity";
import UserDto from "../../model/UserDto";

class UserApi {
  static getUserInfoByUserId(id: string){
    return getForEntity<UserDto>('/user', {id});
  }

  static getUserClubs(onlyManaging: boolean) {
    return getForEntity<string[]>('/user/clubs', {onlyManaging});
  }

  static getUserStarredClub() {
    return getForEntity<string>('/user/starred-club', {});
  }

  static getUserSubscriptions() {
    return getForEntity<string[]>('/user/subscriptions', {});
  }

  static postUserSubscriptionsByClubId(clubId: string) {
    return postForEntity('/user/subscriptions', {clubId});
  }

  static deleteUserSubscriptionsByClubId(clubId: string) {
    return deleteForEntity('/user/subscriptions', {clubId});
  }

  static getUserApplications() {
    return getForEntity<ApplicationEntity[]>('/user/applications', {});
  }

  static postUserApplicationsByClubId(clubId: string) {
    return postForEntity<ApplicationEntity>('/user/applications', {clubId});
  }

  static deleteUserApplications(applicationId: string) {
    return deleteForEntity<ApplicationEntity>('/user/applications', {applicationId});
  }
}

export default UserApi;
