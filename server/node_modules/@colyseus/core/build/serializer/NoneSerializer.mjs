class NoneSerializer {
  constructor() {
    this.id = "none";
  }
  reset(data) {
  }
  getFullState(client) {
    return null;
  }
  applyPatches(clients, state) {
    return false;
  }
}
export {
  NoneSerializer
};
