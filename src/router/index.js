// Composables
import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '../layouts/default/Main.vue';
import Login from '../layouts/auth/login.vue';
import Dashboard from '../views/Dashboard.vue';
import Attribute from '../views/attribute/index.vue';
import Category from '../views/category/index.vue';
import Product from '../views/product/index.vue';

const routes = [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    name: 'app',
    redirect: '/app/dashboard',
    component: AppLayout,
    children: [
      {
        path: 'dashboard',
        name: 'app.dashboard',
        component: Dashboard
      },
      {
        path: 'attribute',
        name: 'app.attribute',
        component: Attribute
      },
      {
        path: 'category',
        name: 'app.category',
        component: Category
      },
      {
        path: 'product',
        name: 'app.product',
        component: Product
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router;
