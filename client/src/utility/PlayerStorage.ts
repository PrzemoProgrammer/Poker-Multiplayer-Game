class PlayerStorage {
    data:  object;

  constructor() {
    this.data = {}
  }

  public setData(data: object) {
    this.data = data
  }

  public getData() {
    return  this.data 
  }
}

export default new PlayerStorage();
