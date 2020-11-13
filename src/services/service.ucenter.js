/* eslint-disable */
import {
  fetch
} from './request';

export class ucenterService extends fetch {
  constructor() {
    super('')
  }

  /* 用户信息
   */
  getdetail(data) {
    return this.get('/api/user/userInfo', data)
  }

  addUser(data) {
    return this.post('/api/user/addUser', data)
  }
}