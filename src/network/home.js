import { request } from './request'

export function getHomeMultiData() {
    return request({
        //url:'/test/getBanners'
        url: '/home/multidata'
    });
}

export function getGoodsData(type, page) {
    return request({
        url: '/test/getGoods',
        params: {
            type,
            page
        }
    });
}
export function getHomeGoods(type, page) {
    return request({
        url: '/home/data',
        params: {
            type,
            page
        }
    });

}