import ContextManager from "./ContextManager";
import { StoreOperations } from "../DataService/DataServiceRequests.g";
import { Entities } from "../DataService/DataServiceEntities.g";
import { ClientEntities } from "PosApi/Entities";
export class SalesTransactionsManager extends ContextManager {

    public async readLegacyTransactions(customerId: string): Promise<ClientEntities.ICancelableDataResult<Entities.LegacySalesTransaction[]>> {
        let response = await this.context.runtime.executeAsync(new StoreOperations.UptailSearchLegacyPurchasesRequest<StoreOperations.UptailSearchLegacyPurchasesResponse>(customerId));

        return Promise.resolve({
            canceled: response != null && response.canceled,
            data: response && !response.canceled && response.data != null && response.data.result != null ? response.data.result : []
        })
    } 
}