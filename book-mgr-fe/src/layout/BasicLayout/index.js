import { defineComponent } from 'vue';
// import { setToken } from '@/helpers/token';
import Nav from './Nav/index.vue';
import store from '@/store';

export default defineComponent({
  components: {
    AppNav: Nav,
  },

});