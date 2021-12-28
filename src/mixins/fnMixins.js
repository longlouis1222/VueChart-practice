export const fnMixins = {
  methods: {
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
      return dateTimeString;
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
    fn_getDataRd() {
      this.mData.listDataRd1 = [];
      for (let i = 0; i < this.listDate.length; i++) {
        let num1 = this.getRandomInt();
        let num2 = this.getRandomInt();
        this.mData.listDataRd1.push(num1);
        this.mData.listDataRd2.push(num2);
      }
    },
    getRandomInt() {
      return Math.floor(Math.random() * (150 - 5 + 1) + 5);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
