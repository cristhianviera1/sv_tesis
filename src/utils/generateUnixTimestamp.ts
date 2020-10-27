import moment from "moment";

export const generateUnixTimestamp = () => moment().unix();
export const convertToUnixTimestamp = (date: number) => moment(date).unix()
