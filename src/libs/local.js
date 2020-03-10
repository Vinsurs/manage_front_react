import store from "store";
export default {
  getLocalItem(key) {
    return store.get(key, {});
  },
  setLocalItem(key, val) {
    store.set(key, val);
  },
  removeLocalItem(key) {
    store.remove(key);
  },
  clearLocalItems() {
    store.clearAll();
  }
};
