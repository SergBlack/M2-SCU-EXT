import { StringExtensions } from "PosApi/TypeExtensions";

export function isNullEmptyOrWhitespace(text: string): boolean {
    return StringExtensions.isNullOrWhitespace(text) || StringExtensions.isEmpty(text);
}

export function isNullOrEmpty(text: string): boolean {
    return text == null || StringExtensions.isEmpty(text);
}