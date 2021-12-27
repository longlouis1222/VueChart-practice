<template>
  <el-main style="height: 100vh; border: 1px solid #eee" class="p-4">
    <p>Bảng chỉ số TDS tại Hà Đông</p>
    <el-table
      :data="tableData"
      border
      height="80%"
      style="width: 100%; box-shadow: 1px 2px 5px 5px #bebebe"
    >
      <el-table-column prop="id" label="ID" width="180" align="center">
      </el-table-column>
      <el-table-column
        prop="address"
        label="Address"
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="tds" label="Giá trị TDS (PPM)" align="center">
      </el-table-column>
      <el-table-column prop="time" label="Thời gian" align="center">
      </el-table-column>
    </el-table>
  </el-main>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    fn_initTable() {
      let n = new Date("2020-12-31");
      for (let i = 1; i <= 365; i++) {
        let dateT = n.setDate(n.getDate() + 1);
        let o = {
          id: i,
          address: "Hà Đông",
          tds: this.getRandomInt(),
          time: this.fn_formatDate(dateT),
        };
        this.tableData.push(o);
      }
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
    getRandomInt() {
      return Math.floor(Math.random() * (150 - 5 + 1) + 5);
    },
  },
  created() {
    this.fn_initTable();
  },
};
</script>