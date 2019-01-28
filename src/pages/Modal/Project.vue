<template>
      <section class="modal-card-body">
        <!-- <div v-for="(value, key) in data" :key="key">
          <label><h4>{{ key }}</h4></label>
          <input type="text" :class="template.input"  v-model="data[key]" >
          <hr>
        </div> -->

        Project
          <!-- <input type="text" :class="template.input"  v-model="formData.cus_id" >
          <input type="text" :class="template.input"  v-on:input="formData.cus_firstname = $event.target.value" :value="formData.cus_firstname" > -->
      </section>
</template>

<script>
export default {
  data() {
    return {
      formData:[],
      template: {
        tableClass: "table is-hoverable table is-narrow is-fullwidth",
        input: "input is-small is-rounded is-success"
      }
    };
  },
  props: ["title", "field", "column", "data"],
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