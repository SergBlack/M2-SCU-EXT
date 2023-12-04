import { ICommandDefinition, ICustomViewControllerBaseState } from "PosApi/Create/Views";
import { Entities } from "./DataService/DataServiceEntities.g";
export interface IExtensionViewSettings {
    caller?: any;
    title?: string;
    showHeader?: boolean;
    showAppBar?: boolean;
    showNavPane?: boolean;
    appButtons?: ICommandDefinition[];
    viewState?: ICustomViewControllerBaseState;
}

export interface IShowLegacyPurchasesViewSettings extends IExtensionViewSettings {
    transactions: Entities.LegacySalesTransaction[];
}

export interface IRefreshableCaller {
    refresh(): void;
}