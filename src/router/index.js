import Vue from 'vue'
import VueRouter from 'vue-router'
// 懒加载
const Home = () =>
    import ('../views/home/Home')
const Category = () =>
    import ('../views/category/Category')
const Cart = () =>
    import ('../views/cart/Cart')
const Profile = () =>
    import ('../views/profile/Profile')
const Detail = () =>
    import ('../views/detail/Detail')

// 1.安装插件
Vue.use(VueRouter)
    // 3.配置路由关系
const routes = [{
            path: '/',
            redirect: '/home'
        }, {
            path: '/category',
            component: Category
        }, {
            path: '/home',
            component: Home
        }, {
            path: '/cart',
            component: Cart
        }, {
            path: '/profile',
            component: Profile
        },
        {
            path: '/detail/:iid',
            component: Detail
        },
    ]
    // 2.创建路由对象
const router = new VueRouter({
    routes,
    mode: 'history'
})
export default router