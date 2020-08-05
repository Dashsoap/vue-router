let _Vue = null
export default class VueRouter {
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
    constructor(options) {
        this.options = options
        this.routerMap = {}
        this.data = _Vue.observable({// vue中的动态属性
            current: '/'
        })
    }
    init() {
        this.createRouteMap()
        this.initComponents(_Vue)
        this.initEvent()
    }
    createRouteMap() {
        //遍历所有的路由规则解析成键值对 传入routeMap中
        this.options.routes.forEach(route => {
            this.routerMap[route.path] = route.component
        })
    }
    initComponents(Vue) {
        Vue.component('router-link', {
            props: {
                to: String
            },
            render(h) {
                return h('a', {
                    attrs: {
                        href: this.to
                    },
                    on: {
                        click: this.clickHandler
                    }
                }, [this.$slots.default])
       
            }, 
            methods: {
                clickHandler(e) {
                    history.pushState({},'',this.to)
                    this.$router.data.current = this.to
                    e.preventDefault()
                }
            },
            // template:'<a :herf="to"><slot></slot></a>'
        })
        const self = this
        Vue.component('router-view', {
            render(h) {
                const component = self.routerMap[self.data.current]
                return h(component)
            },
        })
    }
    initEvent(){
        window.addEventListener('popstate',()=>{
            this.data.current = window.location.pathname
        })
    }
}

