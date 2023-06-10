import { deleteForEntity, getForEntity, patchForEntity, postForEntity, putForEntity } from "../HttpRequests";
import ScheduleInfoDto from "../../model/ScheduleInfoDto";
import CreateScheduleDto from "../../model/CreateScheduleDto";

class SchedulesApi {
  static getSchedulesUser() {
    return getForEntity<any>('/user/schedules', {})
  }

  static getSchedulesJoined(month: number) {
    return getForEntity<any>('/schedules', { type: 'JOINED', month });
  }

  static getSchedulesSubscribed(month: number) {
    return getForEntity<any>(`/schedules`, { type: 'SUBSCRIBED', month });
  }

  static getScheduleById(scheduleId: number) {
    return getForEntity<ScheduleInfoDto>(`/schedules/${scheduleId}`, {});
  }

  static scrabScheduleById(scheduleId: string) {
    return postForEntity(`/user/schedules`, { scheduleId });
  }

  static unscrabScheduleById(scheduleId: string) {
    return deleteForEntity(`/user/schedules/${scheduleId}`, {});
  }

  static createSchedule(data: CreateScheduleDto) {
    return postForEntity(`/schedules`, data);
  }


}

export default SchedulesApi;
