```javascript

 static install(Vue) {
        // 判断当前插件是否已经安装
        if (VueRouter.install.installed) { return }
        VueRouter.install.installed = true
        // 把Vue构造函数记录到全局变量
        _Vue = Vue
        // 吧创建Vue实例时候传入的router注入到Vue实例上
        // _Vue.prototype.$router = this.$options.router
        // 此时this还不是vue实例 所以需要获取vue实例再写上面这句话
        // 混入
        _Vue.mixin({
            beforeCreate() {
                // 判断是否为组件或者是Vue实例
                if (this.$options.router) {
                    _Vue.prototype.$router = this.$options.router
                    this.$options.router.init()
                }
            },
        })
    }
```