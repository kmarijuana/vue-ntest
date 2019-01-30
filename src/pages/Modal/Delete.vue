<template>
  <div>
    ลบข้อมูลนี้หรือไม่
  </div>
</template>

<script>
export default {
  props:['color','data'],
  data() {
    return {
     
      }
  },
  methods: {
  }
};
</script>


<style scoped>
/* @import "https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.css"; */
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