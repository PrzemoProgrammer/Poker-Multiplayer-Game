import Table from "./Table";
import BaseScene from "../../../abstraction/BaseScene";

class TableFactory {
    public createTable(scene: BaseScene): Table {
        return new Table(scene);
    }
}
export default new TableFactory()