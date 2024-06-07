// import GameManager from "../../game/manager/GameManager";

class PagesManager {
  constructor() {
    this.pages = null;
  }

  create(PagesElement) {
    this.pages = PagesElement;
  }

  handleLoadingPageVisible(value) {
    this.pages.handleLoadingPageVisible(value);
  }

  handleLoginPageVisible(value) {
    this.pages.handleLoginPageVisible(value);
  }

  handleLoadingGameVisible = (value) => {
    this.pages.handleLoadingGameVisible(value);
  };

  handleLobbyPageVisible = (value) => {
    this.pages.handleLobbyPageVisible(value);
  };

  handleRoomsPageVisible = (value) => {
    this.pages.handleRoomsPageVisible(value);
  };

  setPointerEventActive = (value) => {
    this.pages.setPointerEventActive(value);
  };
}
export default new PagesManager();
