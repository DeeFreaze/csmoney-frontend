<template>
  <v-btn
    v-scroll="onScroll"
    v-show="fab"
    color="primary"
    fab
    class="align-self-end up"
    outlined
    @click="toTop"
  >
    <v-icon style="transform: rotate(-90deg);">double_arrow</v-icon>
  </v-btn>
</template>

<script>
export default {
  data() {
    return {
      fab: false,
    };
  },
  methods: {
    onScroll (e) {
      if (typeof window === 'undefined') return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 20;
    },
    toTop () {
      this.$vuetify.goTo(0);
    }
  }
};
</script>

<style scoped>
/*start up button style*/
/*.up now display: none, when scrollTop be > 80 display will be : block*/
.up {
  position: fixed;
  bottom: 13%;
  left: 95%;
  z-index: 999999;
}

/*when mouse hover on up button, button will be go up and down in 1 second*/
.up:hover{animation: move 1s linear}
@keyframes move{
  10%{
    bottom: 14%;
  }
  50%{
    bottom: 12%;
  }
  100%{
    bottom: 13%;
  }
}
</style>