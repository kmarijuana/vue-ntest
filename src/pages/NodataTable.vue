<template>
  <table :class="table_class">
    <tr>
      <th v-for="(obj, key) in column" :key="key" v-if="key!='Action'">
        <div>{{obj.title}}</div>
      </th>
    </tr>
    <tbody>
      <tr style="  height:  250px;">
        <td colspan="99">
          <span>{{loading?'loading....':'Data : 0 Record'}}</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ["table_class", "aa","column","loading"],
    data() {
    return {
      text:'Data : 0 Record'
    };
  },
  // created() {
  //   console.log("created");
  //       this.$emit('resize')
  // //   this.resize_content_scrollwidth();
  // },
  // mounted() {
  //   console.log("mounted");
  //       this.$emit('resize')
  //   // this.resize_content_scrollwidth();
  //   // this.reloadTable();
  //   // window.onresize = () => {
  //   //   console.log("DDDD");
  //   //   this.windowWidth = window.innerWidth;
  //   //   this.resize_content_scrollwidth();
  //   // };
  // },
  // updated() {
  //   console.log("updated")
  //  this.$emit('resize')
  // //   // setTimeout(()=>{
  // //     this.resize_content_scrollwidth();
  // //   // },500)
  // },
  // watch: {
  //   data: function(val) {
  //     // this.changePageSize()
  //     // console.log(this.currentPage)
  //     console.log("dddddddds")
  //     console.log(this.aa)
  //     this.data = val;
  //      this.$emit('resize')
  //     // this.resize_content_scrollwidth();
  //   }
  // },
};
</script>

<style scoped>
/* @import "https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.css"; */

.nHover:hover {
  background-color: rgba(50, 50, 50, 0.25) !important;
}

.freeze_table th,
.freeze_table td {
  text-align: center;
  background-color: #1e1e26;
}

table {
  font-family: monospace;
}
tr:nth-child(even) {
  background: rgba(53, 73, 94, 1) !important;
}
tr:nth-child(odd) {
  background: rgba(53, 73, 94, 0.5) !important;
}
td {
  white-space: nowrap;
  color: #00d1b2 !important;
  font-weight: 600;
}
th {
  position: sticky;
  background: transparent;
  color: #ffffff !important;
  padding: 9px 0px;
  top: 0;
  line-height: normal;
  font-size: 15px;
  white-space: nowrap;
  margin-top: -20px;
  background-color: #1e1e26;
  z-index: 1;
  font-size: large;
  padding: 10px !important;
}

td {
  padding: 5px;
  height: 40px;
  width: 40px;
}

.freeze_table {
  background-color: #0099dd;
  z-index: 2;
}

</style>