<template>
  <el-main style="height: 100vh; border: 1px solid #eee" class="p-4">
    <p>Bảng chỉ số TDS tại Cầu Giấy</p>
    <el-table
      :data="tableData"
      border
      height="80%"
      style="width: 100%; box-shadow: 1px 2px 5px 5px #bebebe"
    >
      <el-table-column prop="" label="ID" width="180" align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        prop="location"
        label="Address"
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="value" label="Giá trị TDS (PPM)" align="center">
      </el-table-column>
      <el-table-column prop="time" label="Thời gian" align="center">
      </el-table-column>
    </el-table>
  </el-main>
</template>
<script>
import { Loading } from "element-ui";
import axios from "axios";
export default {
  data() {
    return {
      loadingInstance: Loading.service({
        fullscreen: true,
        background: "rgba(0, 0, 0, 0.2)",
      }),
      tableData: [],
      dataFetch: [],
      mData: {
        listDataFetch: [],
        listDateTime: [],
      },
    };
  },
  methods: {
    fn_initTable() {
      this.tableData = this.dataFetch;
    },
    fn_formatDate(date) {
      date = new Date(date);
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
        m.getUTCFullYear() +
        "/" +
        ("0" + (m.getUTCMonth() + 1)).slice(-2) +
        "/" +
        ("0" + m.getUTCDate()).slice(-2) +
        " " +
        ("0" + m.getUTCHours()).slice(-2) +
        ":" +
        ("0" + m.getUTCMinutes()).slice(-2) +
        ":" +
        ("0" + m.getUTCSeconds()).slice(-2);
      return dateTimeString;
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
        this.dataFetch = await this.fn_changeData(this.dataFetch);
      }
    },
    fn_changeData(resData) {
      resData.forEach((item) => {
        if (item.time) {
          item.time = this.fn_formatDatetime(item.time);
        }
        if (item.location == "cầu giấy") {
          item.location = "Cầu Giấy";
        }
      });
      return resData;
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1) + 5);
    },
  },
  async created() {
    await this.fn_getData();
    if (this.dataFetch) {
      this.loadingInstance.close();
      await this.fn_initTable();
    }
  },
};
</script>
<style>
</style>