import { postForEntity } from "../HttpRequests";

class ClubsApi {
  static postClubs(clubName: string, description: string, imageUrl: string) {
    return postForEntity('/clubs', {clubname: clubName, description, canApply: true, imageUrl})
  }
}

export default ClubsApi;
