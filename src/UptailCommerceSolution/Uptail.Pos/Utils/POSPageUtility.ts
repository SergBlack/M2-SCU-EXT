import * as Views from "PosApi/Create/Views";

export default class POSPageUtility {

    protected context: Views.ICustomViewControllerContext;

    public static isPhone(): boolean {

        var docBody = document.body;
        if (docBody != null && docBody.classList != null
            && docBody.classList.contains != null) {
            return docBody.classList.contains("phone");
        }

        return false;
    }

    public constructor(_context: Views.ICustomViewControllerContext) {
        this.context = _context;
    }

    public newAppBarCommand(id: string, iconType: any, labelId: string, executeFunction: () => void,
        visible: boolean, enabled: boolean): Views.ICommandDefinition {

        return {
            name: id,
            label: this.context.resources.getString(labelId),
            icon: iconType,
            isVisible: visible,
            canExecute: enabled,
            execute: (args: Views.CustomViewControllerExecuteCommandArgs): void => {
                executeFunction()
            }
        };
    }

    public newGridColumn<TData>(titleLabelId: string, ratio: number, collapseOrder: number, minWidth: number, isRightAligned: boolean, computeValue: (row: TData) => (string)): Commerce.Extensibility.IDataListColumn<TData> {

        let column: Commerce.Extensibility.IDataListColumn<TData> = {
            title: this.context.resources.getString(titleLabelId),
            ratio: ratio,
            collapseOrder: collapseOrder,
            minWidth: minWidth,
            isRightAligned: isRightAligned,
            computeValue: computeValue
        };

        return column;
    }
}