<template>
  <el-main class="p-4">
    <el-row :gutter="20">
      <el-col :span="10">
        <div class="grid-content bg-purple box-container">
          <div>
            <p style="font-size: 18px">TDS hiện tại</p>
            <span style="font-size: 35px"
              >[
              <countTo
                :startVal="startVal"
                :endVal="endVal"
                :duration="10000"
              ></countTo>
              ] PPM</span
            >
          </div>
          <div>
            <i class="el-icon-data-line" style="font-size: xxx-large"></i>
          </div>
        </div>
      </el-col>
      <el-col :span="12" :offset="2">
        <div class="grid-content bg-purple p-1">
          <p align="center">Thống kê dữ liệu</p>
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="120px"
          >
            <b-row>
              <b-col md="8">
                <el-form-item
                  label="Từ ngày"
                  style="text-align: center; font-size: 18px"
                  prop="date1"
                >
                  <el-date-picker
                    type="date"
                    placeholder="Pick a date"
                    v-model="ruleForm.date1"
                    style="width: 100%"
                    format="dd-MM-yyyy"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="đến ngày" prop="date2">
                  <el-date-picker
                    type="date"
                    placeholder="Pick a date"
                    v-model="ruleForm.date2"
                    style="width: 100%"
                    format="dd-MM-yyyy"
                  ></el-date-picker>
                </el-form-item>
              </b-col>
              <b-col class="md-4 mt-4">
                <el-button type="primary" @click="submitForm('ruleForm')"
                  >Search</el-button
                >
              </b-col>
            </b-row>
          </el-form>
        </div>
      </el-col>
    </el-row>
    <b-row class="mt-4">
      <div class="grid-content bg-purple">
        <line-chart
          id="myChart"
          :chart-data="data"
          :options="options"
        ></line-chart>
      </div>
    </b-row>
  </el-main>
</template>

<script>
import LineChart from "./LineChart";
import countTo from "vue-count-to";
import { Loading } from "element-ui";
import axios from "axios";
export default {
  components: {
    LineChart,
    countTo,
  },
  data() {
    const item = {
      date: "2016-05-02",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
    };
    return {
      loading: false,
      loadingInstance: Loading.service({
        fullscreen: true,
        background: "rgba(0, 0, 0, 0.2)",
      }),
      dataFetch: [],
      startVal: 0,
      endVal: null,
      tableData: Array(20).fill(item),
      data: null,
      options: null,
      gradient: "rgba(255, 0,0, 0.25)",
      gradient2: "rgba(0, 231, 255, 0.25)",
      mData: {
        listDate: [],
        listDataRd1: [],
        listDateTime: [],
        listDataFetch: [],
        countConfig: {
          startVal: 0,
          endVal: 33,
          timeDuration: 1500,
        },
      },
      ruleForm: {
        date1: "",
        date2: "",
      },
      rules: {
        date1: [
          {
            type: "date",
            required: true,
            message: "Please pick a date",
            trigger: "change",
          },
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "Please pick a time",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    fn_getListDate(startDate, endDate, steps = 1) {
      const dateArray = [];
      let currentDate = new Date(startDate);
      let dateLimit = new Date(endDate);
      while (currentDate <= dateLimit) {
        dateArray.push(new Date(currentDate));
        // Use UTC date to prevent problems with time zones and DST
        currentDate.setUTCDate(currentDate.getUTCDate() + steps);
      }
      return dateArray;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.listDate = this.fn_getListDate(
            this.ruleForm.date1,
            this.ruleForm.date2
          );
          this.listDate = this.listDate.map((item) => {
            return this.fn_formatDate(item);
          });
          this.fn_getDataRd();
          this.fillData();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    fn_formatDate(date) {
      date = new Date(date);
      date.setDate(date.getDate() + 1);
      const dateString =
        date.getUTCFullYear() +
        "/" +
        ("0" + (date.getUTCMonth() + 1)).slice(-2) +
        "/" +
        ("0" + date.getUTCDate()).slice(-2);
      return dateString;
    },
    fn_formatDatetime(m) {
      m = new Date(m);
      const dateTimeString =
        m.getFullYear() +
        "/" +
        ("0" + (m.getMonth() + 1)).slice(-2) +
        "/" +
        ("0" + m.getDate()).slice(-2) +
        " " +
        ("0" + m.getHours()).slice(-2) +
        ":" +
        ("0" + m.getMinutes()).slice(-2) +
        ":" +
        ("0" + m.getSeconds()).slice(-2);
      console.log(dateTimeString);
      return dateTimeString;
    },
    fn_getDataRd() {
      this.mData.listDataRd1 = [];
      for (let i = 0; i < this.listDate.length; i++) {
        let num1 = this.getRandomInt();
        this.mData.listDataRd1.push(num1);
      }
    },
    fillData() {
      if (!this.listDate) {
        this.data = {
          labels: this.mData.listDateTime,
          datasets: [
            {
              label: "Cầu Giấy",
              borderColor: "#FC2525",
              pointBackgroundColor: "white",
              borderWidth: 1,
              pointBorderColor: "#FC2525",
              backgroundColor: this.gradient,
              data: this.mData.listDataFetch,
            },
          ],
        };
        this.options = {
          responsive: true,
          maintainAspectRatio: false,
        };
      } else if (this.listDate) {
        this.data = {
          labels: this.listDate,
          datasets: [
            {
              label: "Cầu Giấy",
              borderColor: "#FC2525",
              pointBackgroundColor: "white",
              borderWidth: 1,
              pointBorderColor: "#FC2525",
              backgroundColor: this.gradient,
              data: this.mData.listDataRd1,
            },
          ],
        };
        this.options = {
          responsive: true,
          maintainAspectRatio: false,
        };
      }
    },
    async fn_getData() {
      await axios
        .get(`https://chatluongnuoc.herokuapp.com/`)
        .then((response) => {
          this.dataFetch = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
      if (this.dataFetch) {
        await this.fn_getListDataFetch();
      }
    },
    fn_getListDataFetch() {
      this.mData.listDateTime = this.dataFetch.map((item) => {
        return this.fn_formatDatetime(item.time);
      });
      this.mData.listDataFetch = this.dataFetch.map((item) => {
        return item.value;
      });
    },
    getRandomInt() {
      return Math.floor(Math.random() * (150 - 5 + 1) + 5);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  created() {
    this.endVal = this.getRandomInt();
  },
  async mounted() {
    await this.fn_getData();
    if (this.dataFetch) {
      this.loadingInstance.close();
    }
    await this.fillData();
  },
};
</script>

<style>
</style>