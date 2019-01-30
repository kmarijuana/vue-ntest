<template>
  <div class="row">
    <div class="col-12">
      <card :title="table.customer.title">
        <TableEasy :column="table.customer.column" :url="table.customer.url" 
          v-on:addRow="setting($event,'รายชื่อลูกค้า','insert')"
          v-on:editRow="setting($event,'รายชื่อลูกค้า','update')"
          v-on:deleteRow="setting($event,'รายชื่อลูกค้า','delete')"
        />
      </card>
    </div>
    <div class="col-12">
      <card :title="table.project.title">
        <TableEasy :column="table.project.column" :url="table.project.url"
          v-on:addRow="setting($event,'โครงการ','insert')"
          v-on:editRow="setting($event,'โครงการ','update')"
          v-on:deleteRow="setting($event,'โครงการ','delete')"
        />
      </card>
    </div>

    <Modal v-if="modal.show" :ui_class="modal.case=='delete'?'modal-card':'modal-card modal-content-width'">
      <header class="modal-card-head" slot="dataHeader">
        <p class="modal-card-title">
          {{modal.case=='insert'?'เพิ่ม' :modal.case=='update'?'แก้ไข':'ลบ'}}ข้อมูล{{modal.type}}
          {{modal.case!='insert'?` : ${modal.data.id}`:``}}
        </p>
        <button class="delete" aria-label="close" @click="modal.show = false"></button>
      </header>
      <section class="modal-card-body" slot="dataBody">
        <Delete v-if="modal.case == 'delete'"></Delete>
        <Customer v-else-if="modal.type=='รายชื่อลูกค้า'" :color="modal.case=='insert'?'#23d160' :modal.case=='update'?'#ffdd57':'#ff3860'" :setData="modal.data"/>
        <Project v-else-if="modal.type=='โครงการ'" :color="modal.case=='insert'?'#23d160' :modal.case=='update'?'#ffdd57':'#ff3860'" :setData="modal.data"/>
      </section>
      <footer class="modal-card-foot" slot="dataFooter">
        <button v-if="modal.case=='insert'" class="button is-success" @click="insert_data()">Insert new record</button>
        <button v-else-if="modal.case=='update'" class="button is-warning" style="color:white" @click="update_data()">Update record</button>
        <button v-else-if="modal.case=='delete'" class="button is-danger" @click="delete_data()">Delete record</button>
        <button class="button" @click="modal.show = false">Cancel</button>
      </footer>
    </Modal>
  </div>
</template>

<script>
import Table from "./Table";
import TableEasy from "./TableEasy";
import Modal from "./Modal";
import Delete from "./Modal/Delete";
import Customer from "./Modal/Customer";
import Project from "./Modal/Project";

export default {
  components: {
    Modal,
    Table,
    TableEasy,
    Delete,
    Customer,
    Project
  },
  mounted() {

  },
  data() {
    return {
      template: {
        tableClass: "table is-hoverable table is-narrow is-fullwidth",
        input: "input is-small is-rounded is-success"
      },
      rowIndex: null,
      modal: {
        show:false,
        data:{},
        type:null,
        case:null,
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
      },
      table: {
        customer: {
          title: "Customer Table",
          column: {
            id: {
              title: "ID",
              search: true,
              sort: true,
              fixed: "left",
              action: ""
            },
            code: {
              title: "Code",
              search: true,
              sort: true,
              fixed: "left",
              action: ""
            },
            name: {
              title: "Name of customer",
              search: true,
              sort: true,
              fixed: "",
              action: ""
            },
            contact_name: {
              title: "Contact",
              search: true,
              sort: true,
              fixed: "",
              action: ""
            },
            address_no: {
              title: "Address",
              search: true,
              sort: true,
              fixed: "",
              action: ""
            },
            parish: {
              title: "Parish",
              search: true,
              sort: true,
              fixed: "",
              action: ""
            },
            district: {
              title: "District",
              search: true,
              sort: true,
              fixed: "",
              action: ""
            },
            province: {
              title: "Province",
              search: true,
              sort: true,
              fixed: "",
              action: ""
            },
            phone: {
              title: "Phone",
              search: true,
              sort: true,
              fixed: "",
              action: ""
            },
            email: {
              title: "Email",
              search: true,
              sort: true,
              fixed: "",
              action: ""
            },
            fax: {
              title: "Fax",
              search: true,
              sort: true,
              fixed: "",
              action: ""
            },
            lineID: {
              title: "Line",
              search: true,
              sort: true,
              fixed: "",
              action: ""
            },
            Action: {
              title: "Action",
              search: false,
              sort: false,
              fixed: "right",
              action: "add"
            }
          },
          url: "http://192.168.4.12:9999/api/v1/customer/search/record",
          addRow: "addCustomer",
          editRow: "editCustomer",
          deleteRow: "deleteCustomer"
        },
        project: {
          title: "Project Table",
          column: {
            id: {
              title: "ID",
              search: true,
              sort: true,
              fixed: "left",
              action: ""
            },
            code: {
              title: "Code",
              search: true,
              sort: true,
              fixed: "",
              action: ""
            },
            name: {
              title: "ชื่อบริษัท",
              search: true,
              sort: true,
              fixed: "",
              action: ""
            },
            contact_name: {
              title: "Contact",
              search: true,
              sort: true,
              fixed: "",
              action: ""
            },
            address_no: {
              title: "Address",
              search: true,
              sort: true,
              fixed: "",
              action: ""
            },
            parish: {
              title: "Parish",
              search: true,
              sort: true,
              fixed: "",
              action: ""
            },
            district: {
              title: "District",
              search: true,
              sort: true,
              fixed: "",
              action: ""
            },
            province: {
              title: "Province",
              search: true,
              sort: true,
              fixed: "",
              action: ""
            },
            phone: {
              title: "Phone",
              search: true,
              sort: true,
              fixed: "",
              action: ""
            },
            email: {
              title: "Email",
              search: true,
              sort: true,
              fixed: "",
              action: ""
            },
            fax: {
              title: "Fax",
              search: true,
              sort: true,
              fixed: "",
              action: ""
            },
            lineID: {
              title: "Line",
              search: true,
              sort: true,
              fixed: "",
              action: ""
            },
            Action: {
              title: "Action",
              search: false,
              sort: false,
              fixed: "right",
              action: "add"
            }
          },
          url: "http://192.168.4.12:9999/api/v1/project/search/record",
          addRow: "addCustomer",
          editRow: "editCustomer",
          deleteRow: "deleteCustomer"
        }
      }
    };
  },
  methods: {
    setting(dataRow,dataType,dataCase){
      this.modal.show = true;
      this.modal.data = dataRow;
      this.modal.type = dataType;
      this.modal.case = dataCase
    },
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