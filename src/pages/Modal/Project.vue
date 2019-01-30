<template>
   <div>
      <v-tabs v-model="active" :color="color" dark slider-color="white">
              <v-tab>ข้อมูลหลัก</v-tab>
              <v-tab ripple>ข้อมูลผู้ติดต่อ</v-tab>
              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <div class="row">
                      <div class="col-6">
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
                                    <label for="recipient-name" class="col-form-label">รหัสโครงการ : </label>
                                    <input type="text" class="form-control" id="code" name="code" required placeholder="รหัสโครงการ">
                                  </div>
                                </div>
                                <div class="col-md-12 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">ชื่อโครงการ : </label>
                                    <input type="text" class="form-control" id="title" name="title" required placeholder="ชื่อโครงการ">
                                  </div>
                                </div>
                                <div class="col-md-12 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">ฤกษ์ตอก :</label>
                                    <div class="row">
                                      <div class="col-md-6 col-xs-6">
                                        <div class="input-group date" data-provide="datepicker" data-date-format="yyyy-mm-dd">
                                          <input type="text" class="form-control" id="goodtime" name="goodtime" required placeholder="วันที่ติดต่อครั้งแรก">
                                          <div class="input-group-addon">
                                            <span class="glyphicon glyphicon-th"></span>
                                          </div>
                                        </div>
                                      </div>
                                      <div class="col-md-6 col-xs-6">
                                        <div class="input-group bootstrap-timepicker timepicker">
                                          <input id="timepicker" name="timepicker" type="text" required class="form-control input-small" placeholder="00:00:00">
                                          <span class="input-group-addon">
                                            <i class="glyphicon glyphicon-time"></i>
                                          </span>
                                        </div>
                                      </div>
                                    </div>
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
                            <p class="card-header-title">ผู้ติดต่อหลัก</p>
                            <a href="#" class="card-header-icon" aria-label="more options">
                              <span class="icon"><i class="fas fa-angle-down" aria-hidden="true"></i></span>
                            </a>
                          </header>
                          <div class="card-content">
                            <div class="content">
                              <div class="row">
                                <div class="col-md-6 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">เลขที่ :</label>
                                    <input type="text" class="form-control" id="address_no" name="address_no" required placeholder="เลขที่">
                                  </div>
                                </div>
                                <div class="col-md-6 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">ถนน :</label>
                                    <input type="text" class="form-control" id="address_road" name="address_road" required placeholder="ถนน">
                                  </div>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-md-6 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">จังหวัด :</label>
                                    <select class="form-control" id="province" name="province" required onchange="operation.thai.change.district(this.value)">
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
                                    <select class="form-control" id="district" name="district" required onchange="operation.thai.change.parish(this.value)" disabled="disabled">
                                      <option value selected disabled>กรุณาเลือกอำเภอ</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-md-6 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">ตำบล :</label>
                                    <select class="form-control" id="parish" name="parish" disabled="disabled" required onchange="operation.thai.moveMarker(this.options[this.selectedIndex].getAttribute(`lat`), this.options[this.selectedIndex].getAttribute(`lng`))" >
                                      <option value selected disabled>กรุณาเลือกตำบล</option>
                                    </select>
                                  </div>
                                </div>
                                <div class="col-md-6 col-xs-12">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">รหัสไปรษณีย์ : </label>
                                    <input type="text" class="form-control" id="zipcode" name="zipcode" required placeholder="รหัสไปรษณีย์">
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
                            <p class="card-header-title">ข้อมูลโครงการ</p>
                            <a href="#" class="card-header-icon" aria-label="more options">
                              <span class="icon"><i class="fas fa-angle-down" aria-hidden="true"></i></span>
                            </a>
                          </header>
                          <div class="card-content">
                            <div class="content">
                              <div class="row">
                                <div class="col-6">
                                  <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">บริษัท / ชื่อผู้รับเหมา :</label>
                                    <select class="form-control js-example-data-array-selected select2-hidden-accessible" required onchange="operation.project.change(this.value)" id="customer_id" tabindex="-1" aria-hidden="true" >
                                      <option value="3248">ทวีพงศุ์ เมฆฉาย</option>
                                    </select>
                                    <span class="select2 select2-container select2-container--default select2-container--below select2-container--focus" dir="ltr" style="width: 100%;" >
                                      <span class="selection">
                                        <span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-labelledby="select2-customer_id-container" >
                                          <span class="select2-selection__rendered" id="select2-customer_id-container" title="ทวีพงศุ์ เมฆฉาย" >
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
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-6">
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
                                <div class="col-md-6">
                                  <div class="form-group">
                                    <!-- <TableEasy
                                      :column="table.customer.column"
                                      :url="'http://192.168.4.12:9999/api/v1/customer/search/record'"
                                      v-on:editRow="editCustomer($event)"
                                      v-on:deleteRow="deleteCustomer($event)"
                                    /> -->
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
            <div class="text-xs-center mt-3" v-show="active < 1">
              <v-btn @click="next">next tab</v-btn>
            </div>
          </div>
</template>

<script>
export default {
   props:['color','setData'],
  created(){
    console.log(this.setData)
  },
  data() {
    return {
      active: null,
    };
  },
  methods: {
    next() {
      const active = parseInt(this.active);
      this.active = active < 2 ? active + 1 : 0;
      // this.text  = active < 1 ? 'Next tap' : 'Frist tap';
      // console.log(active)
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