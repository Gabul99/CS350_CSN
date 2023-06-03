import { deleteForEntity, getForEntity, postForEntity } from "../HttpRequests";
import ApplicationEntity from "../../model/ApplicationEntity";

class UserApi {
  static getUserClubs(onlyManaging: boolean) {
    return getForEntity<string[]>('/user/clubs', {onlyManaging});
  }

  static getUserStarredClub() {
    return getForEntity<string>('/user/starred-club', {});
  }

  static getUserSubscriptions() {
    return getForEntity<string[]>('/user/subscriptions', {});
  }

  static postUserSubscriptions() {
    return postForEntity('/user/subscriptions', {});
  }

  static deleteUserSubscriptions() {
    return deleteForEntity('/user/subscriptions', {});
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
