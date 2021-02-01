<template>
  <div id="app">
    <v-app>
      <v-main v-if="loggedIn === null">
        <v-container fill-height>
          <v-row align-content="center" justify="center">
            <div class="text-xs-center">
              <div class="headline my-5">{{ $t('loading') }}...</div>
              <v-progress-circular
                size="100"
                indeterminate
                color="indigo darken-4"
              ></v-progress-circular>
            </div>
          </v-row>
        </v-container>
      </v-main>
      <router-view v-else />
      <NotificationsManager></NotificationsManager>
    </v-app>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NotificationsManager from '@/components/NotificationsManager.vue';
import { readIsLoggedIn } from '@/store/main/getters';
import { dispatchCheckLoggedIn } from '@/store/main/actions';

@Component({
  components: {
    NotificationsManager
  }
})
export default class App extends Vue {
  get loggedIn() {
    return readIsLoggedIn(this.$store);
  }

  public async created() {
    await dispatchCheckLoggedIn(this.$store);
  }
}
</script>

<style>
.background-img{
  background-image: url('./assets/banner.jpg');
  background-size: cover;
  background-repeat: no-repeat;
}
.background-img-btn{
  background-image: url('./assets/banner.jpg');
  background-size: auto;
  background-repeat: no-repeat;
}
</style>