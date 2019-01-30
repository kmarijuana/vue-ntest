<template>
  <div class="row">
    <div class="col-12">
      <card :title="table.customer.title">
        <TableEasy
          :column="table.customer.column"
          :url="table.customer.url"
          v-on:addRow="setting($event,'รายชื่อลูกค้า','insert')"
          v-on:editRow="setting($event,'รายชื่อลูกค้า','update')"
          v-on:deleteRow="setting($event,'รายชื่อลูกค้า','delete')"
        />
      </card>
    </div>
    <div class="col-12">
      <card :title="table.project.title">
        <TableEasy
          :column="table.project.column"
          :url="table.project.url"
          v-on:addRow="setting($event,'โครงการ','insert')"
          v-on:editRow="setting($event,'โครงการ','update')"
          v-on:deleteRow="setting($event,'โครงการ','delete')"
        />
      </card>
    </div>

    <!-- <div class="col-12">
      <card :title="table.customer.title">
        <Table
          :column="table.customer.column"
          :url="'http://192.168.4.12:9999/api/v1/customer/search/record'"
          v-on:editRow="editCustomer($event)"
          v-on:deleteRow="deleteCustomer($event)"
        />
      </card>
    </div>

    <div class="col-12">
      <card :title="table.project.title">
        <Table
          :column="table.project.column"
          :url="'http://192.168.4.12:9999/api/v1/project/search/record'"
          v-on:editRow="editProject($event)"
          v-on:deleteRow="deleteProject($event)"
        />
      </card>
    </div>-->
    <Modal v-if="modal.show" :ui_class="modal.case=='delete'?'modal-card':'modal-card modal-content-width'">
      <header class="modal-card-head" slot="dataHeader">
        <p  class="modal-card-title">
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

    <!-- <div v-if="modal.customer.add" class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card modal-content-width">
        <header class="modal-card-head">
          <p class="modal-card-title">เพิ่มข้อมูลรายชื่อลูกค้า : {{ modal.customer.data.id }}</p>
          <button class="delete" aria-label="close" @click="modal.customer.add = false"></button>
        </header>
        <section class="modal-card-body">
          
          <div>
            <v-tabs v-model="active" color="#23d160" dark slider-color="white">
              <v-tab>ข้อมูลหลัก</v-tab>
              <v-tab ripple>ข้อมูลทางการเงิน</v-tab>
              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <div class="row">
                      <div class="col-12">
                        <div class="tabs">
                          <ul>
                            <li></li>
                            <li
                              v-bind:class="{ 'is-active': modal.tabSelect.subTab == 'customerData' || modal.tabSelect.subTab == null }"
                              @click="modal.tabSelect.subTab = 'customerData'"
                            >
                              <a>ข้อมูลลูกค้า</a>
                            </li>
                            <li
                              v-bind:class="{ 'is-active': modal.tabSelect.subTab == 'addressInformation' }"
                              @click="modal.tabSelect.subTab = 'addressInformation'"
                            >
                              <a>ที่อยู่</a>
                            </li>
                          </ul>
                        </div>
                        <div class="content" style="black">
                          <div
                            v-show="modal.tabSelect.subTab == 'customerData' || modal.tabSelect.subTab == null"
                          >
                            <div class="content">
                              <div class="row">
                                <div class="col-md-6 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">
                                      ประเภทลูกค้า
                                      :
                                    </label>
                                    <select
                                      class="form-control"
                                      id="type_id"
                                      name="type_id"
                                      required
                                    >
                                      <option value selected disabled>กรุณาเลือกประเภทลูกค้า</option>
                                      <option value="0">บุคคลธรรมดา</option>
                                      <option value="1">นิติบุคคล</option>
                                      <option value="2">หน่วยงานราชการ</option>
                                    </select>
                                  </div>
                                </div>
                                <div class="col-md-6 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">
                                      กลุ่มลูกค้า
                                      :
                                    </label>
                                    <select
                                      class="form-control"
                                      id="group_id"
                                      name="group_id"
                                      required
                                    >
                                      <option value selected disabled>กรุณาเลือกกลุ่มลูกค้า</option>
                                      <option disabled value="0">== ไม่กำหนด ==</option>
                                      <option disabled value="1">งานราชการ</option>
                                      <option value="2">ผู้รับเหมา</option>
                                      <option value="3">เจ้าของงาน</option>
                                      <option disabled value="4">วัด</option>
                                      <option disabled value="5">งานการกุศล</option>
                                      <option value="7">ร้านวัสดุ</option>
                                      <option value="6">อื่นๆ</option>
                                      <option value="8">คู่ค้า/โรงงานเข็ม</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-md-6 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">รหัสลูกค้า :</label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      id="code"
                                      name="code"
                                      required
                                      placeholder="รหัสลูกค้า"
                                    >
                                  </div>
                                </div>
                                <div class="col-md-6 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">สาขาที่ :</label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      id="branchNo"
                                      name="branchNo"
                                      required
                                      placeholder="สาขาที่"
                                    >
                                  </div>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-md-6 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">คำนำหน้า :</label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      id="prefix"
                                      name="prefix"
                                      placeholder="คำนำหน้า"
                                      list="listPrefixs"
                                      required
                                    >
                                    <datalist id="listPrefixs">
                                      <option value="นาย"></option>
                                      <option value="นาง"></option>
                                      <option value="นางสาว"></option>
                                      <option value="บมจ."></option>
                                      <option value="บจก."></option>
                                      <option value="หจก."></option>
                                      <option value="หสม."></option>
                                      <option value="ร้าน"></option>
                                    </datalist>
                                  </div>
                                </div>
                                <div class="col-md-6 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">
                                      ชื่อลูกค้า /
                                      บริษัท
                                      :
                                    </label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      id="name"
                                      name="name"
                                      required
                                      oninvalid="this.setCustomValidity(`กรุณากรอกชื่อลูกค้า / บริษัท`)"
                                      oninput="setCustomValidity(``)"
                                      onkeyup="maps.name=this.value; maps.moveMarker();"
                                      placeholder="ชื่อ-นามสกุล"
                                    >
                                  </div>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-md-6 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">
                                      ชื่อลูกค้า /
                                      บริษัท
                                      (MAC5)
                                      <span
                                        style="color:red"
                                      >* SO only</span> :
                                    </label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      id="name_for_so"
                                      name="name_for_so"
                                      required
                                      placeholder="ชื่อ-นามสกุล"
                                    >
                                  </div>
                                </div>
                                <div class="col-md-6 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">
                                      เบอร์บริษัท
                                      :
                                    </label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      id="phone"
                                      name="phone"
                                      required
                                      placeholder="เบอร์บริษัท"
                                    >
                                  </div>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-md-6 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">
                                      ชื่อผู้มีอำนาจ
                                      :
                                    </label>
                                    <div class="row">
                                      <div class="col-md-6 col-xs-6">
                                        <input
                                          type="text"
                                          class="form-control"
                                          id="author_f_name"
                                          name="author_f_name"
                                          placeholder="ชื่อ"
                                        >
                                      </div>
                                      <div class="col-md-6 col-xs-6">
                                        <input
                                          type="text"
                                          class="form-control"
                                          id="author_l_name"
                                          name="author_l_name"
                                          placeholder="นามสกุล"
                                        >
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="col-md-6 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">
                                      วันที่ติดต่อครั้งแรก
                                      :
                                    </label>
                                    <div
                                      class="input-group date"
                                      data-provide="datepicker"
                                      data-date-format="yyyy-mm-dd"
                                    >
                                      <input
                                        type="text"
                                        class="form-control"
                                        id="contact_date"
                                        name="contact_date"
                                        placeholder="วันที่ติดต่อครั้งแรก"
                                        readonly
                                      >
                                      <div class="input-group-addon">
                                        <span class="glyphicon glyphicon-th"></span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-md-12 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">
                                      วัตถุประสงค์ของบริษัท
                                      :
                                    </label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      id="objective"
                                      name="objective"
                                      placeholder="วัตถุประสงค์ของบริษัท"
                                    >
                                  </div>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-md-4 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">ผู้จัดทำ :</label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      id="provider"
                                      name="provider"
                                      placeholder="ผู้จัดทำ"
                                    >
                                  </div>
                                </div>
                                <div class="col-md-4 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">ผู้ตรวจสอบ :</label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      id="inspector"
                                      name="inspector"
                                      placeholder="ผู้ตรวจสอบ"
                                    >
                                  </div>
                                </div>
                                <div class="col-md-4 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">ผู้อนุมัติ :</label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      id="approvers"
                                      name="approvers"
                                      placeholder="ผู้อนุมัติ"
                                    >
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div v-show="modal.tabSelect.subTab == 'addressInformation'">
                            <div class="content">
                              <div class="row">
                                <div class="col-md-6 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">เลขที่ :</label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      id="address_no"
                                      name="address_no"
                                      required
                                      placeholder="เลขที่"
                                    >
                                  </div>
                                </div>
                                <div class="col-md-6 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">ถนน :</label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      id="address_road"
                                      name="address_road"
                                      required
                                      placeholder="ถนน"
                                    >
                                  </div>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-md-6 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">จังหวัด :</label>
                                    <select
                                      class="form-control"
                                      id="province"
                                      name="province"
                                      required
                                      onchange="operation.thai.change.district(this.value)"
                                    >
                                      <option value selected disabled>กรุณาเลือกจังหวัด</option>
                                      <option value="10">กรุงเทพมหานคร</option>
                                      <option value="11">สมุทรปราการ</option>
                                      <option value="12">นนทบุรี</option>
                                      <option value="13">ปทุมธานี</option>
                                      <option value="14">พระนครศรีอยุธยา</option>
                                      <option value="15">อ่างทอง</option>
                                      <option value="16">ลพบุรี</option>
                                      <option value="17">สิงห์บุรี</option>
                                      <option value="18">ชัยนาท</option>
                                      <option value="19">สระบุรี</option>
                                      <option value="20">ชลบุรี</option>
                                      <option value="21">ระยอง</option>
                                      <option value="22">จันทบุรี</option>
                                      <option value="23">ตราด</option>
                                      <option value="24">ฉะเชิงเทรา</option>
                                      <option value="25">ปราจีนบุรี</option>
                                      <option value="26">นครนายก</option>
                                      <option value="27">สระแก้ว</option>
                                      <option value="30">นครราชสีมา</option>
                                      <option value="31">บุรีรัมย์</option>
                                      <option value="32">สุรินทร์</option>
                                      <option value="33">ศรีสะเกษ</option>
                                      <option value="34">อุบลราชธานี</option>
                                      <option value="35">ยโสธร</option>
                                      <option value="36">ชัยภูมิ</option>
                                      <option value="37">อำนาจเจริญ</option>
                                      <option value="38">บึงกาฬ</option>
                                      <option value="39">หนองบัวลำภู</option>
                                      <option value="40">ขอนแก่น</option>
                                      <option value="41">อุดรธานี</option>
                                      <option value="42">เลย</option>
                                      <option value="43">หนองคาย</option>
                                      <option value="44">มหาสารคาม</option>
                                      <option value="45">ร้อยเอ็ด</option>
                                      <option value="46">กาฬสินธุ์</option>
                                      <option value="47">สกลนคร</option>
                                      <option value="48">นครพนม</option>
                                      <option value="49">มุกดาหาร</option>
                                      <option value="50">เชียงใหม่</option>
                                      <option value="51">ลำพูน</option>
                                      <option value="52">ลำปาง</option>
                                      <option value="53">อุตรดิตถ์</option>
                                      <option value="54">แพร่</option>
                                      <option value="55">น่าน</option>
                                      <option value="56">พะเยา</option>
                                      <option value="57">เชียงราย</option>
                                      <option value="58">แม่ฮ่องสอน</option>
                                      <option value="60">นครสวรรค์</option>
                                      <option value="61">อุทัยธานี</option>
                                      <option value="62">กำแพงเพชร</option>
                                      <option value="63">ตาก</option>
                                      <option value="64">สุโขทัย</option>
                                      <option value="65">พิษณุโลก</option>
                                      <option value="66">พิจิตร</option>
                                      <option value="67">เพชรบูรณ์</option>
                                      <option value="70">ราชบุรี</option>
                                      <option value="71">กาญจนบุรี</option>
                                      <option value="72">สุพรรณบุรี</option>
                                      <option value="73">นครปฐม</option>
                                      <option value="74">สมุทรสาคร</option>
                                      <option value="75">สมุทรสงคราม</option>
                                      <option value="76">เพชรบุรี</option>
                                      <option value="77">ประจวบคีรีขันธ์</option>
                                      <option value="80">นครศรีธรรมราช</option>
                                      <option value="81">กระบี่</option>
                                      <option value="82">พังงา</option>
                                      <option value="83">ภูเก็ต</option>
                                      <option value="84">สุราษฎร์ธานี</option>
                                      <option value="85">ระนอง</option>
                                      <option value="86">ชุมพร</option>
                                      <option value="90">สงขลา</option>
                                      <option value="91">สตูล</option>
                                      <option value="92">ตรัง</option>
                                      <option value="93">พัทลุง</option>
                                      <option value="94">ปัตตานี</option>
                                      <option value="95">ยะลา</option>
                                      <option value="96">นราธิวาส</option>
                                    </select>
                                  </div>
                                </div>
                                <div class="col-md-6 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">อำเภอ :</label>
                                    <select
                                      class="form-control"
                                      id="district"
                                      name="district"
                                      required
                                      onchange="operation.thai.change.parish(this.value)"
                                      disabled="disabled"
                                    >
                                      <option value selected disabled>กรุณาเลือกอำเภอ</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-md-6 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">ตำบล :</label>
                                    <select
                                      class="form-control"
                                      id="parish"
                                      name="parish"
                                      disabled="disabled"
                                      required
                                      onchange="operation.thai.moveMarker(
                                    this.options[this.selectedIndex].getAttribute(`lat`),
                                    this.options[this.selectedIndex].getAttribute(`lng`))"
                                    >
                                      <option value selected disabled>กรุณาเลือกตำบล</option>
                                    </select>
                                  </div>
                                </div>
                                <div class="col-md-6 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">
                                      รหัสไปรษณีย์
                                      :
                                    </label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      id="zipcode"
                                      name="zipcode"
                                      required
                                      placeholder="รหัสไปรษณีย์"
                                    >
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <div class="row">
                      <div class="col-12">
                        <div class="tabs">
                          <ul>
                            <li></li>
                            <li
                              v-bind:class="{ 'is-active': modal.tabSelect.subTab == 'contact' || modal.tabSelect.subTab == null }"
                              @click="modal.tabSelect.subTab = 'contact'"
                            >
                              <a>ผู้ติดต่อหลัก</a>
                            </li>
                            <li
                              v-bind:class="{ 'is-active': modal.tabSelect.subTab == 'financial' }"
                              @click="modal.tabSelect.subTab = 'financial'"
                            >
                              <a>การเงิน</a>
                            </li>
                            <li
                              v-bind:class="{ 'is-active': modal.tabSelect.subTab == 'attachment' }"
                              @click="modal.tabSelect.subTab = 'attachment'"
                            >
                              <a>เอกสารแนบ</a>
                            </li>
                          </ul>
                        </div>
                        <div class="content" style="black">
                          <div
                            v-show="modal.tabSelect.subTab == 'contact' || modal.tabSelect.subTab == null"
                          >
                            <TableEasy
                              :column="table.customer.column"
                              :url="'http://192.168.4.12:9999/api/v1/customer/search/record'"
                              v-on:editRow="editCustomer($event)"
                              v-on:deleteRow="deleteCustomer($event)"
                            />
                          </div>
                          <div v-show="modal.tabSelect.subTab == 'financial'">
                            <div class="content">
                              <div class="row">
                                <div class="col-md-12 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">
                                      หมายเลขผู้เสียภาษี
                                      :
                                    </label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      name="taxNo"
                                      id="taxNo"
                                      placeholder="หมายเลขผู้เสียภาษี"
                                    >
                                  </div>
                                </div>
                                <div class="col-md-12 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">เครดิตเทอม :</label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      name="creditTerm"
                                      id="creditTerm"
                                      placeholder="เครดิตเทอม"
                                    >
                                  </div>
                                </div>
                                <div class="col-md-12 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">
                                      ทุนจดทะเบียน
                                      :
                                    </label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      name="registeredCapital"
                                      id="registeredCapital"
                                      placeholder="ทุนจดทะเบียน"
                                    >
                                  </div>
                                </div>
                                <div class="col-md-12 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">
                                      ผู้รับการติดต่อการวางบิลและรับเงิน
                                      :
                                    </label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      name="billing_contact"
                                      id="billing_contact"
                                      placeholder="ผู้รับการติดต่อการวางบิลและรับเงิน"
                                    >
                                  </div>
                                </div>
                                <div class="col-md-12 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">เบอร์โทร :</label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      name="billing_phone"
                                      id="billing_phone"
                                      placeholder="เบอร์โทร"
                                    >
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div v-show="modal.tabSelect.subTab == 'attachment'">
                            <div class="content">
                              <div class="row">
                                <div class="col-md-12 col-xs-12">
                                  <div class="form-group">
                                    <table class="table setStyle">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <div
                                              class="container"
                                              style="width:-webkit-fill-available"
                                            >
                                              <span
                                                style="position: absolute; height: 60px; width: 40px; z-index: 1;"
                                                onclick="operation.file.change(1)"
                                              ></span>
                                              <input id="check1" class="effect-one" type="checkbox">
                                              <label class="checkbox-label" for="check1">
                                                <span class="inner-label"></span>
                                                <span class="icon-label"></span>
                                                <div hidden>
                                                  <input
                                                    type="file"
                                                    class="form-control"
                                                    id="file1"
                                                    onchange="operation.file.manageObj.insertObj(1)"
                                                  >
                                                </div>
                                                <span style="margin-left: 55px;">
                                                  <label
                                                    for="recipient-name"
                                                    class="col-form-label"
                                                  >สำเนาบัตรประจำตัวผู้เสียภาษีอากร</label>
                                                </span>
                                              </label>
                                            </div>
                                            <span class="spacer"></span>
                                          </td>
                                          <td></td>
                                          <td>
                                            <div
                                              class="form-control"
                                              style="text-align: center"
                                              id="customer_file1"
                                            >
                                              <p
                                                onclick="operation.file.change(1)"
                                                style="cursor: pointer;"
                                              >กรุณาเลือกไฟล์</p>
                                            </div>
                                          </td>
                                        </tr>

                                        <tr id="trProgres1" hidden>
                                          <td colspan="3">
                                            <div class="progress" id="progress1">
                                              <div
                                                class="progress-bar"
                                                role="progressbar"
                                                style="width: 0%;"
                                                aria-valuenow="0"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                              ></div>
                                            </div>
                                          </td>
                                        </tr>

                                        <tr>
                                          <td>
                                            <div
                                              class="container"
                                              style="width:-webkit-fill-available"
                                            >
                                              <span
                                                style="position: absolute; height: 60px; width: 40px; z-index: 1;"
                                                onclick="operation.file.change(2)"
                                              ></span>
                                              <input id="check2" class="effect-one" type="checkbox">
                                              <label class="checkbox-label" for="check2">
                                                <span class="inner-label"></span>
                                                <span class="icon-label"></span>
                                                <div hidden>
                                                  <input
                                                    type="file"
                                                    class="form-control"
                                                    id="file2"
                                                    onchange="operation.file.manageObj.insertObj(2)"
                                                  >
                                                </div>
                                                <span style="margin-left: 55px;">
                                                  <label
                                                    for="recipient-name"
                                                    class="col-form-label"
                                                  >
                                                    สำเนาทะเบียนภาษีมูลค่าเพิ่ม
                                                    ( ภพ.20 )
                                                  </label>
                                                </span>
                                              </label>
                                            </div>
                                            <span class="spacer"></span>
                                          </td>
                                          <td></td>
                                          <td>
                                            <div
                                              class="form-control"
                                              style="text-align: center"
                                              id="customer_file2"
                                            >
                                              <p
                                                onclick="operation.file.change(2)"
                                                style="cursor: pointer;"
                                              >กรุณาเลือกไฟล์</p>
                                            </div>
                                          </td>
                                        </tr>

                                        <tr id="trProgres2" hidden>
                                          <td colspan="3">
                                            <div class="progress" id="progress2">
                                              <div
                                                class="progress-bar"
                                                role="progressbar"
                                                style="width: 0%;"
                                                aria-valuenow="0"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                              ></div>
                                            </div>
                                          </td>
                                        </tr>

                                        <tr>
                                          <td>
                                            <div
                                              class="container"
                                              style="width:-webkit-fill-available"
                                            >
                                              <span
                                                style="position: absolute; height: 60px; width: 40px; z-index: 1;"
                                                onclick="operation.file.change(3)"
                                              ></span>
                                              <input id="check3" class="effect-one" type="checkbox">
                                              <label class="checkbox-label" for="check3">
                                                <span class="inner-label"></span>
                                                <span class="icon-label"></span>
                                                <div hidden>
                                                  <input
                                                    type="file"
                                                    class="form-control"
                                                    id="file3"
                                                    onchange="operation.file.manageObj.insertObj(3)"
                                                  >
                                                </div>
                                                <span style="margin-left: 55px;">
                                                  <label
                                                    for="recipient-name"
                                                    class="col-form-label"
                                                  >สำเนาทะเบียนพาณิชย์</label>
                                                </span>
                                              </label>
                                            </div>
                                            <span class="spacer"></span>
                                          </td>
                                          <td></td>
                                          <td>
                                            <div
                                              class="form-control"
                                              style="text-align: center"
                                              id="customer_file3"
                                            >
                                              <p
                                                onclick="operation.file.change(3)"
                                                style="cursor: pointer;"
                                              >กรุณาเลือกไฟล์</p>
                                            </div>
                                          </td>
                                        </tr>

                                        <tr id="trProgres3" hidden>
                                          <td colspan="3">
                                            <div class="progress" id="progress3">
                                              <div
                                                class="progress-bar"
                                                role="progressbar"
                                                style="width: 0%;"
                                                aria-valuenow="0"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                              ></div>
                                            </div>
                                          </td>
                                        </tr>

                                        <tr>
                                          <td>
                                            <div
                                              class="container"
                                              style="width:-webkit-fill-available"
                                            >
                                              <span
                                                style="position: absolute; height: 60px; width: 40px; z-index: 1;"
                                                onclick="operation.file.change(4)"
                                              ></span>
                                              <input id="check4" class="effect-one" type="checkbox">
                                              <label class="checkbox-label" for="check4">
                                                <span class="inner-label"></span>
                                                <span class="icon-label"></span>
                                                <div hidden>
                                                  <input
                                                    type="file"
                                                    class="form-control"
                                                    id="file4"
                                                    onchange="operation.file.manageObj.insertObj(4)"
                                                  >
                                                </div>
                                                <span style="margin-left: 55px;">
                                                  <label
                                                    for="recipient-name"
                                                    class="col-form-label"
                                                  >สำเนาหนังสือรับรองการจดทะเบียนนิติบุคคล</label>
                                                </span>
                                              </label>
                                            </div>
                                            <span class="spacer"></span>
                                          </td>
                                          <td></td>
                                          <td>
                                            <div
                                              class="form-control"
                                              style="text-align: center"
                                              id="customer_file4"
                                            >
                                              <p
                                                onclick="operation.file.change(4)"
                                                style="cursor: pointer;"
                                              >กรุณาเลือกไฟล์</p>
                                            </div>
                                          </td>
                                        </tr>

                                        <tr id="trProgres4" hidden>
                                          <td colspan="3">
                                            <div class="progress" id="progress4">
                                              <div
                                                class="progress-bar"
                                                role="progressbar"
                                                style="width: 0%;"
                                                aria-valuenow="0"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                              ></div>
                                            </div>
                                          </td>
                                        </tr>

                                        <tr>
                                          <td>
                                            <div
                                              class="container"
                                              style="width:-webkit-fill-available"
                                            >
                                              <span
                                                style="position: absolute; height: 60px; width: 40px; z-index: 1;"
                                                onclick="operation.file.change(5)"
                                              ></span>
                                              <input id="check5" class="effect-one" type="checkbox">
                                              <label class="checkbox-label" for="check5">
                                                <span class="inner-label"></span>
                                                <span class="icon-label"></span>
                                                <div hidden>
                                                  <input
                                                    type="file"
                                                    class="form-control"
                                                    id="file5"
                                                    onchange="operation.file.manageObj.insertObj(5)"
                                                  >
                                                </div>
                                                <span style="margin-left: 55px;">
                                                  <label
                                                    for="recipient-name"
                                                    class="col-form-label"
                                                  >เอกสารแนะนำบริษัท</label>
                                                </span>
                                              </label>
                                            </div>
                                            <span class="spacer"></span>
                                          </td>
                                          <td></td>
                                          <td>
                                            <div
                                              class="form-control"
                                              style="text-align: center"
                                              id="customer_file5"
                                            >
                                              <p
                                                onclick="operation.file.change(5)"
                                                style="cursor: pointer;"
                                              >กรุณาเลือกไฟล์</p>
                                            </div>
                                          </td>
                                        </tr>
                                        <tr id="trProgres5" hidden>
                                          <td colspan="3">
                                            <div class="progress" id="progress5">
                                              <div
                                                class="progress-bar"
                                                role="progressbar"
                                                style="width: 0%;"
                                                aria-valuenow="0"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                              ></div>
                                            </div>
                                          </td>
                                        </tr>

                                        <tr>
                                          <td>
                                            <div
                                              class="container"
                                              style="width:-webkit-fill-available"
                                            >
                                              <span
                                                style="position: absolute; height: 60px; width: 40px; z-index: 1;"
                                                onclick="operation.file.change(6)"
                                              ></span>
                                              <input id="check6" class="effect-one" type="checkbox">
                                              <label class="checkbox-label" for="check6">
                                                <span class="inner-label"></span>
                                                <span class="icon-label"></span>
                                                <div hidden>
                                                  <input
                                                    type="file"
                                                    class="form-control"
                                                    id="file6"
                                                    onchange="operation.file.manageObj.insertObj(6)"
                                                  >
                                                </div>
                                                <span style="margin-left: 55px;">
                                                  <label
                                                    for="recipient-name"
                                                    class="col-form-label"
                                                  >อื่นๆ</label>
                                                </span>
                                              </label>
                                            </div>
                                            <span class="spacer"></span>
                                          </td>
                                          <td>
                                            <input
                                              type="text"
                                              class="form-control"
                                              name="file_other"
                                              id="file_other"
                                              placeholder="ระบุ"
                                              disabled
                                            >
                                          </td>
                                          <td>
                                            <div
                                              class="form-control"
                                              style="text-align: center"
                                              id="customer_file6"
                                            >
                                              <p
                                                onclick="operation.file.change(6)"
                                                style="cursor: pointer;"
                                              >กรุณาเลือกไฟล์</p>
                                            </div>
                                          </td>
                                        </tr>
                                        <tr id="trProgres6" hidden>
                                          <td colspan="3">
                                            <div class="progress" id="progress6">
                                              <div
                                                class="progress-bar"
                                                role="progressbar"
                                                style="width: 0%;"
                                                aria-valuenow="0"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                              ></div>
                                            </div>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs>
            <div class="text-xs-center mt-3">
              <v-btn @click="next">next tab</v-btn>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="save()">Save</button>
          <button class="button" @click="modal.customer.add = false">Cancel</button>
        </footer>
      </div>
    </div>-->
    <div v-if="modal.customer.edit" class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card modal-content-width">
        <header class="modal-card-head">
          <p class="modal-card-title">แก้ไขข้อมูลรายชื่อลูกค้า : {{ modal.customer.data.id }}</p>
          <button class="delete" aria-label="close" @click="modal.customer.edit = false"></button>
        </header>
        <section class="modal-card-body">
          <div>
            <v-tabs v-model="active" color="#ffdd57" dark slider-color="white">
              <v-tab>ข้อมูลหลัก</v-tab>
              <v-tab ripple>ข้อมูลทางการเงิน</v-tab>
              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <div class="row">
                      <div class="col-12">
                        <div class="tabs">
                          <ul>
                            <li></li>
                            <li
                              v-bind:class="{ 'is-active': modal.tabSelect.subTab == 'customerData' || modal.tabSelect.subTab == null }"
                              @click="modal.tabSelect.subTab = 'customerData'"
                            >
                              <a>ข้อมูลลูกค้า</a>
                            </li>
                            <li
                              v-bind:class="{ 'is-active': modal.tabSelect.subTab == 'addressInformation' }"
                              @click="modal.tabSelect.subTab = 'addressInformation'"
                            >
                              <a>ที่อยู่</a>
                            </li>
                          </ul>
                        </div>
                        <div class="content" style="black">
                          <div
                            v-show="modal.tabSelect.subTab == 'customerData' || modal.tabSelect.subTab == null"
                          >
                            <div class="content">
                              <div class="row">
                                <div class="col-md-6 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">
                                      ประเภทลูกค้า
                                      :
                                    </label>
                                    <select
                                      class="form-control"
                                      id="type_id"
                                      name="type_id"
                                      required
                                    >
                                      <option value selected disabled>กรุณาเลือกประเภทลูกค้า</option>
                                      <option value="0">บุคคลธรรมดา</option>
                                      <option value="1">นิติบุคคล</option>
                                      <option value="2">หน่วยงานราชการ</option>
                                    </select>
                                  </div>
                                </div>
                                <div class="col-md-6 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">
                                      กลุ่มลูกค้า
                                      :
                                    </label>
                                    <select
                                      class="form-control"
                                      id="group_id"
                                      name="group_id"
                                      required
                                    >
                                      <option value selected disabled>กรุณาเลือกกลุ่มลูกค้า</option>
                                      <option disabled value="0">== ไม่กำหนด ==</option>
                                      <option disabled value="1">งานราชการ</option>
                                      <option value="2">ผู้รับเหมา</option>
                                      <option value="3">เจ้าของงาน</option>
                                      <option disabled value="4">วัด</option>
                                      <option disabled value="5">งานการกุศล</option>
                                      <option value="7">ร้านวัสดุ</option>
                                      <option value="6">อื่นๆ</option>
                                      <option value="8">คู่ค้า/โรงงานเข็ม</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-md-6 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">รหัสลูกค้า :</label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      id="code"
                                      name="code"
                                      required
                                      placeholder="รหัสลูกค้า"
                                    >
                                  </div>
                                </div>
                                <div class="col-md-6 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">สาขาที่ :</label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      id="branchNo"
                                      name="branchNo"
                                      required
                                      placeholder="สาขาที่"
                                    >
                                  </div>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-md-6 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">คำนำหน้า :</label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      id="prefix"
                                      name="prefix"
                                      placeholder="คำนำหน้า"
                                      list="listPrefixs"
                                      required
                                    >
                                    <datalist id="listPrefixs">
                                      <option value="นาย"></option>
                                      <option value="นาง"></option>
                                      <option value="นางสาว"></option>
                                      <option value="บมจ."></option>
                                      <option value="บจก."></option>
                                      <option value="หจก."></option>
                                      <option value="หสม."></option>
                                      <option value="ร้าน"></option>
                                    </datalist>
                                  </div>
                                </div>
                                <div class="col-md-6 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">
                                      ชื่อลูกค้า /
                                      บริษัท
                                      :
                                    </label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      id="name"
                                      name="name"
                                      required
                                      oninvalid="this.setCustomValidity(`กรุณากรอกชื่อลูกค้า / บริษัท`)"
                                      oninput="setCustomValidity(``)"
                                      onkeyup="maps.name=this.value; maps.moveMarker();"
                                      placeholder="ชื่อ-นามสกุล"
                                    >
                                  </div>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-md-6 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">
                                      ชื่อลูกค้า /
                                      บริษัท
                                      (MAC5)
                                      <span
                                        style="color:red"
                                      >* SO only</span> :
                                    </label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      id="name_for_so"
                                      name="name_for_so"
                                      required
                                      placeholder="ชื่อ-นามสกุล"
                                    >
                                  </div>
                                </div>
                                <div class="col-md-6 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">
                                      เบอร์บริษัท
                                      :
                                    </label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      id="phone"
                                      name="phone"
                                      required
                                      placeholder="เบอร์บริษัท"
                                    >
                                  </div>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-md-6 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">
                                      ชื่อผู้มีอำนาจ
                                      :
                                    </label>
                                    <div class="row">
                                      <div class="col-md-6 col-xs-6">
                                        <input
                                          type="text"
                                          class="form-control"
                                          id="author_f_name"
                                          name="author_f_name"
                                          placeholder="ชื่อ"
                                        >
                                      </div>
                                      <div class="col-md-6 col-xs-6">
                                        <input
                                          type="text"
                                          class="form-control"
                                          id="author_l_name"
                                          name="author_l_name"
                                          placeholder="นามสกุล"
                                        >
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="col-md-6 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">
                                      วันที่ติดต่อครั้งแรก
                                      :
                                    </label>
                                    <div
                                      class="input-group date"
                                      data-provide="datepicker"
                                      data-date-format="yyyy-mm-dd"
                                    >
                                      <input
                                        type="text"
                                        class="form-control"
                                        id="contact_date"
                                        name="contact_date"
                                        placeholder="วันที่ติดต่อครั้งแรก"
                                        readonly
                                      >
                                      <div class="input-group-addon">
                                        <span class="glyphicon glyphicon-th"></span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-md-12 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">
                                      วัตถุประสงค์ของบริษัท
                                      :
                                    </label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      id="objective"
                                      name="objective"
                                      placeholder="วัตถุประสงค์ของบริษัท"
                                    >
                                  </div>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-md-4 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">ผู้จัดทำ :</label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      id="provider"
                                      name="provider"
                                      placeholder="ผู้จัดทำ"
                                    >
                                  </div>
                                </div>
                                <div class="col-md-4 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">ผู้ตรวจสอบ :</label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      id="inspector"
                                      name="inspector"
                                      placeholder="ผู้ตรวจสอบ"
                                    >
                                  </div>
                                </div>
                                <div class="col-md-4 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">ผู้อนุมัติ :</label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      id="approvers"
                                      name="approvers"
                                      placeholder="ผู้อนุมัติ"
                                    >
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div v-show="modal.tabSelect.subTab == 'addressInformation'">
                            <div class="content">
                              <div class="row">
                                <div class="col-md-6 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">เลขที่ :</label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      id="address_no"
                                      name="address_no"
                                      required
                                      placeholder="เลขที่"
                                    >
                                  </div>
                                </div>
                                <div class="col-md-6 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">ถนน :</label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      id="address_road"
                                      name="address_road"
                                      required
                                      placeholder="ถนน"
                                    >
                                  </div>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-md-6 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">จังหวัด :</label>
                                    <select
                                      class="form-control"
                                      id="province"
                                      name="province"
                                      required
                                      onchange="operation.thai.change.district(this.value)"
                                    >
                                      <option value selected disabled>กรุณาเลือกจังหวัด</option>
                                      <option value="10">กรุงเทพมหานคร</option>
                                      <option value="11">สมุทรปราการ</option>
                                      <option value="12">นนทบุรี</option>
                                      <option value="13">ปทุมธานี</option>
                                      <option value="14">พระนครศรีอยุธยา</option>
                                      <option value="15">อ่างทอง</option>
                                      <option value="16">ลพบุรี</option>
                                      <option value="17">สิงห์บุรี</option>
                                      <option value="18">ชัยนาท</option>
                                      <option value="19">สระบุรี</option>
                                      <option value="20">ชลบุรี</option>
                                      <option value="21">ระยอง</option>
                                      <option value="22">จันทบุรี</option>
                                      <option value="23">ตราด</option>
                                      <option value="24">ฉะเชิงเทรา</option>
                                      <option value="25">ปราจีนบุรี</option>
                                      <option value="26">นครนายก</option>
                                      <option value="27">สระแก้ว</option>
                                      <option value="30">นครราชสีมา</option>
                                      <option value="31">บุรีรัมย์</option>
                                      <option value="32">สุรินทร์</option>
                                      <option value="33">ศรีสะเกษ</option>
                                      <option value="34">อุบลราชธานี</option>
                                      <option value="35">ยโสธร</option>
                                      <option value="36">ชัยภูมิ</option>
                                      <option value="37">อำนาจเจริญ</option>
                                      <option value="38">บึงกาฬ</option>
                                      <option value="39">หนองบัวลำภู</option>
                                      <option value="40">ขอนแก่น</option>
                                      <option value="41">อุดรธานี</option>
                                      <option value="42">เลย</option>
                                      <option value="43">หนองคาย</option>
                                      <option value="44">มหาสารคาม</option>
                                      <option value="45">ร้อยเอ็ด</option>
                                      <option value="46">กาฬสินธุ์</option>
                                      <option value="47">สกลนคร</option>
                                      <option value="48">นครพนม</option>
                                      <option value="49">มุกดาหาร</option>
                                      <option value="50">เชียงใหม่</option>
                                      <option value="51">ลำพูน</option>
                                      <option value="52">ลำปาง</option>
                                      <option value="53">อุตรดิตถ์</option>
                                      <option value="54">แพร่</option>
                                      <option value="55">น่าน</option>
                                      <option value="56">พะเยา</option>
                                      <option value="57">เชียงราย</option>
                                      <option value="58">แม่ฮ่องสอน</option>
                                      <option value="60">นครสวรรค์</option>
                                      <option value="61">อุทัยธานี</option>
                                      <option value="62">กำแพงเพชร</option>
                                      <option value="63">ตาก</option>
                                      <option value="64">สุโขทัย</option>
                                      <option value="65">พิษณุโลก</option>
                                      <option value="66">พิจิตร</option>
                                      <option value="67">เพชรบูรณ์</option>
                                      <option value="70">ราชบุรี</option>
                                      <option value="71">กาญจนบุรี</option>
                                      <option value="72">สุพรรณบุรี</option>
                                      <option value="73">นครปฐม</option>
                                      <option value="74">สมุทรสาคร</option>
                                      <option value="75">สมุทรสงคราม</option>
                                      <option value="76">เพชรบุรี</option>
                                      <option value="77">ประจวบคีรีขันธ์</option>
                                      <option value="80">นครศรีธรรมราช</option>
                                      <option value="81">กระบี่</option>
                                      <option value="82">พังงา</option>
                                      <option value="83">ภูเก็ต</option>
                                      <option value="84">สุราษฎร์ธานี</option>
                                      <option value="85">ระนอง</option>
                                      <option value="86">ชุมพร</option>
                                      <option value="90">สงขลา</option>
                                      <option value="91">สตูล</option>
                                      <option value="92">ตรัง</option>
                                      <option value="93">พัทลุง</option>
                                      <option value="94">ปัตตานี</option>
                                      <option value="95">ยะลา</option>
                                      <option value="96">นราธิวาส</option>
                                    </select>
                                  </div>
                                </div>
                                <div class="col-md-6 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">อำเภอ :</label>
                                    <select
                                      class="form-control"
                                      id="district"
                                      name="district"
                                      required
                                      onchange="operation.thai.change.parish(this.value)"
                                      disabled="disabled"
                                    >
                                      <option value selected disabled>กรุณาเลือกอำเภอ</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-md-6 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">ตำบล :</label>
                                    <select
                                      class="form-control"
                                      id="parish"
                                      name="parish"
                                      disabled="disabled"
                                      required
                                      onchange="operation.thai.moveMarker(
                                    this.options[this.selectedIndex].getAttribute(`lat`),
                                    this.options[this.selectedIndex].getAttribute(`lng`))"
                                    >
                                      <option value selected disabled>กรุณาเลือกตำบล</option>
                                    </select>
                                  </div>
                                </div>
                                <div class="col-md-6 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">
                                      รหัสไปรษณีย์
                                      :
                                    </label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      id="zipcode"
                                      name="zipcode"
                                      required
                                      placeholder="รหัสไปรษณีย์"
                                    >
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <div class="row">
                      <div class="col-12">
                        <div class="tabs">
                          <ul>
                            <li></li>
                            <li
                              v-bind:class="{ 'is-active': modal.tabSelect.subTab == 'contact' || modal.tabSelect.subTab == null }"
                              @click="modal.tabSelect.subTab = 'contact'"
                            >
                              <a>ผู้ติดต่อหลัก</a>
                            </li>
                            <li
                              v-bind:class="{ 'is-active': modal.tabSelect.subTab == 'financial' }"
                              @click="modal.tabSelect.subTab = 'financial'"
                            >
                              <a>การเงิน</a>
                            </li>
                            <li
                              v-bind:class="{ 'is-active': modal.tabSelect.subTab == 'attachment' }"
                              @click="modal.tabSelect.subTab = 'attachment'"
                            >
                              <a>เอกสารแนบ</a>
                            </li>
                          </ul>
                        </div>
                        <div class="content" style="black">
                          <div
                            v-show="modal.tabSelect.subTab == 'contact' || modal.tabSelect.subTab == null"
                          >
                            <TableEasy
                              :column="table.customer.column"
                              :url="'http://192.168.4.12:9999/api/v1/customer/search/record'"
                              v-on:editRow="editCustomer($event)"
                              v-on:deleteRow="deleteCustomer($event)"
                            />
                          </div>
                          <div v-show="modal.tabSelect.subTab == 'financial'">
                            <div class="content">
                              <div class="row">
                                <div class="col-md-12 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">
                                      หมายเลขผู้เสียภาษี
                                      :
                                    </label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      name="taxNo"
                                      id="taxNo"
                                      placeholder="หมายเลขผู้เสียภาษี"
                                    >
                                  </div>
                                </div>
                                <div class="col-md-12 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">เครดิตเทอม :</label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      name="creditTerm"
                                      id="creditTerm"
                                      placeholder="เครดิตเทอม"
                                    >
                                  </div>
                                </div>
                                <div class="col-md-12 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">
                                      ทุนจดทะเบียน
                                      :
                                    </label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      name="registeredCapital"
                                      id="registeredCapital"
                                      placeholder="ทุนจดทะเบียน"
                                    >
                                  </div>
                                </div>
                                <div class="col-md-12 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">
                                      ผู้รับการติดต่อการวางบิลและรับเงิน
                                      :
                                    </label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      name="billing_contact"
                                      id="billing_contact"
                                      placeholder="ผู้รับการติดต่อการวางบิลและรับเงิน"
                                    >
                                  </div>
                                </div>
                                <div class="col-md-12 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">เบอร์โทร :</label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      name="billing_phone"
                                      id="billing_phone"
                                      placeholder="เบอร์โทร"
                                    >
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div v-show="modal.tabSelect.subTab == 'attachment'">
                            <div class="content">
                              <div class="row">
                                <div class="col-md-12 col-xs-12">
                                  <div class="form-group">
                                    <table class="table setStyle">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <div
                                              class="container"
                                              style="width:-webkit-fill-available"
                                            >
                                              <span
                                                style="position: absolute; height: 60px; width: 40px; z-index: 1;"
                                                onclick="operation.file.change(1)"
                                              ></span>
                                              <input id="check1" class="effect-one" type="checkbox">
                                              <label class="checkbox-label" for="check1">
                                                <span class="inner-label"></span>
                                                <span class="icon-label"></span>
                                                <div hidden>
                                                  <input
                                                    type="file"
                                                    class="form-control"
                                                    id="file1"
                                                    onchange="operation.file.manageObj.insertObj(1)"
                                                  >
                                                </div>
                                                <span style="margin-left: 55px;">
                                                  <label
                                                    for="recipient-name"
                                                    class="col-form-label"
                                                  >สำเนาบัตรประจำตัวผู้เสียภาษีอากร</label>
                                                </span>
                                              </label>
                                            </div>
                                            <span class="spacer"></span>
                                          </td>
                                          <td></td>
                                          <td>
                                            <div
                                              class="form-control"
                                              style="text-align: center"
                                              id="customer_file1"
                                            >
                                              <p
                                                onclick="operation.file.change(1)"
                                                style="cursor: pointer;"
                                              >กรุณาเลือกไฟล์</p>
                                            </div>
                                          </td>
                                        </tr>

                                        <tr id="trProgres1" hidden>
                                          <td colspan="3">
                                            <div class="progress" id="progress1">
                                              <div
                                                class="progress-bar"
                                                role="progressbar"
                                                style="width: 0%;"
                                                aria-valuenow="0"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                              ></div>
                                            </div>
                                          </td>
                                        </tr>

                                        <tr>
                                          <td>
                                            <div
                                              class="container"
                                              style="width:-webkit-fill-available"
                                            >
                                              <span
                                                style="position: absolute; height: 60px; width: 40px; z-index: 1;"
                                                onclick="operation.file.change(2)"
                                              ></span>
                                              <input id="check2" class="effect-one" type="checkbox">
                                              <label class="checkbox-label" for="check2">
                                                <span class="inner-label"></span>
                                                <span class="icon-label"></span>
                                                <div hidden>
                                                  <input
                                                    type="file"
                                                    class="form-control"
                                                    id="file2"
                                                    onchange="operation.file.manageObj.insertObj(2)"
                                                  >
                                                </div>
                                                <span style="margin-left: 55px;">
                                                  <label
                                                    for="recipient-name"
                                                    class="col-form-label"
                                                  >
                                                    สำเนาทะเบียนภาษีมูลค่าเพิ่ม
                                                    ( ภพ.20 )
                                                  </label>
                                                </span>
                                              </label>
                                            </div>
                                            <span class="spacer"></span>
                                          </td>
                                          <td></td>
                                          <td>
                                            <div
                                              class="form-control"
                                              style="text-align: center"
                                              id="customer_file2"
                                            >
                                              <p
                                                onclick="operation.file.change(2)"
                                                style="cursor: pointer;"
                                              >กรุณาเลือกไฟล์</p>
                                            </div>
                                          </td>
                                        </tr>

                                        <tr id="trProgres2" hidden>
                                          <td colspan="3">
                                            <div class="progress" id="progress2">
                                              <div
                                                class="progress-bar"
                                                role="progressbar"
                                                style="width: 0%;"
                                                aria-valuenow="0"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                              ></div>
                                            </div>
                                          </td>
                                        </tr>

                                        <tr>
                                          <td>
                                            <div
                                              class="container"
                                              style="width:-webkit-fill-available"
                                            >
                                              <span
                                                style="position: absolute; height: 60px; width: 40px; z-index: 1;"
                                                onclick="operation.file.change(3)"
                                              ></span>
                                              <input id="check3" class="effect-one" type="checkbox">
                                              <label class="checkbox-label" for="check3">
                                                <span class="inner-label"></span>
                                                <span class="icon-label"></span>
                                                <div hidden>
                                                  <input
                                                    type="file"
                                                    class="form-control"
                                                    id="file3"
                                                    onchange="operation.file.manageObj.insertObj(3)"
                                                  >
                                                </div>
                                                <span style="margin-left: 55px;">
                                                  <label
                                                    for="recipient-name"
                                                    class="col-form-label"
                                                  >สำเนาทะเบียนพาณิชย์</label>
                                                </span>
                                              </label>
                                            </div>
                                            <span class="spacer"></span>
                                          </td>
                                          <td></td>
                                          <td>
                                            <div
                                              class="form-control"
                                              style="text-align: center"
                                              id="customer_file3"
                                            >
                                              <p
                                                onclick="operation.file.change(3)"
                                                style="cursor: pointer;"
                                              >กรุณาเลือกไฟล์</p>
                                            </div>
                                          </td>
                                        </tr>

                                        <tr id="trProgres3" hidden>
                                          <td colspan="3">
                                            <div class="progress" id="progress3">
                                              <div
                                                class="progress-bar"
                                                role="progressbar"
                                                style="width: 0%;"
                                                aria-valuenow="0"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                              ></div>
                                            </div>
                                          </td>
                                        </tr>

                                        <tr>
                                          <td>
                                            <div
                                              class="container"
                                              style="width:-webkit-fill-available"
                                            >
                                              <span
                                                style="position: absolute; height: 60px; width: 40px; z-index: 1;"
                                                onclick="operation.file.change(4)"
                                              ></span>
                                              <input id="check4" class="effect-one" type="checkbox">
                                              <label class="checkbox-label" for="check4">
                                                <span class="inner-label"></span>
                                                <span class="icon-label"></span>
                                                <div hidden>
                                                  <input
                                                    type="file"
                                                    class="form-control"
                                                    id="file4"
                                                    onchange="operation.file.manageObj.insertObj(4)"
                                                  >
                                                </div>
                                                <span style="margin-left: 55px;">
                                                  <label
                                                    for="recipient-name"
                                                    class="col-form-label"
                                                  >สำเนาหนังสือรับรองการจดทะเบียนนิติบุคคล</label>
                                                </span>
                                              </label>
                                            </div>
                                            <span class="spacer"></span>
                                          </td>
                                          <td></td>
                                          <td>
                                            <div
                                              class="form-control"
                                              style="text-align: center"
                                              id="customer_file4"
                                            >
                                              <p
                                                onclick="operation.file.change(4)"
                                                style="cursor: pointer;"
                                              >กรุณาเลือกไฟล์</p>
                                            </div>
                                          </td>
                                        </tr>

                                        <tr id="trProgres4" hidden>
                                          <td colspan="3">
                                            <div class="progress" id="progress4">
                                              <div
                                                class="progress-bar"
                                                role="progressbar"
                                                style="width: 0%;"
                                                aria-valuenow="0"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                              ></div>
                                            </div>
                                          </td>
                                        </tr>

                                        <tr>
                                          <td>
                                            <div
                                              class="container"
                                              style="width:-webkit-fill-available"
                                            >
                                              <span
                                                style="position: absolute; height: 60px; width: 40px; z-index: 1;"
                                                onclick="operation.file.change(5)"
                                              ></span>
                                              <input id="check5" class="effect-one" type="checkbox">
                                              <label class="checkbox-label" for="check5">
                                                <span class="inner-label"></span>
                                                <span class="icon-label"></span>
                                                <div hidden>
                                                  <input
                                                    type="file"
                                                    class="form-control"
                                                    id="file5"
                                                    onchange="operation.file.manageObj.insertObj(5)"
                                                  >
                                                </div>
                                                <span style="margin-left: 55px;">
                                                  <label
                                                    for="recipient-name"
                                                    class="col-form-label"
                                                  >เอกสารแนะนำบริษัท</label>
                                                </span>
                                              </label>
                                            </div>
                                            <span class="spacer"></span>
                                          </td>
                                          <td></td>
                                          <td>
                                            <div
                                              class="form-control"
                                              style="text-align: center"
                                              id="customer_file5"
                                            >
                                              <p
                                                onclick="operation.file.change(5)"
                                                style="cursor: pointer;"
                                              >กรุณาเลือกไฟล์</p>
                                            </div>
                                          </td>
                                        </tr>
                                        <tr id="trProgres5" hidden>
                                          <td colspan="3">
                                            <div class="progress" id="progress5">
                                              <div
                                                class="progress-bar"
                                                role="progressbar"
                                                style="width: 0%;"
                                                aria-valuenow="0"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                              ></div>
                                            </div>
                                          </td>
                                        </tr>

                                        <tr>
                                          <td>
                                            <div
                                              class="container"
                                              style="width:-webkit-fill-available"
                                            >
                                              <span
                                                style="position: absolute; height: 60px; width: 40px; z-index: 1;"
                                                onclick="operation.file.change(6)"
                                              ></span>
                                              <input id="check6" class="effect-one" type="checkbox">
                                              <label class="checkbox-label" for="check6">
                                                <span class="inner-label"></span>
                                                <span class="icon-label"></span>
                                                <div hidden>
                                                  <input
                                                    type="file"
                                                    class="form-control"
                                                    id="file6"
                                                    onchange="operation.file.manageObj.insertObj(6)"
                                                  >
                                                </div>
                                                <span style="margin-left: 55px;">
                                                  <label
                                                    for="recipient-name"
                                                    class="col-form-label"
                                                  >อื่นๆ</label>
                                                </span>
                                              </label>
                                            </div>
                                            <span class="spacer"></span>
                                          </td>
                                          <td>
                                            <input
                                              type="text"
                                              class="form-control"
                                              name="file_other"
                                              id="file_other"
                                              placeholder="ระบุ"
                                              disabled
                                            >
                                          </td>
                                          <td>
                                            <div
                                              class="form-control"
                                              style="text-align: center"
                                              id="customer_file6"
                                            >
                                              <p
                                                onclick="operation.file.change(6)"
                                                style="cursor: pointer;"
                                              >กรุณาเลือกไฟล์</p>
                                            </div>
                                          </td>
                                        </tr>
                                        <tr id="trProgres6" hidden>
                                          <td colspan="3">
                                            <div class="progress" id="progress6">
                                              <div
                                                class="progress-bar"
                                                role="progressbar"
                                                style="width: 0%;"
                                                aria-valuenow="0"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                              ></div>
                                            </div>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs>
            <div class="text-xs-center mt-3">
              <v-btn @click="next">next tab</v-btn>
            </div>
          </div>
          <!-- <div v-for="(value, key) in modal.customer.data" :key="key">
            <label>
              <h4>{{ key }}</h4>
            </label>
            <input type="text" :class="template.input" v-model="modal.customer.data[key]">
            <hr>
          </div>-->
          <!-- <div class="row">
            <div class="col-12">
              <div class="tabs">
                <ul>
                  <li></li>
                  <li
                    v-bind:class="{ 'is-active': modal.tabSelect.level1 == 'masterData' }"
                    @click="modal.tabSelect.level1 = 'masterData'"
                  >
                    <a>ข้อมูลหลัก</a>
                  </li>
                  <li
                    v-bind:class="{ 'is-active': modal.tabSelect.level1 == 'financial' }"
                    @click="modal.tabSelect.level1 = 'financial'"
                  >
                    <a>ข้อมูลทางการเงิน</a>
                  </li>
                </ul>
              </div>
              <div class="content" style="black">
                <div v-show="modal.tabSelect.level1 == 'masterData'">
                  <div class="row">
                    <div class="col-12">
                      <div class="tabs">
                        <ul>
                          <li></li>
                          <li
                            v-bind:class="{ 'is-active': modal.tabSelect.subTab == 'customerData' || modal.tabSelect.subTab == null }"
                            @click="modal.tabSelect.subTab = 'customerData'"
                          >
                            <a>ข้อมูลลูกค้า</a>
                          </li>
                          <li
                            v-bind:class="{ 'is-active': modal.tabSelect.subTab == 'addressInformation' }"
                            @click="modal.tabSelect.subTab = 'addressInformation'"
                          >
                            <a>ที่อยู่</a>
                          </li>
                        </ul>
                      </div>
                      <div class="content" style="black">
                        <div
                          v-show="modal.tabSelect.subTab == 'customerData' || modal.tabSelect.subTab == null"
                        >customerData</div>
                        <div
                          v-show="modal.tabSelect.subTab == 'addressInformation'"
                        >addressInformation</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-show="modal.tabSelect.level1 == 'financial'">
                  <div class="row">
                    <div class="col-12">
                      <div class="tabs">
                        <ul>
                          <li></li>
                          <li
                            v-bind:class="{ 'is-active': modal.tabSelect.subTab == 'contact' || modal.tabSelect.subTab == null }"
                            @click="modal.tabSelect.subTab = 'contact'"
                          >
                            <a>ผู้ติดต่อหลัก</a>
                          </li>
                          <li
                            v-bind:class="{ 'is-active': modal.tabSelect.subTab == 'financial' }"
                            @click="modal.tabSelect.subTab = 'financial'"
                          >
                            <a>การเงิน</a>
                          </li>
                          <li
                            v-bind:class="{ 'is-active': modal.tabSelect.subTab == 'attachment' }"
                            @click="modal.tabSelect.subTab = 'attachment'"
                          >
                            <a>เอกสารแนบ</a>
                          </li>
                        </ul>
                      </div>
                      <div class="content" style="black">
                        <div
                          v-show="modal.tabSelect.subTab == 'contact' || modal.tabSelect.subTab == null"
                        >ผู้ติดต่อหลัก</div>
                        <div v-show="modal.tabSelect.subTab == 'financial'">การเงิน</div>
                        <div v-show="modal.tabSelect.subTab == 'attachment'">เอกสารแนบ</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>-->
        </section>
        <footer class="modal-card-foot">
          <button class="button is-warning" style="color:white" @click="save()">Update</button>
          <button class="button" @click="modal.customer.edit = false">Cancel</button>
        </footer>
      </div>
    </div>

    <div v-if="modal.customer.delete" class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">ลบข้อมูลรายชื่อลูกค้า : {{ modal.customer.data.id }}</p>
          <button class="delete" aria-label="close" @click="modal.customer.delete = false"></button>
        </header>
        <section class="modal-card-body">ต้องการลบข้อมูลนี้ใช่หรือไม่ ?</section>
        <footer class="modal-card-foot">
          <button class="button is-danger" @click="save()">Delete</button>
          <button class="button" @click="modal.customer.delete = false">Cancel</button>
        </footer>
      </div>
    </div>

    <!-- <div v-if="modal.project.add" class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card modal-content-width">
        <header class="modal-card-head">
          <p class="modal-card-title">เพิ่มข้อมูลรายโปรเจค : {{ modal.project.data.id }}</p>
          <button class="delete" aria-label="close" @click="modal.project.add = false"></button>
        </header>
        <section class="modal-card-body">
          <div>
            <v-tabs v-model="active" color="#23d160" dark slider-color="white">
              <v-tab>ข้อมูลหลัก</v-tab>
              <v-tab ripple>ข้อมูลผู้ติดต่อ</v-tab>
              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <div class="content">
                      <div class="row">
                        <div class="col-md-12 col-xs-12">
                          <div class="form-group">
                            <label for="recipient-name" class="col-form-label">
                              รหัสโครงการ
                              :
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              id="code"
                              name="code"
                              required
                              placeholder="รหัสโครงการ"
                            >
                          </div>
                        </div>
                        <div class="col-md-12 col-xs-12">
                          <div class="form-group">
                            <label for="recipient-name" class="col-form-label">
                              ชื่อโครงการ
                              :
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              id="title"
                              name="title"
                              required
                              placeholder="ชื่อโครงการ"
                            >
                          </div>
                        </div>
                        <div class="col-md-12 col-xs-12">
                          <div class="form-group">
                            <label for="recipient-name" class="col-form-label">ฤกษ์ตอก :</label>
                            <div class="row">
                              <div class="col-md-6 col-xs-6">
                                <div
                                  class="input-group date"
                                  data-provide="datepicker"
                                  data-date-format="yyyy-mm-dd"
                                >
                                  <input
                                    type="text"
                                    class="form-control"
                                    id="goodtime"
                                    name="goodtime"
                                    required
                                    placeholder="วันที่ติดต่อครั้งแรก"
                                  >
                                  <div class="input-group-addon">
                                    <span class="glyphicon glyphicon-th"></span>
                                  </div>
                                </div>
                              </div>
                              <div class="col-md-6 col-xs-6">
                                <div class="input-group bootstrap-timepicker timepicker">
                                  <input
                                    id="timepicker"
                                    name="timepicker"
                                    type="text"
                                    required
                                    class="form-control input-small"
                                    placeholder="00:00:00"
                                  >
                                  <span class="input-group-addon">
                                    <i class="glyphicon glyphicon-time"></i>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6 col-xs-12">
                          <div class="form-group">
                            <label for="recipient-name" class="col-form-label">เลขที่ :</label>
                            <input
                              type="text"
                              class="form-control"
                              id="address_no"
                              name="address_no"
                              required
                              placeholder="เลขที่"
                            >
                          </div>
                        </div>
                        <div class="col-md-6 col-xs-12">
                          <div class="form-group">
                            <label for="recipient-name" class="col-form-label">ถนน :</label>
                            <input
                              type="text"
                              class="form-control"
                              id="address_road"
                              name="address_road"
                              required
                              placeholder="ถนน"
                            >
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6 col-xs-12">
                          <div class="form-group">
                            <label for="recipient-name" class="col-form-label">จังหวัด :</label>
                            <select
                              class="form-control"
                              id="province"
                              name="province"
                              required
                              onchange="operation.thai.change.district(this.value)"
                            >
                              <option value selected disabled>กรุณาเลือกจังหวัด</option>
                              <option value="10">กรุงเทพมหานคร</option>
                              <option value="11">สมุทรปราการ</option>
                              <option value="12">นนทบุรี</option>
                              <option value="13">ปทุมธานี</option>
                              <option value="14">พระนครศรีอยุธยา</option>
                              <option value="15">อ่างทอง</option>
                              <option value="16">ลพบุรี</option>
                              <option value="17">สิงห์บุรี</option>
                              <option value="18">ชัยนาท</option>
                              <option value="19">สระบุรี</option>
                              <option value="20">ชลบุรี</option>
                              <option value="21">ระยอง</option>
                              <option value="22">จันทบุรี</option>
                              <option value="23">ตราด</option>
                              <option value="24">ฉะเชิงเทรา</option>
                              <option value="25">ปราจีนบุรี</option>
                              <option value="26">นครนายก</option>
                              <option value="27">สระแก้ว</option>
                              <option value="30">นครราชสีมา</option>
                              <option value="31">บุรีรัมย์</option>
                              <option value="32">สุรินทร์</option>
                              <option value="33">ศรีสะเกษ</option>
                              <option value="34">อุบลราชธานี</option>
                              <option value="35">ยโสธร</option>
                              <option value="36">ชัยภูมิ</option>
                              <option value="37">อำนาจเจริญ</option>
                              <option value="38">บึงกาฬ</option>
                              <option value="39">หนองบัวลำภู</option>
                              <option value="40">ขอนแก่น</option>
                              <option value="41">อุดรธานี</option>
                              <option value="42">เลย</option>
                              <option value="43">หนองคาย</option>
                              <option value="44">มหาสารคาม</option>
                              <option value="45">ร้อยเอ็ด</option>
                              <option value="46">กาฬสินธุ์</option>
                              <option value="47">สกลนคร</option>
                              <option value="48">นครพนม</option>
                              <option value="49">มุกดาหาร</option>
                              <option value="50">เชียงใหม่</option>
                              <option value="51">ลำพูน</option>
                              <option value="52">ลำปาง</option>
                              <option value="53">อุตรดิตถ์</option>
                              <option value="54">แพร่</option>
                              <option value="55">น่าน</option>
                              <option value="56">พะเยา</option>
                              <option value="57">เชียงราย</option>
                              <option value="58">แม่ฮ่องสอน</option>
                              <option value="60">นครสวรรค์</option>
                              <option value="61">อุทัยธานี</option>
                              <option value="62">กำแพงเพชร</option>
                              <option value="63">ตาก</option>
                              <option value="64">สุโขทัย</option>
                              <option value="65">พิษณุโลก</option>
                              <option value="66">พิจิตร</option>
                              <option value="67">เพชรบูรณ์</option>
                              <option value="70">ราชบุรี</option>
                              <option value="71">กาญจนบุรี</option>
                              <option value="72">สุพรรณบุรี</option>
                              <option value="73">นครปฐม</option>
                              <option value="74">สมุทรสาคร</option>
                              <option value="75">สมุทรสงคราม</option>
                              <option value="76">เพชรบุรี</option>
                              <option value="77">ประจวบคีรีขันธ์</option>
                              <option value="80">นครศรีธรรมราช</option>
                              <option value="81">กระบี่</option>
                              <option value="82">พังงา</option>
                              <option value="83">ภูเก็ต</option>
                              <option value="84">สุราษฎร์ธานี</option>
                              <option value="85">ระนอง</option>
                              <option value="86">ชุมพร</option>
                              <option value="90">สงขลา</option>
                              <option value="91">สตูล</option>
                              <option value="92">ตรัง</option>
                              <option value="93">พัทลุง</option>
                              <option value="94">ปัตตานี</option>
                              <option value="95">ยะลา</option>
                              <option value="96">นราธิวาส</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-md-6 col-xs-12">
                          <div class="form-group">
                            <label for="recipient-name" class="col-form-label">อำเภอ :</label>
                            <select
                              class="form-control"
                              id="district"
                              name="district"
                              required
                              onchange="operation.thai.change.parish(this.value)"
                              disabled="disabled"
                            >
                              <option value selected disabled>กรุณาเลือกอำเภอ</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6 col-xs-12">
                          <div class="form-group">
                            <label for="recipient-name" class="col-form-label">ตำบล :</label>
                            <select
                              class="form-control"
                              id="parish"
                              name="parish"
                              disabled="disabled"
                              required
                              onchange="operation.thai.moveMarker(
                                    this.options[this.selectedIndex].getAttribute(`lat`),
                                    this.options[this.selectedIndex].getAttribute(`lng`))"
                            >
                              <option value selected disabled>กรุณาเลือกตำบล</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-md-6 col-xs-12">
                          <div class="form-group">
                            <label for="recipient-name" class="col-form-label">
                              รหัสไปรษณีย์
                              :
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              id="zipcode"
                              name="zipcode"
                              required
                              placeholder="รหัสไปรษณีย์"
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <div class="content">
                      <div class="row">
                        <div class="col-md-12 col-xs-12">
                          <div class="form-group">
                            <label
                              for="recipient-name"
                              class="col-form-label"
                            >บริษัท / ชื่อผู้รับเหมา :</label>
                            <select
                              class="form-control js-example-data-array-selected select2-hidden-accessible"
                              required
                              onchange="operation.project.change(this.value)"
                              id="customer_id"
                              tabindex="-1"
                              aria-hidden="true"
                            >
                              <option value="3248">ทวีพงศุ์ เมฆฉาย</option>
                            </select>
                            <span
                              class="select2 select2-container select2-container--default select2-container--below select2-container--focus"
                              dir="ltr"
                              style="width: 100%;"
                            >
                              <span class="selection">
                                <span
                                  class="select2-selection select2-selection--single"
                                  role="combobox"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                  tabindex="0"
                                  aria-labelledby="select2-customer_id-container"
                                >
                                  <span
                                    class="select2-selection__rendered"
                                    id="select2-customer_id-container"
                                    title="ทวีพงศุ์ เมฆฉาย"
                                  >
                                    <span class="select2-selection__clear">×</span>ทวีพงศุ์ เมฆฉาย
                                  </span>
                                  <span class="select2-selection__arrow" role="presentation">
                                    <b role="presentation"></b>
                                  </span>
                                </span>
                              </span>
                              <span class="dropdown-wrapper" aria-hidden="true"></span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12 col-xs-12">
                          <div class="form-group">
                            <TableEasy
                              :column="table.customer.column"
                              :url="'http://192.168.4.12:9999/api/v1/customer/search/record'"
                              v-on:editRow="editCustomer($event)"
                              v-on:deleteRow="deleteCustomer($event)"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs>
            <div class="text-xs-center mt-3">
              <v-btn @click="next">next tab</v-btn>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="save()">Save</button>
          <button class="button" @click="modal.project.add = false">Cancel</button>
        </footer>
      </div>
    </div> -->

    <div v-if="modal.project.edit" class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card modal-content-width">
        <header class="modal-card-head">
          <p class="modal-card-title">แก้ไขข้อมูลโปรเจค : {{ modal.project.data.id }}</p>
          <button class="delete" aria-label="close" @click="modal.project.edit = false"></button>
        </header>
        <section class="modal-card-body">
          <div>
            <v-tabs v-model="active" color="#ffdd57" dark slider-color="white">
              <v-tab>ข้อมูลหลัก</v-tab>
              <v-tab ripple>ข้อมูลผู้ติดต่อ</v-tab>
              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <div class="content">
                      <div class="row">
                        <div class="col-md-12 col-xs-12">
                          <div class="form-group">
                            <label for="recipient-name" class="col-form-label">
                              รหัสโครงการ
                              :
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              id="code"
                              name="code"
                              required
                              placeholder="รหัสโครงการ"
                            >
                          </div>
                        </div>
                        <div class="col-md-12 col-xs-12">
                          <div class="form-group">
                            <label for="recipient-name" class="col-form-label">
                              ชื่อโครงการ
                              :
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              id="title"
                              name="title"
                              required
                              placeholder="ชื่อโครงการ"
                            >
                          </div>
                        </div>
                        <div class="col-md-12 col-xs-12">
                          <div class="form-group">
                            <label for="recipient-name" class="col-form-label">ฤกษ์ตอก :</label>
                            <div class="row">
                              <div class="col-md-6 col-xs-6">
                                <div
                                  class="input-group date"
                                  data-provide="datepicker"
                                  data-date-format="yyyy-mm-dd"
                                >
                                  <input
                                    type="text"
                                    class="form-control"
                                    id="goodtime"
                                    name="goodtime"
                                    required
                                    placeholder="วันที่ติดต่อครั้งแรก"
                                  >
                                  <div class="input-group-addon">
                                    <span class="glyphicon glyphicon-th"></span>
                                  </div>
                                </div>
                              </div>
                              <div class="col-md-6 col-xs-6">
                                <div class="input-group bootstrap-timepicker timepicker">
                                  <input
                                    id="timepicker"
                                    name="timepicker"
                                    type="text"
                                    required
                                    class="form-control input-small"
                                    placeholder="00:00:00"
                                  >
                                  <span class="input-group-addon">
                                    <i class="glyphicon glyphicon-time"></i>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6 col-xs-12">
                          <div class="form-group">
                            <label for="recipient-name" class="col-form-label">เลขที่ :</label>
                            <input
                              type="text"
                              class="form-control"
                              id="address_no"
                              name="address_no"
                              required
                              placeholder="เลขที่"
                            >
                          </div>
                        </div>
                        <div class="col-md-6 col-xs-12">
                          <div class="form-group">
                            <label for="recipient-name" class="col-form-label">ถนน :</label>
                            <input
                              type="text"
                              class="form-control"
                              id="address_road"
                              name="address_road"
                              required
                              placeholder="ถนน"
                            >
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6 col-xs-12">
                          <div class="form-group">
                            <label for="recipient-name" class="col-form-label">จังหวัด :</label>
                            <select
                              class="form-control"
                              id="province"
                              name="province"
                              required
                              onchange="operation.thai.change.district(this.value)"
                            >
                              <option value selected disabled>กรุณาเลือกจังหวัด</option>
                              <option value="10">กรุงเทพมหานคร</option>
                              <option value="11">สมุทรปราการ</option>
                              <option value="12">นนทบุรี</option>
                              <option value="13">ปทุมธานี</option>
                              <option value="14">พระนครศรีอยุธยา</option>
                              <option value="15">อ่างทอง</option>
                              <option value="16">ลพบุรี</option>
                              <option value="17">สิงห์บุรี</option>
                              <option value="18">ชัยนาท</option>
                              <option value="19">สระบุรี</option>
                              <option value="20">ชลบุรี</option>
                              <option value="21">ระยอง</option>
                              <option value="22">จันทบุรี</option>
                              <option value="23">ตราด</option>
                              <option value="24">ฉะเชิงเทรา</option>
                              <option value="25">ปราจีนบุรี</option>
                              <option value="26">นครนายก</option>
                              <option value="27">สระแก้ว</option>
                              <option value="30">นครราชสีมา</option>
                              <option value="31">บุรีรัมย์</option>
                              <option value="32">สุรินทร์</option>
                              <option value="33">ศรีสะเกษ</option>
                              <option value="34">อุบลราชธานี</option>
                              <option value="35">ยโสธร</option>
                              <option value="36">ชัยภูมิ</option>
                              <option value="37">อำนาจเจริญ</option>
                              <option value="38">บึงกาฬ</option>
                              <option value="39">หนองบัวลำภู</option>
                              <option value="40">ขอนแก่น</option>
                              <option value="41">อุดรธานี</option>
                              <option value="42">เลย</option>
                              <option value="43">หนองคาย</option>
                              <option value="44">มหาสารคาม</option>
                              <option value="45">ร้อยเอ็ด</option>
                              <option value="46">กาฬสินธุ์</option>
                              <option value="47">สกลนคร</option>
                              <option value="48">นครพนม</option>
                              <option value="49">มุกดาหาร</option>
                              <option value="50">เชียงใหม่</option>
                              <option value="51">ลำพูน</option>
                              <option value="52">ลำปาง</option>
                              <option value="53">อุตรดิตถ์</option>
                              <option value="54">แพร่</option>
                              <option value="55">น่าน</option>
                              <option value="56">พะเยา</option>
                              <option value="57">เชียงราย</option>
                              <option value="58">แม่ฮ่องสอน</option>
                              <option value="60">นครสวรรค์</option>
                              <option value="61">อุทัยธานี</option>
                              <option value="62">กำแพงเพชร</option>
                              <option value="63">ตาก</option>
                              <option value="64">สุโขทัย</option>
                              <option value="65">พิษณุโลก</option>
                              <option value="66">พิจิตร</option>
                              <option value="67">เพชรบูรณ์</option>
                              <option value="70">ราชบุรี</option>
                              <option value="71">กาญจนบุรี</option>
                              <option value="72">สุพรรณบุรี</option>
                              <option value="73">นครปฐม</option>
                              <option value="74">สมุทรสาคร</option>
                              <option value="75">สมุทรสงคราม</option>
                              <option value="76">เพชรบุรี</option>
                              <option value="77">ประจวบคีรีขันธ์</option>
                              <option value="80">นครศรีธรรมราช</option>
                              <option value="81">กระบี่</option>
                              <option value="82">พังงา</option>
                              <option value="83">ภูเก็ต</option>
                              <option value="84">สุราษฎร์ธานี</option>
                              <option value="85">ระนอง</option>
                              <option value="86">ชุมพร</option>
                              <option value="90">สงขลา</option>
                              <option value="91">สตูล</option>
                              <option value="92">ตรัง</option>
                              <option value="93">พัทลุง</option>
                              <option value="94">ปัตตานี</option>
                              <option value="95">ยะลา</option>
                              <option value="96">นราธิวาส</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-md-6 col-xs-12">
                          <div class="form-group">
                            <label for="recipient-name" class="col-form-label">อำเภอ :</label>
                            <select
                              class="form-control"
                              id="district"
                              name="district"
                              required
                              onchange="operation.thai.change.parish(this.value)"
                              disabled="disabled"
                            >
                              <option value selected disabled>กรุณาเลือกอำเภอ</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6 col-xs-12">
                          <div class="form-group">
                            <label for="recipient-name" class="col-form-label">ตำบล :</label>
                            <select
                              class="form-control"
                              id="parish"
                              name="parish"
                              disabled="disabled"
                              required
                              onchange="operation.thai.moveMarker(
                                    this.options[this.selectedIndex].getAttribute(`lat`),
                                    this.options[this.selectedIndex].getAttribute(`lng`))"
                            >
                              <option value selected disabled>กรุณาเลือกตำบล</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-md-6 col-xs-12">
                          <div class="form-group">
                            <label for="recipient-name" class="col-form-label">
                              รหัสไปรษณีย์
                              :
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              id="zipcode"
                              name="zipcode"
                              required
                              placeholder="รหัสไปรษณีย์"
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <div class="content">
                      <div class="row">
                        <div class="col-md-12 col-xs-12">
                          <div class="form-group">
                            <label
                              for="recipient-name"
                              class="col-form-label"
                            >บริษัท / ชื่อผู้รับเหมา :</label>
                            <select
                              class="form-control js-example-data-array-selected select2-hidden-accessible"
                              required
                              onchange="operation.project.change(this.value)"
                              id="customer_id"
                              tabindex="-1"
                              aria-hidden="true"
                            >
                              <option value="3248">ทวีพงศุ์ เมฆฉาย</option>
                            </select>
                            <span
                              class="select2 select2-container select2-container--default select2-container--below select2-container--focus"
                              dir="ltr"
                              style="width: 100%;"
                            >
                              <span class="selection">
                                <span
                                  class="select2-selection select2-selection--single"
                                  role="combobox"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                  tabindex="0"
                                  aria-labelledby="select2-customer_id-container"
                                >
                                  <span
                                    class="select2-selection__rendered"
                                    id="select2-customer_id-container"
                                    title="ทวีพงศุ์ เมฆฉาย"
                                  >
                                    <span class="select2-selection__clear">×</span>ทวีพงศุ์ เมฆฉาย
                                  </span>
                                  <span class="select2-selection__arrow" role="presentation">
                                    <b role="presentation"></b>
                                  </span>
                                </span>
                              </span>
                              <span class="dropdown-wrapper" aria-hidden="true"></span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12 col-xs-12">
                          <div class="form-group">
                            <TableEasy
                              :column="table.customer.column"
                              :url="'http://192.168.4.12:9999/api/v1/customer/search/record'"
                              v-on:editRow="editCustomer($event)"
                              v-on:deleteRow="deleteCustomer($event)"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs>
            <div class="text-xs-center mt-3">
              <v-btn @click="next">next tab</v-btn>
            </div>
          </div>
          <!-- <div v-for="(value, key) in modal.customer.data" :key="key">
            <label>
              <h4>{{ key }}</h4>
            </label>
            <input type="text" :class="template.input" v-model="modal.customer.data[key]">
            <hr>
          </div>-->
          <!-- <div class="row">
            <div class="col-12">
              <div class="tabs">
                <ul>
                  <li></li>
                  <li
                    v-bind:class="{ 'is-active': modal.tabSelect.level1 == 'masterData' }"
                    @click="modal.tabSelect.level1 = 'masterData'"
                  >
                    <a>ข้อมูลหลัก</a>
                  </li>
                  <li
                    v-bind:class="{ 'is-active': modal.tabSelect.level1 == 'financial' }"
                    @click="modal.tabSelect.level1 = 'financial'"
                  >
                    <a>ข้อมูลทางการเงิน</a>
                  </li>
                </ul>
              </div>
              <div class="content" style="black">
                <div v-show="modal.tabSelect.level1 == 'masterData'">
                  <div class="row">
                    <div class="col-12">
                      <div class="tabs">
                        <ul>
                          <li></li>
                          <li
                            v-bind:class="{ 'is-active': modal.tabSelect.subTab == 'customerData' || modal.tabSelect.subTab == null }"
                            @click="modal.tabSelect.subTab = 'customerData'"
                          >
                            <a>ข้อมูลลูกค้า</a>
                          </li>
                          <li
                            v-bind:class="{ 'is-active': modal.tabSelect.subTab == 'addressInformation' }"
                            @click="modal.tabSelect.subTab = 'addressInformation'"
                          >
                            <a>ที่อยู่</a>
                          </li>
                        </ul>
                      </div>
                      <div class="content" style="black">
                        <div
                          v-show="modal.tabSelect.subTab == 'customerData' || modal.tabSelect.subTab == null"
                        >customerData</div>
                        <div
                          v-show="modal.tabSelect.subTab == 'addressInformation'"
                        >addressInformation</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-show="modal.tabSelect.level1 == 'financial'">
                  <div class="row">
                    <div class="col-12">
                      <div class="tabs">
                        <ul>
                          <li></li>
                          <li
                            v-bind:class="{ 'is-active': modal.tabSelect.subTab == 'contact' || modal.tabSelect.subTab == null }"
                            @click="modal.tabSelect.subTab = 'contact'"
                          >
                            <a>ผู้ติดต่อหลัก</a>
                          </li>
                          <li
                            v-bind:class="{ 'is-active': modal.tabSelect.subTab == 'financial' }"
                            @click="modal.tabSelect.subTab = 'financial'"
                          >
                            <a>การเงิน</a>
                          </li>
                          <li
                            v-bind:class="{ 'is-active': modal.tabSelect.subTab == 'attachment' }"
                            @click="modal.tabSelect.subTab = 'attachment'"
                          >
                            <a>เอกสารแนบ</a>
                          </li>
                        </ul>
                      </div>
                      <div class="content" style="black">
                        <div
                          v-show="modal.tabSelect.subTab == 'contact' || modal.tabSelect.subTab == null"
                        >ผู้ติดต่อหลัก</div>
                        <div v-show="modal.tabSelect.subTab == 'financial'">การเงิน</div>
                        <div v-show="modal.tabSelect.subTab == 'attachment'">เอกสารแนบ</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>-->
        </section>
        <footer class="modal-card-foot">
          <button class="button is-warning" style="color:white" @click="save()">Update</button>
          <button class="button" @click="modal.project.edit = false">Cancel</button>
        </footer>
      </div>
    </div>

    <div v-if="modal.project.delete" class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">ลบข้อมูลโปรเจ๊ค : {{ modal.project.data.id }}</p>
          <button class="delete" aria-label="close" @click="modal.project.delete = false"></button>
        </header>
        <section class="modal-card-body">ต้องการลบข้อมูลนี้ใช่หรือไม่ ?</section>
        <footer class="modal-card-foot">
          <button class="button is-danger" @click="save()">Delete</button>
          <button class="button" @click="modal.project.delete = false">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import Table from "./Table";
import TableEasy from "./TableEasy";
import Modal from "./Modal";
import Delete from "./Modal/Delete";
import Customer from "./Modal/Customer";
import Project from "./Modal/Project";
// import Tambons from "../stores/Tambons";
// import Amphoes from "../stores/Amphoes";
// import Changwats from "../stores/Changwats";
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
    // this.reloadTable();
    // this.reloadTable2();
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
    // next() {
    //   const active = parseInt(this.active);
    //   this.active = active < 2 ? active + 1 : 0;
    // },
    setting(dataRow,dataType,dataCase){
      this.modal.show = true;
      this.modal.data = dataRow;
      this.modal.type = dataType;
      this.modal.case = dataCase
    },
    addCustomer() {
      // this.modal.customer.title = `แก้ไขข้อมูลรายชื่อลูกค้า : ${rowData.id}`;
      // this.modal.customer.data = rowData;
      this.modal.customer.add = true;
    },
    editCustomer(rowData) {
      // this.modal.customer.title = `แก้ไขข้อมูลรายชื่อลูกค้า : ${rowData.id}`;
      this.modal.customer.data = rowData;
      this.modal.customer.edit = true;
    },
    deleteCustomer(rowData) {
      this.modal.customer.data = rowData;
      this.modal.customer.delete = true;
    },

    addProject() {
      // this.modal.project.data = rowData;
      this.modal.project.add = true;
    },
    editProject(rowData) {
      this.modal.project.data = rowData;
      this.modal.project.edit = true;
    },
    deleteProject(rowData) {
      this.modal.project.data = rowData;
      this.modal.project.delete = true;
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
    // },
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