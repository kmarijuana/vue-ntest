<template>
  <div>
    ลบข้อมูลนี้หรือไม่
  </div>
</template>

<script>
export default {
  props:['color','data'],
  created(){
    console.log(this.data)
  },
  updated(){
    console.log(this.data)
  },
  data() {
    return {
      active: null,
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      modal: {
        tabSelect: {
          level1: null,
          subTab: null,
          subTab: null
        },
        customer: {
          add: false,
          edit: false,
          delete: false,
          data: {}
        },
        project: {
          add: false,
          edit: false,
          delete: false,
          data: {}
        }
      }
    };
  },
  methods: {
    next() {
      const active = parseInt(this.active);
      this.active = active < 2 ? active + 1 : 0;
    }
  }
};
</script>


<style scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.css";
.modal-card-title {
  margin: 0px !important;
}
.modal-content-width {
  width: 90% !important;
}
p {
  font-weight: bolder;
  font-size: large;
}
.tabs li a {
  color: grey;
}
.content ul {
  list-style: disc outside;
  margin: 0px !important;
  padding: 0px !important;
}
</style>