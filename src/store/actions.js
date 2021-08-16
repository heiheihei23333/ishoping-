export default {
    addCart(context, payload) {
        return new Promise((resolve) => {
            // payload新添加的商品
            let oldProduct = null;
            // 另一种判断方法：
            // let oldProduct = state.cartList.find(item => item.iid === payload.iid)
            for (let item of context.state.cartList) {
                // payload为传进来的值
                // 如果传进来的值和当前值一样
                if (item.iid === payload.iid) {
                    oldProduct = item
                }
            }
            // 如果oldProduct里有值
            if (oldProduct) {
                // oldProduct.count += 1
                context.commit('addCounter', oldProduct)
                resolve('已添加到购物车！')
            } else {
                payload.count = 1;
                context.commit('addToCart', payload)
                    // resolve('添加了新的商品')
                    // resolve('加入购物车成功！')
                resolve('已添加到购物车！')
            }
        })
    }

}