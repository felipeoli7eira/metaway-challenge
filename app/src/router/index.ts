import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import useAuthToken from "./../hooks/auth/useAuthToken";

const appRoutes: RouteRecordRaw[] = [
  {
    path: "/app",
    name: "app.root",
    component: () => import("./../views/App/index.vue"),
    meta: {
      needAuth: true,
    },
    children: [
      {
        path: "",
        name: "app.index",
        component: () => import("./../views/App/Home/index.vue"),
        meta: {
          needAuth: true,
        },
      },
      {
        path: "/pessoas",
        name: "app.people",
        component: () => import("./../views/App/People/index.vue"),
        meta: {
          needAuth: true,
        },
      },
      {
        path: "/contatos",
        name: "app.contacts",
        component: () => import("./../views/App/Contacts/index.vue"),
        meta: {
          needAuth: true,
        },
      },
      {
        path: "meu-cadastro",
        name: "app.profile",
        component: () => import("./../views/App/Profile/index.vue"),
        meta: {
          needAuth: true,
        },
      },
      {
        path: "usuarios",
        name: "app.users",
        component: () => import("./../views/App/Users/index.vue"),
        meta: {
          needAuth: true,
        },
      },
    ],
  },
];

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "root",
    component: () => import("./../views/Home/index.vue"),
    meta: {},
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("./../views/SignUp/index.vue"),
    meta: {},
  },
  {
    path: "/signin",
    name: "signin",
    component: () => import("./../views/SignIn/index.vue"),
    meta: {},
  },

  ...appRoutes,
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

const { hasToken } = useAuthToken();

router.beforeEach((to, _ /* from */, next) => {
  if (to.meta.needAuth) {
    if (!hasToken()) {
      return next({
        name: "signin",
      });
    }

    return next();
  }

  return next();
});

export default router;
