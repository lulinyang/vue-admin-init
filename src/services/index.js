/* eslint-disable */
import {
  ucenterService
} from '@/services/service.ucenter.js'

import {
  goodsProductService
} from '@/services/service.goods.product.js'

import {
  marketingService
} from '@/services/service.marketing.js'


export const UcenterService = new ucenterService();
export const GoodsProductService = new goodsProductService();
export const MarketingService = new marketingService();