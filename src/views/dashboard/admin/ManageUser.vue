<template>
  <v-container fluid>
    <v-card class="ma-3 pa-3">
      <v-card-title primary-title>
        <div class="headline">
          {{ $t('manage_user') }} - <span class="primary--text">{{ steamUserName }}</span>
        </div>
        <v-spacer></v-spacer>
        <v-divider class="mx-4 mb-2" inset vertical></v-divider>
        <div class="headline">
          {{ $t('last_online') }}
          <span class="pr-4 primary--text">{{ unixTimestampHandler(lastOnline) }}</span>
        </div>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <template>
          <v-form ref="form" lazy-validation>
            <div class="subheading secondary--text text--lighten-2">
              Steam Id -
              <a :href="`https://steamcommunity.com/profiles/${steamId}`"
                 target="_blank"
              >{{ steamId }}</a>
            </div>
            <br/>
            <div class="subheading secondary--text text--lighten-2">
              User is superuser
              <span v-if="isSuperuserDefaultValue" class="primary--text">(currently is a superuser)</span>
              <span v-else class="primary--text">(currently is not a superuser)</span>
            </div>
            <v-checkbox label="Is Superuser" v-model="isSuperuser"></v-checkbox>
            <div class="subheading secondary--text text--lighten-2">
              User is active
              <span v-if="isActiveDefaultValue" class="primary--text">(currently active)</span>
              <span v-else class="primary--text">(currently not active)</span></div>
            <v-checkbox label="Is Active" v-model="isActive"></v-checkbox>
          </v-form>
        </template>
      </v-card-text>
      <v-divider class="pb-2"></v-divider>
      <v-card-actions>
        <v-btn
            @click="getFiltersByUserHandler(user.id)"
        >{{ $t('get_filters_by_user') }}</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="cancel">{{ $t('cancel') }}</v-btn>
        <v-btn @click="reset">{{ $t('reset') }}</v-btn>
        <v-btn @click="submit(user)">{{ $t('save') }}</v-btn>
      </v-card-actions>
    </v-card>
    <v-divider v-if="!!filtersArr.length"></v-divider>
    <admin-user-filters-manage
        v-if="!!filtersArr.length"
        :filtersArr="filtersArr"
    />
  </v-container>
</template>

<script>
import {readAdminOneUser} from "@/store/admin/getters";
import {dispatchGetUsers} from "@/store/admin/actions";
import {updateUser, getFiltersByUser} from "@/utils";
import AdminUserFiltersManage from "@/components/admin/AdminUserFiltersManage.vue";


export default {
  components: {
    'admin-user-filters-manage': AdminUserFiltersManage,
  },
  data() {
    return {
      filtersArr: [],
      steamId: 0,
      steamUserName: '',
      isActive: false,
      isSuperuser: false,
      isActiveDefaultValue: false,
      isSuperuserDefaultValue: false,
      lastOnline: '',
    }
  },
  computed: {
    user() {
      return readAdminOneUser(this.$store)(+this.$router.currentRoute.params.id);
    }
  },
  async mounted() {
    await dispatchGetUsers(this.$store);
    await this.getUserData();
  },
  methods: {
    unixTimestampHandler: (unixTimestamp) => {
      return new Date(unixTimestamp * 1000).toLocaleString();
    },
    getUserData() {
      if (this.user) {
        this.steamId = this.user.steam_id;
        this.steamUserName = this.user.steam_user_name;
        this.isActiveDefaultValue = this.user.is_active;
        this.isSuperuserDefaultValue = this.user.is_superuser;
        this.isActive = this.user.is_active;
        this.isSuperuser = this.user.is_superuser;
        this.lastOnline = this.user.last_online;
      }
    },
    async getFiltersByUserHandler(id) {
      const response = await getFiltersByUser(this.$store, id);
      if (response.data) this.filtersArr = response.data;
    },
    async submit(user) {
      user.is_active = this.isActive;
      user.is_superuser = this.isSuperuser;
      const payload = JSON.stringify(user);
      await updateUser(this.$store, user.id, payload);
      this.$router.push('/dashboard/admin/users');
    },
    cancel() {
      this.$router.back();
    },
    reset() {
      if (this.user) {
        this.steamId = this.user.steam_id;
        this.steamUserName = this.user.steam_user_name;
        this.isActive = this.isActiveDefaultValue;
        this.isSuperuser = this.isSuperuserDefaultValue;
      }
    },
  }
}
</script>

<style scoped>

</style>