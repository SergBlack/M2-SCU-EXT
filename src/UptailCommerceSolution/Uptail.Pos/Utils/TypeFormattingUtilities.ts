import { DateFormatter } from "PosApi/Consume/Formatters";
import { ObjectExtensions, StringExtensions } from "PosApi/TypeExtensions";
export function dateToShortString(date: Date): string {
    return ObjectExtensions.isNullOrUndefined(date) ? StringExtensions.EMPTY : DateFormatter.toShortDate(date);
}

export function emptyIfNull(text: string): string {
    return text ? text : StringExtensions.EMPTY;
}