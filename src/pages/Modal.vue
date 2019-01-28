<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <slot></slot>
  </div>
</template>

<script>
import Customer from "./Modal/Customer";
import Project from "./Modal/Project";
export default {
  components: {
    Customer,
    Project
  },
  data() {
    return {
      formData:[],
      template: {
        tableClass: "table is-hoverable table is-narrow is-fullwidth",
        input: "input is-small is-rounded is-success"
      }
    };
  },
  props: ["title", "content", 'type', "data"],
  mounted() {
    this.loadFrom()
  },
  methods: {
    save() {
      this.$emit("close", this.formData);
    },
    placeholder(val) {
      return `Input ${val}.`;
    },
    loadFrom(){
       this.formData = this.data;
    }
  }
};
</script>

<style scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.css";
.modal-card-title{
  margin: 0px !important;
}
</style>