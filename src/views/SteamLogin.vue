<template>
  <div id="app">
    <v-app>
      <v-main>
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
    </v-app>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { api } from '@/api';
import { appName, apiUrl } from '@/env';
import { readLoginError } from '@/store/main/getters';
import { dispatchLogIn } from '@/store/main/actions';
import { commitAddNotification } from '@/store/main/mutations';
import router from "@/router";

@Component
export default class Login extends Vue {
  public appName = appName;

  public async authUser() {
    const queries = this.$route.query;
    await dispatchLogIn(this.$store, queries);
    await this.showMainDashboard();
  }

  public async mounted() {
    await this.authUser();
  }

  public showMainDashboard() {
    window.location.href = '/dashboard/main';
  }
}
</script>

<style scoped>
.lds-heart {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  transform: rotate(45deg);
  transform-origin: 40px 40px;
}
.lds-heart div {
  top: 32px;
  left: 32px;
  position: absolute;
  width: 32px;
  height: 32px;
  background: #cef;
  animation: lds-heart 1.2s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
}
.lds-heart div:after,
.lds-heart div:before {
  content: ' ';
  position: absolute;
  display: block;
  width: 32px;
  height: 32px;
  background: #cef;
}
.lds-heart div:before {
  left: -24px;
  border-radius: 50% 0 0 50%;
}
.lds-heart div:after {
  top: -24px;
  border-radius: 50% 50% 0 0;
}
@keyframes lds-heart {
  0% {
    transform: scale(0.95);
  }
  5% {
    transform: scale(1.1);
  }
  39% {
    transform: scale(0.85);
  }
  45% {
    transform: scale(1);
  }
  60% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(0.9);
  }
}
</style>
