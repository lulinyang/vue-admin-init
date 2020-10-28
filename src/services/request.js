/* eslint-disable */
import Vue from 'vue';
import axios from 'axios'
import router from '@/router';
const vue = new Vue();
export class fetch {
  constructor(val) {
    this.http = axios.create({
      timeout: 100000
    });
    this.setRequestInterceptors()
    this.setResponseInterceptors()
  }

  /**
   * 设置请求头拦截
   */
  setRequestInterceptors() {
    this.http.interceptors.request.use(config => {
      if (!config.params) {
        config.params = {}
      }
      config.headers['Content-Type'] = 'application/json; charset=UTF-8';
      return config
    }, error => {
      console.log(error);
    });
  }
  /**
   * 设置reponse 拦截
   */
  setResponseInterceptors() {
    this.http.interceptors.response.use(res => {
      if (res.data.code * 1 !== 1) {
        vue.notify({
          type: 'error',
          title: '错误',
          msg: res.data.msg || '喝口水吧，让数据飞一会，请稍后再试'
        });
        return Promise.reject(res.data);
      }
      return res.data;
    }, error => {
      switch (error.response.status) {
        case 500:
          vue.notify({
            type: 'error',
            title: '错误',
            msg: '服务器内部错误，请联系开发人员！'
          });
          break;
        case 502:
          vue.notify({
            type: 'error',
            title: '错误',
            msg: '502 Bad Gateway'
          });
          break;
        case 403:
          vue.notify({
            type: 'error',
            title: '错误',
            msg: '服务器理解请求客户端的请求，但是拒绝执行此请求！'
          });
          break;
        case 405:
          vue.notify({
            type: 'error',
            title: '错误',
            msg: '客户端请求中的方法被禁止，请联系开发人员！'
          });
          break;
        case 401:
          vue.notify({
            type: 'error',
            title: '错误',
            msg: '没有权限！'
          });
          break;
        case 408:
          vue.notify({
            type: 'error',
            title: '错误',
            msg: '请求超时！'
          });
          break;
      }
      return Promise.reject(error.response);
    })
  }
  /**
   * post 请求
   */
  post(url, data, specenv) {
    if (specenv) url += `specenv${specenv}specenv`
    let options = {
      url,
      method: 'POST',
      data,
    }
    return this.request(options)
  }

  /**
   * get 请求
   */
  get(url, params, specenv) {
    if (specenv) url += `specenv${specenv}specenv`
    let options = {
      url,
      methods: 'GET',
      params
    }
    return this.request(options)
  }

  /**
   * put 请求
   */
  put(url, params, specenv) {
    if (specenv) url += `specenv${specenv}specenv`
    let options = {
      url,
      methods: 'PUT',
      params
    }
    return this.request(options)
  }

  /**
   * delete 请求
   */
  delete(url, params, specenv) {
    if (specenv) url += `specenv${specenv}specenv`
    let options = {
      url,
      methods: 'DELETE',
      params
    }
    return this.request(options)
  }

  /**
   * patch 请求
   */
  patch(url, params, specenv) {
    if (specenv) url += `specenv${specenv}specenv`
    let options = {
      url,
      methods: 'PATCH',
      params
    }
    return this.request(options)
  }

  /**
   * @param {*} config
   */
  request(config) {
    return this.http.request(config)
  }
}