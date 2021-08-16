module.exports = {
        configureWebpack: {
            resolve: {
                alias: {
                    //'src': '@',
                    'assets': '@/assets',
                    'common': '@/common',
                    //'components': '@/components',
                    // 这里用components的别名会报错暂时不用
                    'network': '@/network',
                    'views': '@/views',
                }
            }
        }
    }
    // const path = require('path');

// function resolve(dir) {
//     return path.join(_dirname, dir)
// }
// module.exports = {
//     chainWebpack: config => {
//         config.resolve.alias
//             //.set("@", resolve("src"))
//             .set("assets", resolve("src/assets"))
//     }
// }