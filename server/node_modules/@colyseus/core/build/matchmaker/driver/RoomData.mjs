import { spliceOne } from "../../utils/Utils";
class RoomCache {
  constructor(initialValues, rooms) {
    this.clients = 0;
    this.locked = false;
    this.private = false;
    this.maxClients = Infinity;
    this.unlisted = false;
    this.createdAt = new Date();
    for (const field in initialValues) {
      if (initialValues.hasOwnProperty(field)) {
        this[field] = initialValues[field];
      }
    }
    Object.defineProperty(this, "$rooms", {
      value: rooms,
      enumerable: false,
      writable: true
    });
  }
  save() {
    if (this.$rooms.indexOf(this) === -1) {
      this.$rooms.push(this);
    }
  }
  updateOne(operations) {
    if (operations.$set) {
      for (const field in operations.$set) {
        if (operations.$set.hasOwnProperty(field)) {
          this[field] = operations.$set[field];
        }
      }
    }
    if (operations.$inc) {
      for (const field in operations.$inc) {
        if (operations.$inc.hasOwnProperty(field)) {
          this[field] += operations.$inc[field];
        }
      }
    }
  }
  remove() {
    if (!this.$rooms) {
      return;
    }
    const roomIndex = this.$rooms.indexOf(this);
    if (roomIndex === -1) {
      return;
    }
    spliceOne(this.$rooms, roomIndex);
    this.$rooms = null;
  }
}
export {
  RoomCache
};
