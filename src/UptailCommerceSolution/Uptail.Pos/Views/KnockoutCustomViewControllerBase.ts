import KnockoutCustomViewModelBase from "./KnockoutCustomViewModelBase";  
import { ObjectExtensions } from "PosApi/TypeExtensions"; 
import * as Views from "PosApi/Create/Views";
import { IExtensionViewSettings } from "../DataModel";

export abstract class KnockoutCustomViewControllerBase<TViewModel extends KnockoutCustomViewModelBase> extends Views.CustomViewControllerBase
    implements Views.IBarcodeScannerEndpoint {

    public abstract readonly viewModel: TViewModel;

    public readonly implementsIBarcodeScannerEndpoint: true;

    get shouldHeaderSplitViewBeIntialized(): boolean { return false; } 
    get shouldAppBarBeIntialized(): boolean { return false; } 

    public dispose(): void {
        ObjectExtensions.disposeAllProperties(this);
    }

    public onBarcodeScanned(barcode: string): void {
        this.context.logger.logVerbose(barcode);
    }

    constructor(context: Views.ICustomViewControllerContext, settings: IExtensionViewSettings) { 
        let config: Views.ICustomViewControllerConfiguration = {
            title: settings.title,
            header: { isVisible: settings.showHeader ? true : false },
            navigationPane: { isVisible: settings.showNavPane ? true : false },
            commandBar: { commands: settings.appButtons ? settings.appButtons : [] }
        };

        super(context, config);

        settings.viewState = this.state;
        this.initializeViewModel(settings);  
    }

    public abstract initializeViewModel(settings: IExtensionViewSettings); 

    public onReady(element: HTMLElement): void { }  

    public resolveCallerPromise(result: any): void {
        if (this.viewModel.settings.caller && ObjectExtensions.isFunction(this.viewModel.settings.caller.resolvePromiseFunction)) {
            this.viewModel.settings.caller.resolvePromiseFunction(result);
        }
    }
} 