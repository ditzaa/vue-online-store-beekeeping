import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/despre-noi",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/produse/miere",
      name: "honey-products",
      component: () => import("../views/ProductSearchView.vue"),
    },
    {
      path: "/produse/altele",
      name: "other-products",
      component: () => import("../views/ProductSearchView.vue"),
    },
    {
      path: "/produs",
      name: "product",
      component: () => import("../views/DetailedProductView.vue"),
    },
    {
      path: "/admin/login",
      name: "adminLogin",
      component: () => import("../views/AdminLogin.vue"),
    },
    {
      path: "/admin/register",
      name: "adminRegister",
      component: () => import("../views/AdminRegister.vue"),
    },
    {
      path: "/admin/comenzi",
      name: "adminComenzi",
      component: () => import("../views/OrdersView.vue"),
    },
  ],
});

export default router;
