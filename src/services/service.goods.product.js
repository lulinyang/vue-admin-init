/* eslint-disable */
import {
  fetch
} from './request';

export class goodsProductService extends fetch {
  constructor() {
    super('')
  }

  //分类列表
  getCateList(data) {
    return this.post('/api/goods/getCateList', data)
  }
  //根据pid查询分类
  getPidCate(data) {
    return this.get('/api/goods/getPidCate', data)
  }
   //分类详情
   getCateInfo(data) {
    return this.get('/api/goods/getCateInfo', data)
  }
  //新增分类
  addCate(data) {
    return this.post('/api/goods/addCate', data)
  }
  //编辑分类
  editCate(data) {
    return this.post('/api/goods/editCate', data)
  }
  //删除分类
  deleteCate(data) {
    return this.post('/api/goods/deleteCate', data)
  }
  //商品列表
  getProductList(data) {
    return this.post('/api/goods/getProductList', data)
  }
  //新增商品
  addProduct(data) {
    return this.post('/api/goods/addProduct', data)
  }
  //商品详情
  getProductInfo(data) {
    return this.get('/api/goods/getProductInfo', data)
  }
  //编辑商品
  editProduct(data) {
    return this.post('/api/goods/editProduct', data)
  }
  //删除商品
  delProduct(data) {
    return this.post('/api/goods/delProduct', data)
  }
}