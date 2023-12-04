import { isNullEmptyOrWhitespace } from "./StringUtilities";

export default class ThrowIf {

    public static nullOrUndefined(objectToCheck: any, errorMessage: string): void {
        if (objectToCheck == null)
            throw errorMessage;
    }

    public static nullEmptyOrWhitespace(text: string, errorMessage: string): void {
        if (isNullEmptyOrWhitespace(text)) {
            throw errorMessage;
        }
    }
}