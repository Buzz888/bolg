import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const createRouter = () => {
  const routes = [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/Index',
      name: '博客主页面',
      component: () => import('../views/Index.vue'),
      children: [
        {
          path: '/web', name: '前端', component: () => import('../views/children/template.vue'),
          children: [
            {
              path: '/web/:id', name: '前端内容', component: () => import('../views/children/context.vue')
            }
          ]
        },
        {
          path: '/server', name: '后端', component: () => import('../views/children/template.vue'),
          children: [
            {
              path: '/server/:id', name: '后端内容', component: () => import('../views/children/context.vue')
            }
          ]
        },
        {
          path: '/alg', name: '数据结构与算法', component: () => import('../views/children/template.vue'),
          children: [
            {
              path: '/alg/:id', name: '数据结构与算法内容', component: () => import('../views/children/context.vue')
            }
          ]
        },
        {
          path: '/mode', name: '设计模式', component: () => import('../views/children/template.vue'),
          children: [
            {
              path: '/mode/:id', name: '设计模式内容', component: () => import('../views/children/context.vue')
            }
          ]
        },
        {
          path: '/Note', name: '笔记', component: () => import('../views/children/Note.vue'),
        },
        {
          path: '/Note/:id', name: '笔记内容', component: () => import('../views/children/Note-template.vue'),
        }
      ]
    }
  ];
  const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
  });
  return router;
};
export { createRouter };
