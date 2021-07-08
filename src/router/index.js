import Vue from "vue";
import VueRouter from "vue-router";
import Requests from "@/views/Requests.vue";
import RequestPage from "@/views/RequestPage";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "requests",
    component: Requests,
  },
  {
    path: "/requests/:id",
    component: RequestPage,
    props: true,
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
