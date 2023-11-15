import IDefaultSpriteConfig from "../components/sprite/interface/IDefaultSpriteConfig";
import ITextInputConfig from "../components/textInput/interface/ITextInputConfig";
import IButtonConfig from "../components/button/interface/IButtonConfig";

export default interface ILoginScreenConfig {
    background: IDefaultSpriteConfig,
    usernameTextInputConfig: ITextInputConfig
    passwordTextInputConfig: ITextInputConfig
    loginButtonConfig: IButtonConfig
  }

