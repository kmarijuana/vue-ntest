<template>
    <div class="modal is-active">
      <div class="modal-background"></div>
      <div :class="ui_class">
          <slot name="dataHeader"></slot>
          <slot name="dataBody"></slot>
          <slot name="dataFooter"></slot>
      </div>
    </div>
</template>

<script>
export default {
  props:["ui_class"]
}
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