import Vue from "vue";
import VueRouter from "vue-router";
import sinav1 from "../views/Sinav1.vue";
import sinav2 from "../views/Sinav2.vue";
import SinavListesi from "../views/SinavListesi.vue";
import sinavlar from "../views/Sinavlar.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Anasayfa",
    component: SinavListesi,
  },

  {
    path: "/sinav/:konu",
    name: "Anasayfa",
    component: sinavlar,
    props: true,
  },
  {
    path: "/sinav1",
    name: "Sınav 1",
    component: sinav1,
  },
  {
    path: "/sinav2",
    name: "Sınav 2",
    component: sinav2,
  },
 
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
