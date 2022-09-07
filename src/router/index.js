import toyApp from '@/views/toy-app.vue';
import toyDetails from '@/views/toy-details.vue';
import toyEdit from '@/views/toy-edit.vue';
import loginPage from '@/views/login-page.vue';
import signupPage from '@/views/signup-page.vue';
import userDetails from '@/views/user-details.vue';
import reviewPage from '@/views/review-page.vue';

import {createRouter, createWebHashHistory} from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'toy-app',
      component: toyApp,
    },
    {
      path: '/toy/edit/:id?',
      name: 'toy-edit',
      component: toyEdit,
    },
    {
      path: '/toy/:id',
      name: 'toy-details',
      component: toyDetails,
    },
    {
      path: '/login',
      name: 'login-page',
      component: loginPage,
    },
    {
      path: '/signup',
      name: 'signup-page',
      component: signupPage,
    },
    {
      path: '/user',
      name: 'user-details',
      component: userDetails,
    },
    {
      path: '/review',
      name: 'review-page',
      component: reviewPage,
    },
  ],
});

export default router;
