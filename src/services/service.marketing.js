import { fetch } from "./request";

export class marketingService extends fetch {
  constructor() {
    super("");
  }

  //新增优惠券
  addCoupon(data) {
    return this.post("/api/marketing/addCoupon", data);
  }

  //优惠券列表
  searchCoupon(data) {
    return this.post("/api/marketing/searchCoupon", data);
  }

  //优惠券列表
  getCouponInfo(data) {
    return this.get("/api/marketing/getCouponInfo", data);
  }

  //编辑优惠券
  editCoupon(data) {
    return this.post("/api/marketing/editCoupon", data);
  }

  //删除优惠券
  delCoupon(data) {
    return this.post("/api/marketing/delCoupon", data);
  }
  //新增限时折扣
  addDiscount(data) {
    return this.post("/api/marketing/addDiscount", data);
  }
  //限时折扣列表
  getDiscountList(data) {
    return this.post("/api/marketing/getDiscountList", data);
  }
  //限时折扣详情
  getDiscountInfo(data) {
    return this.get("/api/marketing/getDiscountInfo", data);
  }
  //编辑限时折扣
  editDiscount(data) {
    return this.post("/api/marketing/editDiscount", data);
  }
  //删除限时折扣
  delDiscount(data) {
    return this.post("/api/marketing/delDiscount", data);
  }
}
