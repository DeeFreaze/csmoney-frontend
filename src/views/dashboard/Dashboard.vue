<template>
  <div id="scroll-target">
    <v-navigation-drawer
      persistent
      :mini-variant="miniDrawer"
      v-model="showDrawer"
      fixed
      app
    >
      <v-layout column fill-height>
        <v-list shaped>
          <v-list-item-group
            color="indigo darken-4"
          >
            <v-subheader>CS:GO</v-subheader>
            <v-list-item to="/dashboard/tables/csmoneytable">
              <v-list-item-action>
                <img src="@/assets/csmoney.png" />
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  <v-chip class="mb-1" style="zoom: 0.5;" color="success" outlined>
                    <i class="mb-1 recordLed live"></i>
                    <pre style="font-family: 'Arial', sans-serif;"> LIVE</pre>
                  </v-chip>
                  {{ $t('CSMoney_Table') }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <v-divider></v-divider>
        <v-list shaped>
          <v-list-item-group
            color="indigo darken-4"
          >
            <v-subheader>{{ $t('Menu') }}</v-subheader>
            <v-list-item to="/dashboard/main">
              <v-list-item-action>
                <v-icon color="indigo darken-4">web</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ $t('main') }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item to="/dashboard/profile/view">
              <v-list-item-action>
                <v-icon color="indigo darken-4">person</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ $t('Profile') }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item to="/dashboard/filters">
              <v-list-item-action>
                <v-icon color="indigo darken-4">build</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ $t('filter_management') }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item to="/dashboard/faq">
              <v-list-item-action>
                <v-icon color="indigo darken-4">info</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>F.A.Q.</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <v-divider></v-divider>
        <v-list shaped subheader v-show="hasAdminAccess">
          <v-list-item-group
            color="indigo darken-4"
          >
            <v-subheader>{{ $t('Admin') }}</v-subheader>
            <v-list-item to="/dashboard/admin/users/all">
              <v-list-item-action>
                <v-icon color="indigo darken-4">group</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ $t('Manage_Users') }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
<!--            <v-list-item to="/dashboard/admin/users/create">-->
<!--              <v-list-item-action>-->
<!--                <v-icon color="indigo darken-4">person_add</v-icon>-->
<!--              </v-list-item-action>-->
<!--              <v-list-item-content>-->
<!--                <v-list-item-title>{{ $t('Create_User') }}</v-list-item-title>-->
<!--              </v-list-item-content>-->
<!--            </v-list-item>-->
          </v-list-item-group>
        </v-list>
        <v-spacer></v-spacer>
        <v-list shaped>
          <v-list-item-group
            color="indigo darken-4"
          >
            <v-list-item @click="logout">
              <v-list-item-action>
                <v-icon color="indigo darken-4">close</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ $t('Logout') }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item @click="switchMiniDrawer">
              <v-list-item-action>
                <v-icon
                  color="indigo darken-4"
                  v-html="miniDrawer ? 'chevron_right' : 'chevron_left'"
                ></v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ $t('Collapse') }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-layout>
    </v-navigation-drawer>

    <v-app-bar dark color="primary background-img" app >
      <v-app-bar-nav-icon @click.stop="switchShowDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title v-text="appName"></v-toolbar-title>
      <v-spacer></v-spacer>
      <i18n></i18n>
      <v-divider
        class="mr-4"
        inset
        vertical
      ></v-divider>

      <v-btn style="margin-right: 5px;" to="/dashboard/profile" icon>
        <v-avatar>
          <img v-bind:src="avatarUser" alt="avatar" />
        </v-avatar>
      </v-btn>
      <v-btn text @click="logout">
        {{ $t('Logout') }}
        <v-icon>login</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
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
                src="../../assets/icons/vk-social-network-logo.svg"
                contain
                height="40px"
                width="40px"
            ></v-img>
          </a>
        </v-col>
      </v-row>
    </v-footer>
    <onScroll/>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';

import { appName } from '@/env';
import {
  readDashboardMiniDrawer,
  readDashboardShowDrawer,
  readHasAdminAccess,
  readUserProfile,
} from '@/store/main/getters';
import {
  commitSetDashboardShowDrawer,
  commitSetDashboardMiniDrawer,
} from '@/store/main/mutations';
import { dispatchUserLogOut } from '@/store/main/actions';
import i18n from '@/components/i18n.vue';
import onScroll from '@/components/onScroll.vue';

const routeGuardMain = async (to, from, next) => {
  if (to.path === '/dashboard') {
    next('/dashboard/main');
  } else {
    next();
  }
};

@Component({
  components: {
    i18n, onScroll
  }
})
export default class Main extends Vue {
  public appName = appName;
  public vkLink = "https://vk.com/csgotradeorg";

  get avatarUser() {
    const userProfile = readUserProfile(this.$store);
    if (userProfile) {
      return userProfile.steam_avatar_url;
    }
  }

  public beforeRouteEnter(to, from, next) {
    routeGuardMain(to, from, next);
  }

  public beforeRouteUpdate(to, from, next) {
    routeGuardMain(to, from, next);
  }

  get miniDrawer() {
    return readDashboardMiniDrawer(this.$store);
  }

  get showDrawer() {
    return readDashboardShowDrawer(this.$store);
  }

  set showDrawer(value) {
    commitSetDashboardShowDrawer(this.$store, value);
  }

  public switchShowDrawer() {
    commitSetDashboardShowDrawer(
      this.$store,
      !readDashboardShowDrawer(this.$store)
    );
  }

  public switchMiniDrawer() {
    commitSetDashboardMiniDrawer(
      this.$store,
      !readDashboardMiniDrawer(this.$store)
    );
  }

  public get hasAdminAccess() {
    return readHasAdminAccess(this.$store);
  }

  public async logout() {
    await dispatchUserLogOut(this.$store);
  }
}
</script>

<style scoped>
.footer_bottom_social_link:hover {
  opacity: 0.6;
}

/*Live loader*/
.recordLed {
  padding-right: 5px;
  width: 13px;
  height: 15px;
  background-color: #27a51e;
  border-radius: 50%;
}

.live {
  animation: blinking 1s cubic-bezier(0.5, 0, 1, 1) infinite alternate;
}

@keyframes blinking {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
/*End live loader*/

.groww:hover {
  -webkit-transform: scale(1.2);
  -ms-transform: scale(1.2);
  transform: scale(1.2);
}
.opacity_off.v-btn:hover:before {
  opacity: 0;
}

.v-list-item__action:first-child {
  margin-right: 22px;
}
.v-subheader {
  padding: 8px;
}
</style>
