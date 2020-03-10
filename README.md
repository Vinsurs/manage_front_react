# manage_front_react

> 这是一个基于[React](https://reactjs.org)+[Eggjs](https://eggjs.org)的基础前后台管理项目。前台采用React视图框架，[Antd](https://ant.design/index-cn)为项目UI框架，[axios](https://github.com/axios/axios)负责前后台数据交互。后台采用阿里优秀[nodejs](https://nodejs.org)框架Eggjs。数据库利用的是[MongoDB](https://www.mongodb.com)。
>
> 这里是完整项目的前台部分，后台部分push在[另一个repository](https://github.com/Vinsurs/manage_backend)。

### 描述

项目用户分管理员和普通用户，拥有不同视图操作权限，管理员可下发其他用户相应权限。

### 项目构建

项目基于React官方脚手架 [Create React App](https://github.com/facebook/create-react-app).

### 运行项目

> 前提是先clone/fork 该  [manage_backend](https://github.com/Vinsurs/manage_backend) 后台项目，并安装moogodb数据库驱动。

1. 随便找一个文件夹作为数据库存储，然后启动数据库服务

```bash
$ mongod --dbpath=my_dbstore_path
```

2. 启动manage_backend后台服务（见[manage_backend](https://github.com/Vinsurs/manage_backend)说明)

3. 你可以将这个项目clone/fork到你本地，checkout到master主分支（默认即为master分支），然后执行

```bash
$ cd manage_frontend_react
$ yarn
$ yarn start
# open http://localhost:3000
```

首先进入login page，输入以下管理员账号

```
accout:admin;         password:admin
```

登录成功进入主界面。

### why donot use  Redux?

[Redux ](https://github.com/reduxjs/redux)和[Mobx](https://github.com/mobxjs/mobx)等状态数据管理一样，可以在React中进行完美使用。但考虑到项目还比较简单，所以项目中并没有使用诸如Redux类的状态管理工具。如果需要，后续可能重改尽量使用上。

### next

后续我可能将会对该项目用[Vue](https://vuejs.org)+[ElementUI](https://element.eleme.cn/#/zh-CN)重构令一个Vue 版本。




