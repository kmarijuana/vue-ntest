<template>
  <div>
    <notifications></notifications>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
export default {
  methods: {
    disableRTL() {
      if (!this.$rtl.isRTL) {
        this.$rtl.disableRTL();
      }
    },
    toggleNavOpen() {
      let root = document.getElementsByTagName("html")[0];
      root.classList.toggle("nav-open");
    }
  },
  mounted() {
    this.$watch("$route", this.disableRTL, { immediate: true });
    this.$watch("$sidebar.showSidebar", this.toggleNavOpen);
  }
};
</script>

<style lang="scss">
.footer {
  background-color: unset !important;
  padding: unset !important;
}

// .card-header {
//   background-color: whitesmoke !important;
// }

// .card-title {
//   font-weight: bolder !important;
//   font-size: large !important;
//   color: #1e1e2e !important;
//       letter-spacing: 5px;
// }

// .row-eq-height {
//   display: -webkit-box;
//   display: -webkit-flex;
//   display: -ms-flexbox;
//   display: flex;
// }
// .table {
//   background-color: #eee;
//   height: 100%;
//   margin-bottom: 0;
// }
// .table-responsive {
//   height: 100%;
// }
</style>
