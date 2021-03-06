# 浏览器的工作原理🌈🌈🌈

![]()

​	[**欢迎评论**](https://github.com/520-GH-liuxiaojian/Blog/issues)

**工欲善其事 必先利其器**

前端开发主要和浏览器打交道 只有真正了解浏览器底层原理才可以真正的做出高性能前端页面

浏览器是一个披着应用程序外衣的小型操作系统



## 前端进化三大路线

+ > 应用程序 web 化 => 越来越多应用程序从原来的 C/S 架构转向了 B/S 架构

+ > web 应用移动化 => 移动端普及 使得上网的人数电脑转向了移动设备

+ > web 应用系统化 => 更多的前端页面不仅只是展示的页面 可以将管理系统转向浏览器端



## 为什么需要学习浏览器底层实现原理

+ > 更高维度审视页面

+ > 快节奏的技术迭代中把握本质

+ > Web 开发项目的可行性



## 1. 宏观视角浏览器系统

### 1.1 为什么浏览器需要设计成为多进程架构模式

**早期浏览器**作用只是为了显示简单网页 不涉及太多功能交互 随着 web 世界开放化  页面功能增加 单进程浏览器弊端也随即增加 

+ 不稳定 => 插件 渲染引擎等任何一个模块出问题，都会引起**整个浏览器**崩溃
+ 不安全 => 没有将页面和操作系统相分离  早起 js 病毒代码可以攻击操作系统
+ 不流畅 =>  同一时间只有一个模块可以运行 没有专门优化页面显示底层实现

**现在浏览器架构模式是多进程** 在浏览器输入 URL 之后在整个页面显示过程是多个进程之间相互配合 

 **多进程如何解决单进程存在的诸多问题的呢？**

+ 不稳定:  浏览器的进程和进程之间的相互隔离的状态 如果真的在程序和插件执行有问题的话 那么插件和程序的			  只能影响当前的页面的执行 对于其他的正常的页面丝毫不会受到影响

+ 不流畅: Js 在渲染进程执行 所以 即使 Js 阻塞了页面渲染 影响到的也只是当前渲染页面 并不影响浏览器和其他页面 其他页面的脚本是运行在它们自己的渲染进程中的【多进程浏览器的一个页面就是一个渲染进程 所以在 Chrome 中运行死循环脚本 没有响应的仅仅是当前的页面
+ 不安全: 多个进程统一封装在安全沙箱之中 与操作系统做了隔绝 箱子中的程序可以正常被执行 但是却不能和操作之间随意传输数据 所以即便在浏览器执行可恶意的脚本文件 也会因为箱子的限制而无法攻击操作系统上的敏感数据



#### 多进程浏览器所有进程分析

+ 主进程 => 负责页面显示 用户和浏览器交互 子进程管理 存储服务。。。
+ 网络进程 => 页面资源从网络和本地加载 
+ 渲染进程 => 将 HTML CSS JS 解析生成可以和用户交互的网页 排版引擎【Blink】和 Js 执行引擎 V8 就是运行在该程序中
+ GPU 进程 => 页面的发展 需求越来越多 特效越来越强 就需要通过 GPU 来加快页面的绘制 特别是 3D 特效加强
+ 插件进程 => 随着第三方的开发插件增多 插件执行崩溃也越来越大 也需要对插件进进行隔离 用来保证插件正常执行



**多进程浏览带来的弊端**

+ 更高的资源的占用： 每个进程都会包含公共基础结构的副本 【体现最高的内存资源的占用】
+ 更复杂的架构体系： 模块之间耦合性高、扩展性差



文章名词解释：

+ [进程和线程](https://github.com/520-GH-liuxiaojian/Blog/issues/1)
+ [使用多进程浏览器为什么还是有浏览器整体奔溃情况](https://github.com/520-GH-liuxiaojian/Blog/issues/2)
+ [浏览器经过处理最终生成的到底什么](https://github.com/520-GH-liuxiaojian/Blog/issues/3)

