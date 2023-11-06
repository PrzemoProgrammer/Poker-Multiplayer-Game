import UiInterface from "../../components/UiInterface";
import BaseScene from "../../abstraction/BaseScene";

class UiInterfaceFactory {
    public createInterface(scene: BaseScene): UiInterface {
        return new UiInterface(scene);
    }
}
export default new UiInterfaceFactory()