import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '@/views/IniciarSesion/LoginView.vue';
import HomeView from '@/views/HomeView.vue';
import store from '@/store';
import RecuperarPassView from '@/views/IniciarSesion/RecuperarPassView';
import SolicitudEnviadaView from '@/views/IniciarSesion/SolicitudEnviadaView.vue';
import ResetearPassView from '@/views/IniciarSesion/ResetearPassView.vue';
import NombreEjercicioView from '@/views/PlanEntrenamiento/NombreEjercicioView.vue';
import TipoEjercicioView from '@/views/PlanEntrenamiento/TipoEjercicioView.vue';
import MusculoView from '@/views/PlanEntrenamiento/MusculoView.vue';
import TipoRutinaView from '@/views/PlanEntrenamiento/TipoRutinaView.vue';
import CargoView from '@/views/Personal/CargoView.vue';
import TipoDocumentoView from '@/views/Persona/TipoDocumentoView';
import GeneroView from '@/views/FichaAntropometrica/GeneroView.vue';
import FormacionView from '@/views/Aprendiz/FormacionView.vue';
import EjercicioView from '@/views/PlanEntrenamiento/EjercicioView.vue'
import RutinaView from '@/views/PlanEntrenamiento/RutinaView.vue'
import RutinaEjercicioView from '@/views/PlanEntrenamiento/RutinaEjercicioView.vue';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/recuperarPass',
    name: 'recuperarPass',
    component: RecuperarPassView,
  },
  {
    path: '/solicitudEnviada',
    name: 'solicitudEnviada',
    component: SolicitudEnviadaView,
  },
  {
    path: '/resetearPass',
    name: 'resetearPass',
    component: ResetearPassView,
  },
  {
    path: '/nombreEjercicio',
    name: 'nombreEjercicio',
    component: NombreEjercicioView,
  },
  {
    path: '/tipoEjercicio',
    name: 'tipoEjercicio',
    component: TipoEjercicioView,
  },
  {
    path: '/musculo',
    name: 'musculo',
    component: MusculoView,
  },
  {
    path: '/tipoRutina',
    name: 'tipoRutina',
    component: TipoRutinaView,
  },
  {
    path: '/cargo',
    name: 'cargo',
    component: CargoView,
  },
  {
    path: '/tipoDocumento',
    name: 'tipoDocumento',
    component: TipoDocumentoView,
  },
  {
    path: '/genero',
    name: 'genero',
    component: GeneroView,
  },
  {
    path: '/formacion',
    name: 'formacion',
    component: FormacionView,
  },
  {
    path: '/ejercicio',
    name: 'ejercicio',
    component: EjercicioView,
  },
  {
    path: '/rutina',
    name: 'rutina',
    component: RutinaView,
  },
  {
    path: '/rutinaEjercicio',
    name: 'rutinaEjercicio',
    component: RutinaEjercicioView,
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      requiresAuth: true,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
