import moment from "moment";

export const fromNow = (dateString: string) => {
  return moment.utc(dateString).local().startOf('seconds').fromNow();
}
