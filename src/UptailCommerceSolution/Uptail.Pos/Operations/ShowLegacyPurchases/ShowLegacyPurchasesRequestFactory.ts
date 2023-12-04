import { ShowLegacyPurchasesOperationRequest, ShowLegacyPurchasesOperationResponse } from "../../OperationRequests";
import { ExtensionOperationRequestFactoryFunctionType, IOperationContext } from "PosApi/Create/Operations";
import { ClientEntities } from "PosApi/Entities";  

type CancelableDisplayRequest = ClientEntities.ICancelableDataResult<ShowLegacyPurchasesOperationRequest<ShowLegacyPurchasesOperationResponse>>;

let getOperationRequest: ExtensionOperationRequestFactoryFunctionType<ShowLegacyPurchasesOperationResponse> =

    function (
        context: IOperationContext,
        operationId: number,
        actionParameters: string[],
        correlationId: string
    ): Promise<ClientEntities.ICancelableDataResult<ShowLegacyPurchasesOperationRequest<ShowLegacyPurchasesOperationResponse>>> {


        let operationRequest: ShowLegacyPurchasesOperationRequest<ShowLegacyPurchasesOperationResponse>
            = new ShowLegacyPurchasesOperationRequest<ShowLegacyPurchasesOperationResponse>(correlationId); 

        return Promise.resolve(<CancelableDisplayRequest>{
            canceled: false,
            data: operationRequest
        });
    };

export default getOperationRequest;
