<template>
  <v-container fluid>
    <v-card class="ma-3 pa-3">
      <v-card-title indigo-title>
        <div class="headline indigo--text">{{$t('User_Profile')}}</div>
      </v-card-title>
      <v-card-text>
        <div class="my-4">
          <div class="subheading secondary--text text--lighten-3">{{$t('Nickname')}}</div>
          <div class="title primary--text text--darken-2" v-if="userProfile && userProfile.steam_user_name">{{userProfile.steam_user_name}}</div>
          <div class="title primary--text text--darken-2" v-else>-----</div>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Store } from 'vuex';
import { readUserProfile } from '@/store/main/getters';

@Component
export default class UserProfile extends Vue {
  get userProfile() {
    return readUserProfile(this.$store);
  }

  public goToEdit() {
    this.$router.push('/main/profile/edit');
  }

  public goToPassword() {
    this.$router.push('/main/profile/password');
  }
}
</script>
