# Vue

## 1. 谈谈你对 MVVM 对理解 ？

目标：职责划分，分层（将 Model 层，view 层进行分类）借鉴后端思想。对于前端而言就是如何将数据同步到页面。
mvc 模式： 但在前端，数据变化无法同步到视图中。需要将逻辑聚拢在 controller 层。

mvvm 模式：映射关系简化，（隐藏了 controller） ，开发不需要关注数据与 dom 的关联关系，转化关系。只用关注数据的变化。viewModel：类似实现 v-model ，Object.defineProperty()。

MVVM 模式：它是一种分层模式，目的是为了职责明确划分层级，借鉴了后端项目的思想，类似于 mvc 。
MVVM 的具体内容： m model， v view ， vm view Model 视图模型对象。

## 2. 请说一下 Vue2 响应式数据的理解 ？

响应式数据：数据变了，页面(视图)更新成最新的数据。
不管：页面数据变了，model 的数据变成最新的。

Vue 底层实现是通过对 数组和对象类型的值发生变化时，进行了劫持。  
对象内部通过 `defineReactive` 方法，使用 `Object.defineProperty(obj,prorp,{})` 将属性进行劫持（只会劫持已经存在的属性）。
数组 是通过重写数组方法来实现。 `push pop shift unshift splice sort reverce` 。
多层对象是通过递归来实现劫持。

## 3. Vue 中如何检测数组变化 ？

数组考虑性能原因没有使用 `Object.defineProperty` 对数组的每一项惊喜拦截，是通过重写数组
的 7 个方法。  
数组中如果是对象数据类型也会进行递归劫持  
数组的索引和长度变化是无法监控到的。

## 4. Vue 中如何进行依赖收集 ？

每个属性都拥有自己的 `dep` 属性， 它用于存放所依赖的 watcher （渲染 watcher， computed watcher ，watch 用户 watcher） ，当属性变化后 set 就会通知自己对应的 watcher 去更新。

默认在初始化时会调用 render 函数，此时会触发属性依赖收集 `dep.depend`。
当属性发生修改时会触发 `watcher` 更新 `dep.notify()`

## 5. 如何理解 Vue 中模版编译原理 ？ 核心问题：如何将 template 转换成 render 函数？

主要就是做了三步。

1. 将 template 模版转化成 ast 语法树。 `parseHTML` . 使用了正则匹配方式，一个对象结构，记录 html 树结构
2. `optimize` 对静态语法 做 静态标记 markup 。 用于为 `diff` 阶段做优化，如果是静态节点就跳过 diff 操作。
3. 重新生成代码 `code = generate(ast,options)` 。 后面通过 new Function 变成 render 函数，将这个代码执行创建出 vnode。

## 6. Vue 生命周期钩子是如何实现的 ？

它们是回调函数，当创建组件实例的过程，进行调用对应的钩子方法。`callHook(vm,'beforeCreate')`  
内部会对钩子函数进行处理，将钩子函数维护成数组的形势。

## 7. Vue 生命周期方法有哪些？ 一般在哪一步发送请求及其原因？

`beforeCreate` 在实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用。

`created ` 实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：数据观测(data observer)，属性和方法的运算， watch/event 事件回调。这里没有$el

`beforeMount` 在挂载开始之前被调用：相关的 render 函数首次被调用。

`mounted ` el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。

`beforeUpdate` 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。

`updated` 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。

`beforeDestroy` 实例销毁之前调用。在这一步，实例仍然完全可用。

`destroyed` Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。 该钩子在服务器端渲染期间不被调用。

`keep-alive ` (activated 和 deactivated)

在哪发送请求都可以，主要看具体你要做什么事 !!!  
如果是 ssr 的 vue 项目 ，会在 `created` 钩子上。

## 8. Vue.mixin 使用场景和原理

Vue.mixin 是全局混人，使用后每个创建的组件实例都会被影响。一般用于作为 **插件** 发布。

原理：当组件初始化时会被调用 `mergeOptions` 方法进行合并，采用策略模式针对不同的数据进行不同的合并。如果混人的数据和本身组件中的数据冲突，就采用“就近原则” 以组件的数据为准。

建议:建议少用，会用数据来源不清晰的问题，命名冲突问题，依赖问题。

## 9. Vue 组件 data 为什么必须是个函数 ？

每次使用组件时都会对组件进行实例化操作，并调用 data 函数返回一个对象作为组件的数据源。这样可以保证多个组件间数据互不影响。

## 10. vm.$nextTick 在哪里使用？ 原理是什么？

`vm.$nextTick` 中的回调是在下次 DOM 更新结束后执行的回调函数，用于获取更新后的 DOM。

原理：Vue 中视图数据更新是异步的，使用 `vm.$nextTick` 方法可以保证用户定义的逻辑在视图更新之后执行。

## 11. computed 和 watch 区别 ？

底层实现：
computed 和 watch 都是基于 Watcher 来实现的。
computed 属性具备缓存，依赖的值不发生变化，对计算属性取值不会重新执行它的方法。
watch 是监视值的变化，当值发生变化时调用对应的回调函数。用法 可以对对象属性深度监视，立即执行。

## 12. Vue.set(obj,prop/index,value) 方法是如何实现的？

这个方法是给对象，数组增加响应式数据。
当给对象新增不存在的属性，会先将属性定义成响应式的，调用 `defineReactive`，然后触发对象依赖的 watcher 去更新。
当修改数组索引时，应该是调用数组本身的 splice 方法去更新数组。因为数组初始化时，已经 splice 被劫持修改成响应式的了。

## 13. vue 为什么需要虚拟 DOM ？

1. virtual dom 是用 js 对象来描述真实的 DOM ，是对真实 DOM 的抽象。
2. 由于直接操作 DOM 性能低，但是 JS 层的操作效率高，可以将 DOM 操作转化成对象的操作，最终通过 diff 算法对比差异进行更新 DOM（减少了对真实 DOM 的操作）
3. 虚拟 DOM 不依赖真实平台环境，能实现跨平台。

## 14. Vue 中的 diff 算法原理

Vue 的 diff 算法是平级比较，不考虑跨级比较多情况。内部采用深度递归多方式 + 双指针的方式进行比较。  
采用复用的原理

1. 先比较是否相同节点 tag ，key
2. 相同节点比较属性，并复用老节点
3. 比较儿子节点，考虑老节点和新节点儿子的情况
4. 优化比较：头头，尾尾，头尾，尾头
5. 比对查找进行复用

## 15. 既然 Vue 通过数据劫持可以精准探测数据变化，为什么还需要虚拟 DOM 进行 diff 检测差异

响应式数据变化，Vue 确实可以在数据发生变化时，响应式系统可以立即得知。但是如果给每个属性都添加 watcher 用于更新的话，会产生大量的 watcher 从而降低性能。

而且粒度过细也会导致更新不精准的问题，所以 vue 采用了组件级的 watcher 配合 diff 来检测差异。
