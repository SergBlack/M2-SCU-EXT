import { ObjectExtensions, StringExtensions } from "PosApi/TypeExtensions";
import { ICustomViewControllerContext } from "PosApi/Create/Views";
import { IExtensionViewSettings, IRefreshableCaller } from "../DataModel";
import ThrowIf from "../Utils/ThrowIf";
import POSPageUtility from "../Utils/POSPageUtility"; 
import ko, { Observable } from "knockout"; 

export default class KnockoutCustomViewModelBase implements Commerce.IDisposable {
    protected _context: ICustomViewControllerContext;

    public title: Observable<string>;

    public settings: IExtensionViewSettings;

    constructor(context: ICustomViewControllerContext, _settings: IExtensionViewSettings) {
        ThrowIf.nullOrUndefined(_settings, "ViewModel settings cannot be undefined");

        this._context = context;
        this.settings = _settings ? _settings : {}; 
        this.title = ko.observable(StringExtensions.EMPTY);
        this.isBusy = true; 
    }
    public get isBusy(): boolean {
        return this.settings.viewState != null ? this.settings.viewState.isProcessing : false;
    }

    public set isBusy(_busy: boolean) {
        if (this.settings.viewState != null) {
            this.settings.viewState.isProcessing = _busy;
        }
    }

    public dispose(): void {
        ObjectExtensions.disposeAllProperties(this);
    } 

    public async closePage(refreshCaller?: boolean): Promise<void> {
        this._context.navigator.navigateBack();
        return Promise.resolve();
    }

    public async refreshPageCaller(): Promise<void> {
        try {
            this.isBusy = true;

            if (this.settings != null && this.settings.caller != null) {

                var refreshCaller: IRefreshableCaller = this.settings.caller as IRefreshableCaller;
                if (refreshCaller != null) {
                    await refreshCaller.refresh();
                }
            }

            this.isBusy = false;
        }
        catch (ex) {
            //Avoid any exceptions to make page close
        }
        finally {
            this.isBusy = false;
        }
    }

    public isPhone(): boolean {
        return POSPageUtility.isPhone();
    }

    public async executeFunction(func: () => Promise<void>, onSuccess?: () => Promise<void>, onFail?: (ex: any) => Promise<void>, viewBusyOnExecute?: boolean): Promise<void> {
        if (viewBusyOnExecute)
            this.isBusy = true;

        return func()
            .then(() => {
                if (onSuccess) {
                    return onSuccess().
                        then(() => {
                            if (viewBusyOnExecute)
                                this.isBusy = false;
                        });
                }
                else {
                    if (viewBusyOnExecute)
                        this.isBusy = false;
                    return Promise.resolve();
                }
            });
    }
} 