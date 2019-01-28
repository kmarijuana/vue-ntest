<template>
  <div class="level">
    <div class="level-left">
      <div class="level-item">
        <div class="field">
          <div class="control">
            <div class="select is-primary">
              <!-- <select v-model="pageList" @change="changePageSize()" >
                <option v-for="(value, key) in setPageList" :selected="setPageSize==value" :key="key" v-bind:value="value"  >
                  {{ value }}
                </option>
              </select>-->
              <select v-model="inputPageSize" @change="changePageSize(refresh)">
                <option
                  v-for="(value, key) in setPageList"
                  :selected="value==setPageSize"
                  :key="key"
                  v-bind:value="value"
                >{{ value }}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

      <!-- <p>dddd</p> -->

    <div class="level-right">
      <div class="level-item">
        <nav class="pagination " role="navigation" aria-label="pagination">
          <a class="pagination-previous button is-primary is-outlined" :disabled="currentPage<=1" @click="previous(refresh)">Previous</a>
          <a class="pagination-next button is-primary is-outlined" :disabled="currentPage==totalPage" @click="next(refresh)">Next page</a>
          <ul class="pagination-list">
            <li :hidden="currentPage<3"><a class="pagination-link button is-primary is-outlined" @click="changeCurrentPage(1,refresh)">1</a></li>
            <li :hidden="currentPage<3"><span class="pagination-ellipsis">&hellip;</span></li>
            <li v-for="(item, index) in totalPage" v-if="item > currentPage-2 && item < currentPage+2" :key="index" >
              <a :disabled="item == currentPage" class="pagination-link button is-primary is-outlined" @click="changeCurrentPage(item,refresh)" >{{item}}</a>
            </li>
            <li :hidden="currentPage>(totalPage-2)"><span class="pagination-ellipsis">&hellip;</span></li>
            <li :hidden="currentPage>(totalPage-2)"><a class="pagination-link button is-primary is-outlined" @click="changeCurrentPage(totalPage,refresh)">{{totalPage}}</a></li>
          </ul>
        </nav>

        <!-- <div
          v-for="(item, index) in totalPage"
          v-if="item > currentPage-3 && item < currentPage+3"
          :key="index"
        >
          <span
            class="button is-primary is-outlined"
            style="margin:2px"
            v-if="item == currentPage"
            disabled
          >{{item}}</span>
          <span
            class="button is-primary is-outlined"
            style="margin:2px"
            v-else
            @click="changeCurrentPage(item)"
          >{{item}}</span>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["setTotalRecord", "setCurrentPage", "setPageSize", "setPageList"],
  mounted() {
    this.currentPage = this.setCurrentPage;
  },
  watch:{
    setTotalRecord: function() {
      // console.log("setTotalRecord")
      this.changePageSize()
    },
    setCurrentPage: function(val) {
      // this.changePageSize()
      // console.log(this.currentPage)
      // console.log("dddddddds")
      this.currentPage = val
      this.changePageSize()
    } 
  },
  methods: {
    changePageSize(callback) {
      this.totalPage = Math.ceil(this.setTotalRecord / this.inputPageSize);
      if(this.currentPage > this.totalPage){
        this.currentPage = 1
      }
      typeof callback === "function"?callback():"";
    },
    changeCurrentPage(page,callback){
      this.currentPage = page;
      typeof callback === "function"?callback():"";
      // this.$emit("refresh", [this.currentPage,this.inputPageSize]);
    },
    previous(callback){
      if(this.currentPage<=1){return}
      this.currentPage--;
      typeof callback === "function"?callback():"";
      // this.$emit("refresh", [this.currentPage,this.inputPageSize])
    },
    next(callback){
      if(this.currentPage>=this.totalPage){return}
      this.currentPage++;
      typeof callback === "function"?callback():"";
      // this.$emit("refresh", [this.currentPage,this.inputPageSize])
    },
    refresh(){
      this.$emit("refresh", [this.currentPage,this.inputPageSize]);
    }
  },
  data() {
    return {
      totalPage: 0,
      currentPage: 1,
      recordsTotal: 1,
      inputPageSize: 50,
      // pageList: 0
    };
  }
};
</script>

<style scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.css";
.content ul{
      list-style: unset  !important;
}
</style>