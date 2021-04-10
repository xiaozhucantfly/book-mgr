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
        {
          path: 'log',
          name: 'Log',
          component: () => import(/* webpackChunkName: "Log" */ '../views/Log/index.vue'),
        
        },
      ],
  },
  
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  // 异步请求，先拿到数据再渲染页面
  const reqArr = [];
  if (!store.state.characterInfo.length) {
    reqArr.push(store.dispatch('getCharacterInfo'));
  }
  if (!store.state.userInfo.account) {
    reqArr.push(store.dispatch('getUserInfo'));
  }
  
  await Promise.all(reqArr);
  
  next();

});
export default router;
