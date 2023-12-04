import * as NewView from "PosApi/Create/Views";
import { ObjectExtensions } from "PosApi/TypeExtensions";
import { KnockoutCustomViewControllerBase } from "../KnockoutCustomViewControllerBase";
import KnockoutCustomViewModelBase from "../KnockoutCustomViewModelBase";
import { IShowLegacyPurchasesViewSettings, IExtensionViewSettings } from "../../DataModel";
import { IDataList, DataListInteractionMode } from "PosApi/Consume/Controls"; 
import ko, { ObservableArray } from "knockout";
import { Entities } from "../../DataService/DataServiceEntities.g";
import { emptyIfNull, dateToShortString } from "../../Utils/TypeFormattingUtilities";
export default class ShowLegacyPurchasesView extends KnockoutCustomViewControllerBase<ShowLegacyPurchasesViewModel> {
    public viewModel: ShowLegacyPurchasesViewModel; 

    private transactionList: IDataList<Entities.LegacySalesTransaction>; 
    private purchaseSettings: IShowLegacyPurchasesViewSettings;

    constructor(_context: NewView.ICustomViewControllerContext, _settings: IShowLegacyPurchasesViewSettings) {
        _settings.showHeader = true;
        _settings.showNavPane = true;
        _settings.appButtons = []; 
        _settings.title = "Show legacy purchases"; 

        super(_context, _settings);
        this.state.isProcessing = false; 
        this.purchaseSettings = _settings;
    } 

    public initializeViewModel(options: IExtensionViewSettings) {
        this.viewModel = new ShowLegacyPurchasesViewModel(this.context, <IShowLegacyPurchasesViewSettings>options);
    }

    public dispose(): void {
        ObjectExtensions.disposeAllProperties(this);
    }

    public async onReady(element: HTMLElement): Promise<void> {
        let dataListRootElem: HTMLDivElement = element.querySelector("#uptailLegacyPurchasesListElement") as HTMLDivElement;

        this.transactionList = this.context.controlFactory.create<Entities.LegacySalesTransaction>(
            this.context.logger.getNewCorrelationId(),
            "DataList",
            {
                columns: [
                    {
                        collapseOrder: 3,
                        computeValue: (line: Entities.LegacySalesTransaction): string => { return emptyIfNull(line.TransactionId); },
                        isRightAligned: false,
                        minWidth: 150,
                        ratio: 40,
                        title: "Transaction"
                    },
                    {
                        collapseOrder: 2,
                        computeValue: (line: Entities.LegacySalesTransaction): string => { return dateToShortString(line.SalesDateTime); },
                        isRightAligned: false,
                        minWidth: 70,
                        ratio: 40,
                        title: "Date"
                    },
                    {
                        collapseOrder: 1,
                        computeValue: (line: Entities.LegacySalesTransaction): string => { return emptyIfNull(line.ItemNumber); },
                        isRightAligned: false,
                        minWidth: 40,
                        ratio: 20,
                        title: "Product"
                    }
                ],
                data: [],
                interactionMode: DataListInteractionMode.SingleSelect,
                equalityComparer: (left: Entities.LegacySalesTransaction, right: Entities.LegacySalesTransaction): boolean => {
                    return left.TransactionId === right.TransactionId;
                }
            },
            dataListRootElem); 

        this.transactionList.data = this.purchaseSettings.transactions;
        ko.applyBindings(this, element);
    }
}

export class ShowLegacyPurchasesViewModel extends KnockoutCustomViewModelBase {
    public viewSettings: IShowLegacyPurchasesViewSettings;
    public transactions: ObservableArray<Entities.LegacySalesTransaction>;

    constructor(_context: NewView.ICustomViewControllerContext, _settings: IShowLegacyPurchasesViewSettings) {
        super(_context, _settings);
        this.viewSettings = _settings;
        this.transactions = ko.observableArray(_settings.transactions); 
    }
}
