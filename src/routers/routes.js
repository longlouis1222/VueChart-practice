import HaDong from "../components/HaDong.vue";
import CauGiay from "../components/CauGiay.vue";
import Body from "../components/Body.vue";
import TableCG from "../components/TableCG.vue";
import TableHD from "../components/TableHD.vue";
export const routes = [
  { path: "/", name: "home", component: Body },
  {
    path: "/CauGiay",
    name: "caugiay",
    component: CauGiay,
  },
  { path: "/HaDong", name: "hadong", component: HaDong },
  { path: "/CauGiay-detail", name: "caugiayDetail", component: TableCG },
  { path: "/HaDong-detail", name: "hadongDetail", component: TableHD },
];
