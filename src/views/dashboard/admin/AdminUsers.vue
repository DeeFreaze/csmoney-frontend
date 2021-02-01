<template>
  <div>
    <v-toolbar light>
      <v-toolbar-title>
        {{ $t('Manage_Users') }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-divider class="mx-4" inset vertical></v-divider>
      <div class="headline">
        {{ $t('online') }}
        <span class="pr-4 primary--text">{{ countOnlineUsersHandler() }}</span>
      </div>
    </v-toolbar>
    <v-divider class="mt-2"></v-divider>
    <v-data-table class="elevation-1" :headers="headers" :items="users" sort-by="last_online" :sort-desc="true">
      <template #item="{ item }">
        <tr>
          <td>{{ item.id }}</td>
          <td>
            {{ item.steam_user_name }}
            <v-icon color="success" v-if="item.is_online" class="live" style="zoom: 0.7;">
              fiber_manual_record
            </v-icon>
          </td>
          <td>
            <a :href="`https://steamcommunity.com/profiles/${item.steam_id}`"
               class="black--text"
               target="_blank"
            >{{ item.steam_id }}</a>
          </td>
          <td>
            <v-icon v-if="item.is_active">done</v-icon>
          </td>
          <td>
            <v-icon v-if="item.is_superuser">done</v-icon>
          </td>
          <td>
            <span v-if="!!item.last_online">{{ unixTimestampHandler(item.last_online) }}</span>
            <span v-else>{{ $t('is_empty') }}</span>
          </td>
          <td>
            <v-btn slot="activator" class="ml-2" x-small icon
                   :to="{name: 'main-admin-users-edit', params: {id: item.id}}">
              <v-icon>edit</v-icon>
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import {readAdminUsers} from '@/store/admin/getters';
import {dispatchGetUsers} from '@/store/admin/actions';
import router from "@/router";

export default {
  computed: {
    headers() {
      return [
        {
          text: 'Id',
          sortable: true,
          value: 'id',
          align: 'left',
        },
        {
          text: 'Steam name',
          sortable: true,
          value: 'name',
          align: 'left',
        },
        {
          text: 'Steam Id',
          sortable: true,
          value: 'steam_id',
          align: 'left',
        },
        {
          text: 'Is Active',
          sortable: true,
          value: 'isActive',
          align: 'left',
        },
        {
          text: 'Is Superuser',
          sortable: true,
          value: 'isSuperuser',
          align: 'left',
        },
        {
          text: 'Last online',
          sortable: true,
          value: 'last_online',
          align: 'left',
        },
        {
          text: router.app.$t('actions'),
          align: 'left',
          sortable: false,
          value: 'actions',
          width: '6%',
          fixed: true
        },
      ]
    },
    users() {
      return readAdminUsers(this.$store);
    },
  },
  async mounted() {
    await dispatchGetUsers(this.$store);
  },
  methods: {
    unixTimestampHandler: (unixTimestamp) => {
      return new Date(unixTimestamp * 1000).toLocaleString();
    },
    countOnlineUsersHandler() {
      let countOnlineUsers = 0;

      for (let i = 0; i <= this.users.length - 1; i++) {
        this.users[i].is_online = false;

        if (!!this.users[i].last_online) {
          let now = new Date();
          let timestamp = this.users[i].last_online * 1000;
          let lastOnline = new Date(timestamp);
          let diff = now - lastOnline;

          let min = Math.floor(diff / 60000);

          if (min < 10) {
            ++countOnlineUsers;
            this.users[i].is_online = true;
          }
        }
      }
      return countOnlineUsers;
    },
  }
}
</script>

<style scoped>
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
</style>