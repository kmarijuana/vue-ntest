<template>
  <div>
    <v-tabs v-model="active" :color="color" dark slider-color="white">
      <v-tab>ข้อมูลหลัก</v-tab>
      <v-tab ripple>ข้อมูลทางการเงิน</v-tab>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <div class="row">
                  <div class="col-6">
                    <div class="card">
                      <header class="card-header">
                        <p class="card-header-title">Component</p>
                        <a href="#" class="card-header-icon" aria-label="more options">
                          <span class="icon">
                            <i class="fas fa-angle-down" aria-hidden="true"></i>
                          </span>
                        </a>
                      </header>
                      <div class="card-content">
                        <div class="content">
                          <div class="row">
                            <div class="col-md-6 col-xs-12">
                              <div class="form-group">
                                <label for="recipient-name" class="col-form-label">ประเภทลูกค้า : </label>
                                <select class="form-control" v-model="data.type_id" required>
                                  <option :selected="'' ==data.type_id"  disabled value="" >กรุณาเลือกประเภทลูกค้า</option>
                                  <option :selected="'0'==data.type_id"           value="0">บุคคลธรรมดา</option>
                                  <option :selected="'1'==data.type_id"           value="1">นิติบุคคล</option>
                                  <option :selected="'2'==data.type_id"           value="2">หน่วยงานราชการ</option>
                                </select>
                              </div>
                            </div>
                            <div class="col-md-6 col-xs-12">
                              <div class="form-group">
                                <label for="recipient-name" class="col-form-label">กลุ่มลูกค้า : </label>
                                <select class="form-control" v-model="data.group_id" required>
                                  <option :selected="'' ==data.group_id" disabled value >กรุณาเลือกกลุ่มลูกค้า</option>
                                  <option :selected="'0'==data.group_id" disabled value="0">== ไม่กำหนด ==</option>
                                  <option :selected="'1'==data.group_id" disabled value="1">งานราชการ</option>
                                  <option :selected="'2'==data.group_id"          value="2">ผู้รับเหมา</option>
                                  <option :selected="'3'==data.group_id"          value="3">เจ้าของงาน</option>
                                  <option :selected="'4'==data.group_id" disabled value="4">วัด</option>
                                  <option :selected="'5'==data.group_id" disabled value="5">งานการกุศล</option>
                                  <option :selected="'6'==data.group_id"          value="7">ร้านวัสดุ</option>
                                  <option :selected="'7'==data.group_id"          value="6">อื่นๆ</option>
                                  <option :selected="'8'==data.group_id"          value="8">คู่ค้า/โรงงานเข็ม</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-6 col-xs-12">
                              <div class="form-group">
                                <label for="recipient-name" class="col-form-label">รหัสลูกค้า :</label>
                                <input type="text" class="form-control" v-model="data.code" required placeholder="รหัสลูกค้า">
                              </div>
                            </div>
                            <div class="col-md-6 col-xs-12">
                              <div class="form-group">
                                <label for="recipient-name" class="col-form-label">สาขาที่ :</label>
                                <input type="text" class="form-control" v-model="data.branchNo" required placeholder="สาขาที่">
                              </div>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-6 col-xs-12">
                              <div class="form-group">
                                <label for="recipient-name" class="col-form-label">คำนำหน้า :</label>
                                <input type="text" class="form-control" v-model="data.prefix" placeholder="คำนำหน้า" list="listPrefixs" required >
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
                                <label for="recipient-name" class="col-form-label">ชื่อลูกค้า / บริษัท : </label>
                                <input type="text" class="form-control" v-model="data.name" required placeholder="ชื่อ-นามสกุล">
                              </div>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-6 col-xs-12">
                              <div class="form-group">
                                <label for="recipient-name" class="col-form-label">ชื่อลูกค้า / บริษัท (MAC5) <span style="color:red">* SO only</span> : </label>
                                <input type="text" class="form-control" v-model="data.name_for_so" required placeholder="ชื่อ-นามสกุล">
                              </div>
                            </div>
                            <div class="col-md-6 col-xs-12">
                              <div class="form-group">
                                <label for="recipient-name" class="col-form-label">เบอร์บริษัท : </label>
                                <input type="text" class="form-control" v-model="data.phone" required placeholder="เบอร์บริษัท">
                              </div>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-6 col-xs-12">
                              <div class="form-group">
                                <label for="recipient-name" class="col-form-label">ชื่อผู้มีอำนาจ : </label>
                                <div class="row">
                                  <div class="col-md-6 col-xs-6">
                                    <input type="text" class="form-control" v-model="data.author_f_name" placeholder="ชื่อ">
                                  </div>
                                  <div class="col-md-6 col-xs-6">
                                    <input type="text" class="form-control" v-model="data.author_l_name" placeholder="นามสกุล">
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="col-md-6 col-xs-12">
                              <div class="form-group">
                                <label for="recipient-name" class="col-form-label">วันที่ติดต่อครั้งแรก : </label>
                                <div class="input-group date" data-provide="datepicker" data-date-format="yyyy-mm-dd">
                                  <input type="text" class="form-control" id="contact_date" name="contact_date" placeholder="วันที่ติดต่อครั้งแรก" readonly>
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
                                <label for="recipient-name" class="col-form-label">วัตถุประสงค์ของบริษัท : </label>
                                <input type="text" class="form-control" v-model="data.objective" placeholder="วัตถุประสงค์ของบริษัท">
                              </div>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-4 col-xs-12">
                              <div class="form-group">
                                <label for="recipient-name" class="col-form-label">ผู้จัดทำ :</label>
                                <input type="text" class="form-control" v-model="data.provider" placeholder="ผู้จัดทำ">
                              </div>
                            </div>
                            <div class="col-md-4 col-xs-12">
                              <div class="form-group">
                                <label for="recipient-name" class="col-form-label">ผู้ตรวจสอบ :</label>
                                <input type="text" class="form-control" v-model="data.inspector" placeholder="ผู้ตรวจสอบ">
                              </div>
                            </div>
                            <div class="col-md-4 col-xs-12">
                              <div class="form-group">
                                <label for="recipient-name" class="col-form-label">ผู้อนุมัติ :</label>
                                <input type="text" class="form-control" v-model="data.approvers" placeholder="ผู้อนุมัติ">
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="card">
                      <header class="card-header">
                        <p class="card-header-title">Component</p>
                        <a href="#" class="card-header-icon" aria-label="more options">
                          <span class="icon">
                            <i class="fas fa-angle-down" aria-hidden="true"></i>
                          </span>
                        </a>
                      </header>
                      <div class="card-content">
                        <div class="content">
                          <div class="row">
                            <div class="col-md-6 col-xs-12">
                              <div class="form-group">
                                <label for="recipient-name" class="col-form-label">เลขที่ : </label>
                                <input type="text" class="form-control" v-model="data.address_no" required placeholder="เลขที่">
                              </div>
                            </div>
                            <div class="col-md-6 col-xs-12">
                              <div class="form-group">
                                <label for="recipient-name" class="col-form-label">ถนน :</label>
                                <input type="text" class="form-control" v-model="data.address_road" required placeholder="ถนน">
                              </div>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-6 col-xs-12">
                              <div class="form-group">
                                <label for="recipient-name" class="col-form-label">จังหวัด :</label>
                                <select class="form-control" v-model="data.province" required >
                                  <option value selected disabled>กรุณาเลือกจังหวัด</option>
                                  <option v-for="(obj, key) in changwats" :key="key" :value="obj.pid" :selected="obj.pid == data.province">{{obj.name}}</option>
                                </select>
                              </div>
                            </div>
                            <div class="col-md-6 col-xs-12">
                              <div class="form-group">
                                <label for="recipient-name" class="col-form-label">อำเภอ :</label>
                                <select class="form-control" v-model="data.district" required :disabled="!data.province" >
                                  <option value selected disabled>กรุณาเลือกอำเภอ</option>
                                  <option v-for="(obj, key) in amphoes" :key="key" v-if="obj.changwat_pid == data.province"  :value="obj.pid" :selected="obj.pid == data.district">{{obj.name}}</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-6 col-xs-12">
                              <div class="form-group">
                                <label for="recipient-name" class="col-form-label">ตำบล :</label>
                                <select class="form-control" v-model="data.parish" required :disabled="!data.district" >
                                  <option value selected disabled>กรุณาเลือกตำบล</option>
                                  <option v-for="(obj, key) in tambons" :key="key" v-if="obj.amphoe_pid == data.district"  :value="obj.pid" :selected="obj.pid == data.parish">{{obj.name}}</option>
                                </select>
                              </div>
                            </div>
                            <div class="col-md-6 col-xs-12">
                              <div class="form-group">
                                <label for="recipient-name" class="col-form-label">รหัสไปรษณีย์ : </label>
                                <input type="text" class="form-control" v-model="data.zipcode" required placeholder="รหัสไปรษณีย์">
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
              <div class="col-6">
                <div class="card">
                  <header class="card-header">
                    <p class="card-header-title">ข้อมูลทางการเงิน</p>
                    <a href="#" class="card-header-icon" aria-label="more options">
                      <span class="icon"><i class="fas fa-angle-down" aria-hidden="true"></i></span>
                    </a>
                  </header>
                  <div class="card-content">
                    <div class="content">
                      <div class="row">
                        <div class="col-md-12 col-xs-12">
                          <div class="form-group">
                            <label for="recipient-name" class="col-form-label">หมายเลขผู้เสียภาษี : </label>
                            <input type="text" class="form-control" v-model="data.taxNo" placeholder="หมายเลขผู้เสียภาษี">
                          </div>
                        </div>
                        <div class="col-md-12 col-xs-12">
                          <div class="form-group">
                            <label for="recipient-name" class="col-form-label">เครดิตเทอม :</label>
                            <input type="text" class="form-control" v-model="data.creditTerm" placeholder="เครดิตเทอม">
                          </div>
                        </div>
                        <div class="col-md-12 col-xs-12">
                          <div class="form-group">
                            <label for="recipient-name" class="col-form-label">ทุนจดทะเบียน : </label>
                            <input type="text" class="form-control" v-model="data.registeredCapital" placeholder="ทุนจดทะเบียน" >
                          </div>
                        </div>
                        <div class="col-md-12 col-xs-12">
                          <div class="form-group">
                            <label for="recipient-name" class="col-form-label"> ผู้รับการติดต่อการวางบิลและรับเงิน : </label>
                            <input type="text" class="form-control" v-model="data.billing_contact" placeholder="ผู้รับการติดต่อการวางบิลและรับเงิน">
                          </div>
                        </div>
                        <div class="col-md-12 col-xs-12">
                          <div class="form-group">
                            <label for="recipient-name" class="col-form-label">เบอร์โทร :</label>
                            <input type="text" class="form-control" v-model="data.billing_phone" placeholder="เบอร์โทร" >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                 <div class="card">
                  <header class="card-header">
                    <p class="card-header-title">ผู้ติดต่อหลัก</p>
                    <a href="#" class="card-header-icon" aria-label="more options">
                      <span class="icon"><i class="fas fa-angle-down" aria-hidden="true"></i></span>
                    </a>
                  </header>
                  <div class="card-content">
                    <div class="content">
                      <div class="row">
                        <div class="col-md-12 col-xs-12">
                          <div class="form-group">
                            <!-- <TableEasy
                              :column="table.customer.column"
                              :url="'http://192.168.4.12:9999/api/v1/customer/search/record'"
                              v-on:editRow="editCustomer($event)"
                              v-on:deleteRow="deleteCustomer($event)"
                            />-->
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="card">
                  <header class="card-header">
                    <p class="card-header-title">เอกสารแนบ</p>
                    <a href="#" class="card-header-icon" aria-label="more options">
                      <span class="icon"><i class="fas fa-angle-down" aria-hidden="true"></i></span>
                    </a>
                  </header>
                  <div class="card-content">
                    <div class="content">
                      <div class="row">
                        <div class="col-md-12 col-xs-12">
                          <div class="form-group">
                            <table class="table setStyle">
                              <tbody>
                                <tr>
                                  <td>
                                    <div class="container" style="width:-webkit-fill-available">
                                      <span
                                        style="position: absolute; height: 60px; width: 40px; z-index: 1;"
                                        onclick="operation.file.change(1)"
                                      ></span>
                                      <input id="check1" class="effect-one" type="checkbox">
                                      <label class="checkbox-label" for="check1">
                                        <span class="inner-label"></span>
                                        <span class="icon-label"></span>
                                        <div hidden>
                                          <input type="file" class="form-control" id="file1" onchange="operation.file.manageObj.insertObj(1)">
                                        </div>
                                        <span style="margin-left: 55px;">
                                          <label for="recipient-name" class="col-form-label">สำเนาบัตรประจำตัวผู้เสียภาษีอากร</label>
                                        </span>
                                      </label>
                                    </div>
                                    <span class="spacer"></span>
                                  </td>
                                  <td></td>
                                  <td>
                                    <div class="form-control" style="text-align: center" id="customer_file1">
                                      <p onclick="operation.file.change(1)" style="cursor: pointer;">กรุณาเลือกไฟล์</p>
                                    </div>
                                  </td>
                                </tr>
                                <tr id="trProgres1" hidden>
                                  <td colspan="3">
                                    <div class="progress" id="progress1">
                                      <div class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div class="container" style="width:-webkit-fill-available">
                                      <span style="position: absolute; height: 60px; width: 40px; z-index: 1;" onclick="operation.file.change(2)"></span>
                                      <input id="check2" class="effect-one" type="checkbox">
                                      <label class="checkbox-label" for="check2">
                                        <span class="inner-label"></span>
                                        <span class="icon-label"></span>
                                        <div hidden>
                                          <input type="file" class="form-control" id="file2" onchange="operation.file.manageObj.insertObj(2)">
                                        </div>
                                        <span style="margin-left: 55px;">
                                          <label for="recipient-name" class="col-form-label">สำเนาทะเบียนภาษีมูลค่าเพิ่ม( ภพ.20 )</label>
                                        </span>
                                      </label>
                                    </div>
                                    <span class="spacer"></span>
                                  </td>
                                  <td></td>
                                  <td>
                                    <div class="form-control" style="text-align: center" id="customer_file2">
                                      <p onclick="operation.file.change(2)" style="cursor: pointer;">กรุณาเลือกไฟล์</p>
                                    </div>
                                  </td>
                                </tr>
                                <tr id="trProgres2" hidden>
                                  <td colspan="3">
                                    <div class="progress" id="progress2">
                                      <div class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div class="container" style="width:-webkit-fill-available">
                                      <span style="position: absolute; height: 60px; width: 40px; z-index: 1;" onclick="operation.file.change(3)"></span>
                                      <input id="check3" class="effect-one" type="checkbox">
                                      <label class="checkbox-label" for="check3">
                                        <span class="inner-label"></span>
                                        <span class="icon-label"></span>
                                        <div hidden>
                                          <input type="file" class="form-control" id="file3" onchange="operation.file.manageObj.insertObj(3)">
                                        </div>
                                        <span style="margin-left: 55px;">
                                          <label for="recipient-name" class="col-form-label">สำเนาทะเบียนพาณิชย์</label>
                                        </span>
                                      </label>
                                    </div>
                                    <span class="spacer"></span>
                                  </td>
                                  <td></td>
                                  <td>
                                    <div class="form-control" style="text-align: center" id="customer_file3">
                                      <p onclick="operation.file.change(3)" style="cursor: pointer;">กรุณาเลือกไฟล์</p>
                                    </div>
                                  </td>
                                </tr>
                                <tr id="trProgres3" hidden>
                                  <td colspan="3">
                                    <div class="progress" id="progress3">
                                      <div class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div class="container" style="width:-webkit-fill-available">
                                      <span
                                        style="position: absolute; height: 60px; width: 40px; z-index: 1;"
                                        onclick="operation.file.change(4)"
                                      ></span>
                                      <input id="check4" class="effect-one" type="checkbox">
                                      <label class="checkbox-label" for="check4">
                                        <span class="inner-label"></span>
                                        <span class="icon-label"></span>
                                        <div hidden>
                                          <input type="file" class="form-control" id="file4" onchange="operation.file.manageObj.insertObj(4)">
                                        </div>
                                        <span style="margin-left: 55px;">
                                          <label for="recipient-name" class="col-form-label">สำเนาหนังสือรับรองการจดทะเบียนนิติบุคคล</label>
                                        </span>
                                      </label>
                                    </div>
                                    <span class="spacer"></span>
                                  </td>
                                  <td></td>
                                  <td>
                                    <div class="form-control" style="text-align: center" id="customer_file4">
                                      <p onclick="operation.file.change(4)" style="cursor: pointer;">กรุณาเลือกไฟล์</p>
                                    </div>
                                  </td>
                                </tr>

                                <tr id="trProgres4" hidden>
                                  <td colspan="3">
                                    <div class="progress" id="progress4">
                                      <div class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                  </td>
                                </tr>

                                <tr>
                                  <td>
                                    <div class="container" style="width:-webkit-fill-available">
                                      <span style="position: absolute; height: 60px; width: 40px; z-index: 1;" onclick="operation.file.change(5)"></span>
                                      <input id="check5" class="effect-one" type="checkbox">
                                      <label class="checkbox-label" for="check5">
                                        <span class="inner-label"></span>
                                        <span class="icon-label"></span>
                                        <div hidden>
                                          <input type="file" class="form-control" id="file5" onchange="operation.file.manageObj.insertObj(5)">
                                        </div>
                                        <span style="margin-left: 55px;">
                                          <label for="recipient-name" class="col-form-label">เอกสารแนะนำบริษัท</label>
                                        </span>
                                      </label>
                                    </div>
                                    <span class="spacer"></span>
                                  </td>
                                  <td></td>
                                  <td>
                                    <div class="form-control" style="text-align: center" id="customer_file5">
                                      <p onclick="operation.file.change(5)" style="cursor: pointer;">กรุณาเลือกไฟล์</p>
                                    </div>
                                  </td>
                                </tr>
                                <tr id="trProgres5" hidden>
                                  <td colspan="3">
                                    <div class="progress" id="progress5">
                                      <div class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                  </td>
                                </tr>

                                <tr>
                                  <td>
                                    <div class="container" style="width:-webkit-fill-available">
                                      <span style="position: absolute; height: 60px; width: 40px; z-index: 1;" onclick="operation.file.change(6)" ></span>
                                      <input id="check6" class="effect-one" type="checkbox">
                                      <label class="checkbox-label" for="check6">
                                        <span class="inner-label"></span>
                                        <span class="icon-label"></span>
                                        <div hidden>
                                          <input type="file" class="form-control" id="file6" onchange="operation.file.manageObj.insertObj(6)">
                                        </div>
                                        <span style="margin-left: 55px;">
                                          <label for="recipient-name" class="col-form-label">อื่นๆ</label>
                                        </span>
                                      </label>
                                    </div>
                                    <span class="spacer"></span>
                                  </td>
                                  <td>
                                    <input type="text" class="form-control" name="file_other" id="file_other" placeholder="ระบุ" disabled>
                                  </td>
                                  <td>
                                    <div class="form-control" style="text-align: center" id="customer_file6">
                                      <p onclick="operation.file.change(6)" style="cursor: pointer;">กรุณาเลือกไฟล์</p>
                                    </div>
                                  </td>
                                </tr>
                                <tr id="trProgres6" hidden>
                                  <td colspan="3">
                                    <div class="progress" id="progress6">
                                      <div class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" ></div>
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
    <div class="text-xs-center mt-3"  v-show="active < 1">
      <v-btn @click="next">next tab</v-btn>
    </div>
  </div>
</template>

<script>
import Tambons from "../../stores/Tambons";
import Amphoes from "../../stores/Amphoes";
import Changwats from "../../stores/Changwats";
export default {
  props:['color','setData'],
  mounted(){
    this.data = this.setData?{ ...this.setData }:this.data;
    console.log(this.data.group_id)
  },
  updated(){
    console.log("ddd")
  },
  data() {
    return {
      changwats: Changwats.data.changwats,
      amphoes : Amphoes.data.amphoes,
      tambons : Tambons.data.tambons,
      data : {
        LatLng: '',
        address: '',
        address_no: '',
        address_road: '',
        approvers: '',
        author_f_name: '',
        author_l_name: '',
        billing_contact: '',
        billing_phone: '',
        branchNo: '',
        code: '',
        contact_date: '',
        contact_name: '',
        contact_phone: '',
        creditTerm: '',
        dateUpdate: '',
        district: '',
        email: '',
        entryBy: '',
        entryDate: '',
        fax: '',
        file: '',
        file_other: '',
        group_id: '',
        id: '',
        inspector: '',
        is_remove: '',
        lineID: '',
        name: '',
        name_for_so: '',
        objective: '',
        parish: '',
        phone: '',
        prefix: '',
        provider: '',
        province: '',
        quotationContactEmail: '',
        quotationContactLineID: '',
        quotationContactName: '',
        quotationContactPhone: '',
        registeredCapital: '',
        soContactEmail: '',
        soContactFax: '',
        soContactLineID: '',
        soContactName: '',
        soContactPhone: '',
        taxNo: '',
        type_id: '',
        updateBy: '',
        zipcode: '',
      },
      active: null,
    };
  },
  methods: {
    next() {
      const active = parseInt(this.active);
      this.active = active < 2 ? active + 1 : 0;
      // this.text  = active < 1 ? 'Next tap' : 'Frist tap';
    }
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
/* p {
  font-weight: bolder;
  font-size: large;
} */
.tabs li a {
  color: grey;
}
.content ul {
  list-style: disc outside;
  margin: 0px !important;
  padding: 0px !important;
}
</style>