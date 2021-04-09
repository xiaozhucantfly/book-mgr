import { createRouter, createWebHashHistory } from 'vue-router';
import store from '@/store';
const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth/index.vue'),
  
  },
  {
    path: '/',
    name: 'BasicLayout',
    component: () => import(/* webpackChunkName: "BasicLayout" */ '../layout/BasicLayout/index.vue'),
      children: [
        {
          path: 'books',
          name: 'Books',
          component: () => import(/* webpackChunkName: "Books" */ '../views/Books/index.vue'),
        
        },
        {
          path: 'books/:id',
          name: 'BookDetail',
          component: () => import(/* webpackChunkName: "BookDetail" */ '../views/BookDetail/index.vue'),
        
        },
        {
          path: 'user',
          name: 'User',
          component: () => import(/* webpackChunkName: "User" */ '../views/Users/index.vue'),
        
        },
      ],
  },
  
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (!store.state.characterInfo.length) {
     store.dispatch('getCharacterInfo');
  }
   store.dispatch('getUserInfo');
  
  next();

});
export default router;
