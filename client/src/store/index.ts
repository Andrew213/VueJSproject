import { InjectionKey } from "vue";
import { createStore, Module, Store } from "vuex";
import postModule, { postState } from "./postModule";

export type RootState = {
  post: postState;
};

export const key: InjectionKey<Store<RootState>> = Symbol();

export default createStore<RootState>({
  modules: {
    post: postModule,
  },
});
