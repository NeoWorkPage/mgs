import  {action, observable } from 'mobx';
import { computed } from "mobx/lib/mobx";

class LoaderStore {
  @observable loading;

  constructor() {
    this.loading = false;
  }

  @computed get loaderApi() {
    return this.loading
  }

  @action loadingUpdate = value => {
    this.loading = value
  }
}

const loaderStore = new LoaderStore()

export default loaderStore;
