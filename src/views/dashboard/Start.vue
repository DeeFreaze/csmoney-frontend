<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { store } from '@/store';
import { dispatchCheckLoggedIn } from '@/store/main/actions';
import { readIsLoggedIn } from '@/store/main/getters';

const startRouteGuard = async (to, from, next) => {

  await dispatchCheckLoggedIn(store);

  if (readIsLoggedIn(store)) {
    if (to.path === '/login' || to.path === '/' || (to.path as string).startsWith('/steam')) {
      next('/dashboard');
    } else if (to.path === '/rules') {
      next('/rules');
    } else {
      next();
    }
  } else if (readIsLoggedIn(store) === false) {
    if (to.path === '/' || (to.path as string).startsWith('/dashboard')) {
      next('/login');
    } else if (to.path === '/rules') {
      next('/rules');
    } else {
      next();
    }
  }
};

@Component
export default class Start extends Vue {
  public beforeRouteEnter(to, from, next) {
    startRouteGuard(to, from, next);
  }

  public beforeRouteUpdate(to, from, next) {
    startRouteGuard(to, from, next);
  }
}
</script>
