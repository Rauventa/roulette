import dateformat from "dateformat";

export const toNormalDate = (value: string) => {
    return dateformat(new Date(value).toString(), "d.mm.yyyy hh:MM")
}