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
  {
    path: "/accounts",
    name: "accounts",
    component: Requests,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
