import { IExtensionContext } from "PosApi/Framework/ExtensionContext"; 
import {
    IMessageDialogOptions, ShowMessageDialogClientRequest,
    ShowAlphanumericInputDialogClientRequest, ShowMessageDialogClientResponse
} from "PosApi/Consume/Dialogs";
import { ObjectExtensions } from "PosApi/TypeExtensions";
import { isNullEmptyOrWhitespace } from "./StringUtilities";
import { ClientEntities } from "PosApi/Entities";

export class NoYesOptions {
    public static No: string = "NO";
    public static Yes: string = "YES";
}

export default class DialogUtilities {

    public static async showInfoMessage(context: IExtensionContext, title: string, message: string): Promise<void> {
        if (!isNullEmptyOrWhitespace(message)) {
            const options: IMessageDialogOptions = {
                title: title,
                message: message,
                showCloseX: true,
                button1: {
                    id: "Button1Close",
                    label: context.resources.getString("OKButtonLabel"),
                    result: "OK"
                }
            };

            await context.runtime.executeAsync(new ShowMessageDialogClientRequest<ShowMessageDialogClientResponse>(options));
        }

        return Promise.resolve();
    }

    public static async showNoYesDialog(context: IExtensionContext, title: string, message: string): Promise<boolean> {
        const messageDialogOptions: IMessageDialogOptions = {
            title: title,
            message: message,
            showCloseX: false,
            button1: {
                id: "Ok",
                label: context.resources.getString("OkButton"),
                result: NoYesOptions.Yes,
                isPrimary: true
            },
            button2: {
                id: "Cancel",
                label: context.resources.getString("CancelButton"),
                result: NoYesOptions.No,
                isPrimary: false
            },
        };

        const dialogRequest = new ShowMessageDialogClientRequest<ShowMessageDialogClientResponse>(messageDialogOptions);
        const dialogResponse = await context.runtime.executeAsync(dialogRequest);
        const result = dialogResponse && dialogResponse.data && dialogResponse.data.result && dialogResponse.data.result.dialogResult;

        return Promise.resolve(!ObjectExtensions.isNullOrUndefined(result) && result === NoYesOptions.Yes);
    }  

    public static async showAlfaNumericDialog(context: IExtensionContext, title: string, subtitle: string,
                                              numPadLabel: string, defaultValue: string = null): Promise<ClientEntities.ICancelableDataResult<Commerce.ShowAlphanumericInputDialogClientResponse>> {
        const options: ClientEntities.Dialogs.IAlphanumericInputDialogOptions = {
            title: title,
            subTitle: subtitle,
            numPadLabel: numPadLabel,
            defaultValue: defaultValue
        };

        const dialogRequest = new ShowAlphanumericInputDialogClientRequest(options);
        const dialogResponse = await context.runtime.executeAsync(dialogRequest);

        return dialogResponse;
    }
}