/* eslint-disable */
import {
  fetch
} from './request';

export class ucenterService extends fetch {
  constructor() {
    super('')
  }

  /* 测试
   */
  getdetail(data) {
    return this.get('/api/user/userInfo', data)
  }
}