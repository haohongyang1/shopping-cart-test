module.exports = {
    publicPath: '/mycart',
    configurebleWebpack: {
        devServer: {
            before (app) { // TODO goods接口如何请求成功？
                app.get('/goods', (req, res) => {
                    res.json([
                        {id:1, price: 2}
                    ])
                })
            }
        }
    }
}