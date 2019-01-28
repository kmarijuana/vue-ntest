<template>
  <div>
    <div id="tbody" class="table-container"  @scroll="a()">
      <div class="inner-container">
        <table class="table is-striped is-narrow is-hoverable is-fullwidth">
          <tr>
            <th v-for="(title, key) in column" :key="key">{{title}}
              <hr>
              <div class="field" v-if="key != 'Action'">
                <div class="control">
                  <input @input="reloadTable()" class="input is-primary is-small is-rounded" v-model="table.searchValue[key]" type="search" :placeholder="'Search by '+title">
                </div>
              </div>
              <div v-else>
                <span class="button is-success is-small is-outlined" @click="addRow(index)">
                  <i class="fas fa-plus-circle"></i>
                </span>
              </div>
            </th>
          </tr>
          <tbody>
            <tr class="nHover" v-for="(item, index) in table.data.data" :key="index">
              <td v-for="(title, key) in column" :key="key" :style="index!=null?'left:'+left+'px':''">
                <span v-if="key != 'Action'">{{ item[key] }}</span>
                <span v-else>
                  <span class="button is-warning is-small is-outlined" @click="editRow(index)">
                    <i class="fas fa-pencil-alt"></i>
                  </span>
                  <span class="button is-danger is-small is-outlined" @click="deleteRow(index)">
                    <i class="fas fa-minus-circle"></i>
                  </span>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
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
export default {
  mounted() {
    this.reloadTable();
  },
  components: {
    Pagination
  },
  props: ["column", "url"],
  data() {
    return {
      left:0,
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
        searchValue:{}
      }
    };
  },
  methods: {
     a(a){
    
        this.left = document.getElementById('tbody').scrollLeft - 0;
          console.log(this.left)
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
            search: { value: typeof this.table.searchValue[key] == 'undefined'?"":this.table.searchValue[key], regex: false }
          });
        }

        let ndata = ``;
        columns.forEach((v,i)=>{
          ndata +=`&columns[${i}][data]=${columns[i].data}&columns[${i}][name]=${columns[i].name}&columns[${i}][searchable]=${columns[i].searchable}&columns[${i}][orderable]=${columns[i].orderable}&columns[${i}][search][value]=${columns[i].search.value}&columns[${i}][search][regex]=${columns[i].search.regex}`
        })
         
        let res = await fetch(
          `${this.url}?draw=${
            this.table.currentPage
          }${window.encodeURI(ndata)}&order%5B0%5D%5Bcolumn%5D=0&order%5B0%5D%5Bdir%5D=desc
          &start=${this.table.currentPage * this.table.pageSize -
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
        );
        res = await res.json();
        this.table.data = res;
      };
      service(this);
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
@import "https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.css";
/* @import "https://use.fontawesome.com/releases/v5.6.3/css/all.css"; */

.nHover:hover {
  background-color: rgba(255, 255, 255, 0.2) !important;
}
/* th:nth-child(13),
td:nth-child(13) {
  text-align: center;
} */
th:last-child,
td:last-child {
    text-align: center;
    position: sticky;
    /* z-index: 1; */
  }

th:first-child,
td:first-child {
    text-align: center;
    position: sticky;
    /* z-index: 1; */
    left: 0px;
  }

th:first-child{
   z-index: 2;
}

td:first-child,
td:last-child {
  background-color: #1e1e26;
  font-size: large;
}

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

.inner-container {
  overflow-x: scroll;
    overflow-y: scroll;
    width: -webkit-fill-available;
    height: calc(100vh - 320px) !important;
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
  /* padding: 10px !important; */
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
  /* border: 1px solid; */

  font-size: large;
  padding: 10px !important;
}



.button {
  margin: 2px;
}

input:focus {
  min-width: calc(100vh - 500px);
}
</style>