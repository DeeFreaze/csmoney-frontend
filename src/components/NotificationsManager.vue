<template>
  <div>
    <v-snackbar
      shaped
      :color="currentNotificationColor"
      v-model="show"
    >
      <v-progress-circular
        class="ma-2"
        indeterminate
        v-show="showProgress"
      ></v-progress-circular
      >{{ currentNotificationContent }}
      <template #action="{ attrs }">
        <v-btn text v-bind="attrs" @click.native="close">
          {{ $t('close') }}
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { AppNotification } from '@/store/main/state';
import { commitRemoveNotification } from '@/store/main/mutations';
import { readFirstNotification } from '@/store/main/getters';
import { dispatchRemoveNotification } from '@/store/main/actions';

@Component
export default class NotificationsManager extends Vue {
  public show: boolean = false;
  public text: string = '';
  public showProgress: boolean = false;
  public currentNotification: AppNotification | false = false;

  public async hide() {
    this.show = false;
  }

  public async close() {
    await this.hide();
    await this.removeCurrentNotification();
  }

  public async removeCurrentNotification() {
    if (this.currentNotification) {
      commitRemoveNotification(this.$store, this.currentNotification);
    }
  }

  public get firstNotification() {
    return readFirstNotification(this.$store);
  }

  public async setNotification(notification: AppNotification | false) {
    if (this.show) {
      await this.close();
    }
    if (notification) {
      this.currentNotification = notification;
      this.showProgress = notification.showProgress || false;
      this.show = true;
    } else {
      this.currentNotification = false;
    }
  }

  @Watch('firstNotification')
  public async onNotificationChange(
    newNotification: AppNotification | false
  ) {
    await this.setNotification(newNotification);
  }

  public get currentNotificationContent() {
    return (this.currentNotification && this.currentNotification.content) || '';
  }

  public get currentNotificationColor() {
    return (
      (this.currentNotification && this.currentNotification.color) || 'info'
    );
  }
}
</script>
