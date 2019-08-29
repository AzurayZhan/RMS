import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import login from "../components/pages/login.vue"
import index from "../components/pages/index.vue"
import welcom from "../components/pages/welcom.vue"

import manage from "../components/pages/manage.vue"
import manageList from "../components/pages/manageList.vue"
import manageCreate from "../components/pages/manageCreate.vue"

import user from "../components/pages/user.vue"
import userList from "../components/pages/userList.vue"
import userCreate from "../components/pages/userCreate.vue"

import device from "../components/pages/device.vue"
import deviceList from "../components/pages/deviceList.vue"
import deviceCreate from "../components/pages/deviceCreate.vue"

import news from "../components/pages/news.vue"
import newsList from "../components/pages/newsList.vue"
import newsCreate from "../components/pages/newsCreate.vue"

export default new Router({
  // mode: "history",
  routes: [{
      path: "/login",
      component: login,
     /*  beforeEnter (to, from, next) {
        
      } */
    },
    {
      path: "/index",
      component: index,
      children: [{
          path: "manage",
          component: manage,
          /* beforeEnter(to, from, next) {

          }, */
          children: [{
              name: "管理员列表",
              path: "list",
              component: manageList
            },
            {
              name: "添加/修改管理员",
              path: "create",
              component: manageCreate
            },
            {
              path: "",
              redirect: "/index/manage/list"
            }
          ]
        },
        {
          path: "user",
          component: user,
          beforeEnter(to, from, next) {
            var isAdmin = localStorage.getItem("isAdmin");
            if (isAdmin != 2) {
              next();
            } else {
              next("/index");
            }
          },
          children: [{
              name: "用户列表",
              path: "list",
              component: userList
            },
            {
              name: "添加/修改用户",
              path: "create",
              component: userCreate
            },
            {
              path: "",
              redirect: "/index/user/list"
            }
          ]
        },
        {
          path: "device",
          component: device,
          children: [{
              name: "设备列表",
              path: "list",
              component: deviceList
            },
            {
              name: "添加/修改设备",
              path: "create",
              component: deviceCreate
            },
            {
              path: "",
              redirect: "/index/device/list"
            }
          ]
        },
        {
          path: "news",
          component: news,
          children: [{
              name: "消息列表",
              path: "list",
              component: newsList
            },
            {
              name: "添加/修改消息",
              path: "create",
              component: newsCreate
            },
            {
              path: "",
              redirect: "/index/news/list"
            }
          ]
        },
        {
          path: "welcom",
          component: welcom
        },
        {
          path: "",
          redirect: "/index/welcom"
        }
      ]
    },
    {
      path: "*",
      redirect: "login"
    }
  ]
})
