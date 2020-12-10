/* eslint-disable */
import {
  fetch
} from './request';

export class ucenterService extends fetch {
  constructor() {
    super('')
  }
  //登录
  login(data) {
    return this.post('/api/user/login', data)
  }
  //用户列表
  userList(data) {
    return this.post('/api/user/userList', data)
  }
  //获取菜单
  obtainMenus(data) {
    return this.get('/api/user/obtainMenus', data)
  }
  /* 用户信息
   */
  getdetail(data) {
    return this.get('/api/user/userInfo', data)
  }
  //新增用户
  addUser(data) {
    return this.post('/api/user/addUser', data)
  }
  //编辑用户
  editUser(data) {
    return this.post('/api/user/editUser', data)
  }
  //删除用户
  deleteUser(data) {
    return this.post('/api/user/deleteUser', data)
  }
  //角色列表
  roleList(data) {
    return this.post('/api/user/roleList', data)
  }
  //添加菜单
  addmeun(data) {
    return this.post('/api/user/addmeun', data)
  }
  //修改菜单
  editmenu(data) {
    return this.post('/api/user/editmenu', data)
  }
  //获取所有接口
  getAllUrl(data) {
    return this.post('/api/user/getAllUrl', data)
  }
   //修改菜单
   editApi(data) {
    return this.post('/api/user/editApi', data)
  }

  //删除菜单
  delMenu(data) {
    return this.post('/api/user/delMenu', data)
  }

  //新增角色 addRole
  addRole(data) {
    return this.post('/api/user/addRole', data)
  }

  //角色详情
  getRoleInfo(data) {
    return this.get('/api/user/getRoleInfo', data)
  }

  //编辑角色
   editRole(data) {
    return this.post('/api/user/editRole', data)
  }

  //删除角色
  delRole(data) {
    return this.post('/api/user/delRole', data)
  }

  //删除角色
  getAllRole(data) {
    return this.get('/api/user/getAllRole', data)
  }
}