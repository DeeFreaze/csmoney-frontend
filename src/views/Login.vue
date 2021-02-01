<template>
    <v-main class="background-img">
      <v-app-bar dark color="primary background-img" app dense>
        <v-icon left>extension</v-icon>
        <v-toolbar-title v-text="appName"></v-toolbar-title>
        <v-spacer></v-spacer>
        <i18n></i18n>
      </v-app-bar>
      <v-container class="text-center" fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12 card-login">
              <v-toolbar dark color="indigo darken-4">
                <v-toolbar-title style="width: 100%"
                >
                  {{ $t('welcome_to') }} {{ appName }}
                </v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-actions>
                <a :href="url" class="white--text" style="text-decoration:none; width: 100%">
                  <v-btn dark color="indigo darken-4" block>
                    {{ $t('login_with_steam') }}
                  </v-btn>
                </a>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <v-footer class="pa-1 background-img" dark padless fixed app>
        <v-row no-gutters>
          <v-col></v-col>
          <v-col align="center">
            <v-card-text class="pa-0 white--text">
              {{ new Date().getFullYear() }} — <strong>Copyright &copy; {{ appName }}.</strong> {{ $t('all_right_reserved') }}
            </v-card-text>
            <v-card-text class="pa-0 white--text">
              <a href="/rules" class="white--text" target="_blank">{{ $t('user_agreement') }}</a>
            </v-card-text>
          </v-col>
          <v-col align="right">
            <a :href="vkLink" target="_blank">
              <v-img
                  class="mr-8 footer_bottom_social_link"
                  src="@/assets/icons/vk-social-network-logo.svg"
                  contain
                  height="40px"
                  width="40px"
              ></v-img>
            </a>
          </v-col>
        </v-row>
      </v-footer>
    </v-main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { appName, frontUrl } from '@/env';
import { readLoginError } from '@/store/main/getters';
import i18n from '@/components/i18n.vue';

@Component({
  components: {
    i18n
  }
})
export default class Login extends Vue {
  public url: URL = new URL('https://steamcommunity.com/openid/login');
  public appName = appName;
  public vkLink = "https://vk.com/csgotradeorg";

  public get loginError() {
    return readLoginError(this.$store);
  }

  public beforeMount() {
    this.url.searchParams.append('openid.ns', 'http://specs.openid.net/auth/2.0');
    this.url.searchParams.append('openid.mode', 'checkid_setup');
    this.url.searchParams.append('openid.return_to', `${frontUrl}/steamLogin`);
    this.url.searchParams.append('openid.realm', `${frontUrl}/steamLogin`);
    this.url.searchParams.append(
        'openid.identity',
        'http://specs.openid.net/auth/2.0/identifier_select'
    );
    this.url.searchParams.append(
        'openid.claimed_id',
        'http://specs.openid.net/auth/2.0/identifier_select'
    );
  }
}
</script>

<style scoped>
  .card-login{
    opacity: 0.7;
    animation-name: opacity-out;
    animation-duration: 2s;
  }

  @keyframes opacity-in {
  from {opacity: 0.7;}
  to {opacity: 1;}
  }

  @keyframes opacity-out {
    from {opacity: 1;}
    to {opacity: 0.7;}
  }

  .card-login:hover{
    opacity: 1;
    animation-name: opacity-in;
    animation-duration: 2s;
  }

</style>
