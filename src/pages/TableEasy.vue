<template>
  <div>
    <div v-if="table.data.data.length>0">
      <div>
        <div class="vertical scroll_hide" ref="table_width">
          <div class="freeze">
            <div class="vertical scroll_hide" ref="fixed_left_width">
              <div class="freeze" style="margin-bottom: 100px;">
                <Table
                  :table_class="'freeze_table table is-striped is-narrow is-hoverable is-fullwidth'"
                  :fixed="'left'"
                  :column="column"
                  :data="table.data.data"
                  :searchValue="table.searchValue"
                  v-on:reload="reloadTable($event)"
                  v-on:addRow="addRow($event)"
                  v-on:editRow="editRow($event)"
                  v-on:deleteRow="deleteRow($event)"
                />
              </div>
            </div>
          </div>
          <div class="vertical scroll_hide" :style="{width:scrolling_width+'px'}">
            <div class="vertical scroll_show" ref="scrollingTop" @scroll="scrolling()">
              <div class="freeze">
                <Table
                  :table_class="'table is-striped is-narrow is-hoverable is-fullwidth'"
                  :fixed="''"
                  :column="column"
                  :data="table.data.data"
                  :searchValue="table.searchValue"
                  v-on:reload="reloadTable($event)"
                  v-on:addRow="addRow($event)"
                  v-on:editRow="editRow($event)"
                  v-on:deleteRow="deleteRow($event)"
                />
              </div>
            </div>
          </div>
          <div class="freeze">
            <div class="vertical scroll_hide" ref="fixed_right_width">
              <div class="freeze" style="margin-bottom: 100px;">
                <Table
                  :table_class="'freeze_table table is-striped is-narrow is-hoverable is-fullwidth'"
                  :fixed="'right'"
                  :column="column"
                  :data="table.data.data"
                  :searchValue="table.searchValue"
                  v-on:reload="reloadTable($event)"
                  v-on:addRow="addRow($event)"
                  v-on:editRow="editRow($event)"
                  v-on:deleteRow="deleteRow($event)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="vertical scroll_hide" ref="table_width">
        <div class="freeze" style="width: 100% !important;">
          <div class="vertical scroll_hide" ref="fixed_left_width">
            <div class="freeze" style="margin-bottom: 100px;width: 100% !important;">
              <NodataTable
                :table_class="'freeze_table table is-striped is-narrow is-hoverable is-fullwidth'"
                :column="column"
                :loading="loading"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
      <Pagination
      :setTotalRecord="table.data.recordsTotal"
      :setCurrentPage="table.currentPage"
      :setPageSize="table.pageSize"
      :setPageList="table.pageList"
      v-on:refresh="setTable($event)"
    />
  </div>
</template>

<script>
import Pagination from "./Pagination";
import Table from "./Table";
import NodataTable from "./NodataTable";
export default {
  mounted() {
    this.reloadTable();
    window.addEventListener("load", this.resize_content_scrollwidth);
    window.addEventListener("resize", this.resize_content_scrollwidth);
  },
  updated() {
    this.resize_content_scrollwidth();
  },
  components: {
    Table,
    Pagination,
    NodataTable
  },
  props: ["column", "url"],
  data() {
    return {
      scrolling_width: 0,
      left: 0,
      loading:true,
      table: {
        currentPage: 1,
        pageSize: 50,
        pageList: [10, 25, 50, 100, 250, 500, 1000],
        data: {
          count: 0,
          data: [],
          recordsFiltered: 0,
          recordsTotal: 0
        },
        searchValue: {}
      }
    };
  },
  methods: {
    scrolling() {
      this.$refs.fixed_left_width.scrollTop = this.$refs.scrollingTop.scrollTop;
      this.$refs.fixed_right_width.scrollTop = this.$refs.scrollingTop.scrollTop;
    },
    resize_content_scrollwidth() {
      this.scrolling_width =
        this.$refs.table_width.offsetWidth -
        (this.$refs.fixed_left_width.offsetWidth +
          this.$refs.fixed_right_width.offsetWidth);
    },
    setTable(data) {
      this.table.currentPage = data[0];
      this.table.pageSize = data[1];
      this.reloadTable();
    },
    reloadTable() {
      let service = async () => {
        let columns = [];

        for (let key in this.column) {
          columns.push({
            data: key,
            name: "",
            searchable: true,
            orderable: true,
            search: {
              value:
                typeof this.table.searchValue[key] == "undefined"
                  ? ""
                  : this.table.searchValue[key],
              regex: false
            }
          });
        }

        let ndata = ``;
        columns.forEach((v, i) => {
          ndata += `&columns[${i}][data]=${
            columns[i].data
          }&columns[${i}][name]=${columns[i].name}&columns[${i}][searchable]=${
            columns[i].searchable
          }&columns[${i}][orderable]=${
            columns[i].orderable
          }&columns[${i}][search][value]=${
            columns[i].search.value
          }&columns[${i}][search][regex]=${columns[i].search.regex}`;
        });

        let res = await fetch(
          `${this.url}?draw=${this.table.currentPage}${window.encodeURI(
            ndata
          )}&order%5B0%5D%5Bcolumn%5D=0&order%5B0%5D%5Bdir%5D=desc&start=${this
            .table.currentPage *
            this.table.pageSize -
            this.table.pageSize}
          &length=${this.table.pageSize}
          &search%5Bvalue%5D=&search%5Bregex%5D=false&_=1547687980946`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: localStorage.getItem("token"),
              "Content-Type": "application/json"
            }
          }
        )
          .then(response => response.json())
          .then(response => {
            console.log(response);
            this.table.data = response;
            this.loading = false;
          })
          .catch(() => {
            //   this.table.data.data = {
            //   count: 0,
            //   data: [],
            //   recordsFiltered: 0,
            //   recordsTotal: 0
            // }
            console.log(
              "Can’t access " + this.url + " response. Blocked by browser?"
            );
          });
        // res = await res.json();
        // this.table.data = await res;
      };
      this.loading = true;
      service(this);
    },
    addRow(index) {
      this.$emit("addRow");
    },
    editRow(index) {
      this.$emit("editRow", this.table.data.data[index]);
    },
    deleteRow(index) {
      this.$emit("deleteRow", this.table.data.data[index]);
    }
    // showModal(index, content, type) {
    //   this.modal.show = true;
    //   this.modal.title = `Customer : ${
    //     this.table.customer.data.data[index].id
    //   }`;
    //   this.modal.content = content;
    //   this.modal.type = type;
    //   this.rowIndex = index;
    //   this.modal.data = { ...this.table.customer.data.data[index] };
    // }
  }
};
</script>

<style scoped>
/* @import "https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.css"; */

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  background-color: #f5f5f5;
}
::-webkit-scrollbar-track {
  background-color: #f5f5f5;
}
::-webkit-scrollbar-thumb {
  background-color: #1e1e25;
  border: 1px solid #41b883;
}

.vertical {
  display: inline-block;
  zoom: 1;
  *display: inline;
  height: 300px;
  width: 100%;
  background-color: #1e1e27;
}

.scroll_show {
  overflow-y: scroll;
  overflow-x: scroll;
}

.scroll_hide {
  overflow-y: hidden;
  overflow-x: hidden;
}

.freeze {
  display: inline-block;
  zoom: 1;
  *display: inline;
  vertical-align: top;
  width: fit-content;
}
</style>