import { createStore } from 'vuex';
import { character } from '@/service';
import { result } from '@/helpers/utils';

export default createStore({
  state: {
    characterInfo: {},
  },
  mutations: {
    setCharacterInfo(state, characterInfo) {
      state.characterInfo = characterInfo;
    },
  },
  actions: {
    async getCharacterInfo(store) {
      const res = await character.list();

      result(res)
        .success(({ data }) => {
          store.commit('setCharacterInfo', data)
        })
    }
  },
  modules: {
  },
});
