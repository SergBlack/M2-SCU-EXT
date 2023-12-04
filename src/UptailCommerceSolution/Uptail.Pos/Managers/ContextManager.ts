import { IExtensionContext } from "PosApi/Framework/ExtensionContext";
export default class ContextManager {

    protected context: IExtensionContext;
    protected correlationId: string;

    constructor(_context: IExtensionContext, _correlationId: string) {
        this.context = _context;
        this.correlationId = _correlationId ? _correlationId : _context.logger.getNewCorrelationId();
    }
}
