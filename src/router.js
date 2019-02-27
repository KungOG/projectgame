import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import Home from './views/Home.vue'
import PlayGame from './views/PlayGame.vue'
import Login from './views/Login.vue'
import SignUp from './views/SignUp.vue'
import Highscore from './views/HighScore.vue'
import GameMenu from './views/GameMenu.vue'
import Rules from './views/Rules.vue'
import Settings from './views/Settings.vue'
import Winner from './views/Winner.vue'


Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: 'home',
    },
    {
      path: '*',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'signUp',
      component: SignUp
    },
    {
      path: '/gamemenu',
      name: 'gamemenu',
      component: GameMenu,
    },
    {
      path: '/highscore',
      name: 'Highscore',
      component: Highscore,
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
    },
    {
      path: '/rules',
      name: 'rules',
      component: Rules,
    },
    {
      path: '/playgame',
      name: 'playgame',
      component: PlayGame
    },
    {
      path: '/winner',
      name: 'winner',
      component: Winner,
    }
  ]
})
/* Checks if you are logged in or not */
router.beforeEach((to, from, next) => {
    var requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    var currentUser = firebase.auth().currentUser;

    if (requiresAuth && !currentUser) {
        next('/login');
    } else if (to.path == '/login' && currentUser) {
        next('/');

    } else {
        next();
    }

});

export default router;