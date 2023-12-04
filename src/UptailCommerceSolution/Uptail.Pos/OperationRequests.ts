import { ExtensionOperationRequestBase } from "PosApi/Create/Operations";
import { Response } from "PosApi/Create/RequestHandlers";

export class ShowLegacyPurchasesOperationResponse extends Response {
    constructor() {
        super();
    }
}

export class ShowLegacyPurchasesOperationRequest<TResponse extends ShowLegacyPurchasesOperationResponse>
    extends ExtensionOperationRequestBase<TResponse> { 

    constructor(correlationId: string) {
        super(10050, correlationId); 
    }
}