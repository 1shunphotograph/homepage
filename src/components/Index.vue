<template>
  <div class="background">
    <div class="container">
      <div class="search-wrap">
        <div class="search">
          <span
            ><svg
              class="icon"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              width="30px"
              height="30px"
            >
              <path
                d="M221.303 533.638c98.833-21.232 85.321-139.25 82.37-165.079-4.825-39.737-51.602-109.221-115.125-103.771-79.928 7.152-91.623 122.617-91.623 122.617-10.786 53.362 25.887 167.41 124.378 146.233zM326.21 738.91c-2.896 8.288-9.367 29.52-3.746 48.025 11.013 41.382 47.06 43.258 47.06 43.258h51.66V703.771h-55.407c-24.922 7.436-36.955 26.738-39.567 35.139zm78.396-403.22c54.553 0 98.604-62.727 98.604-140.386.058-77.544-44.051-140.273-98.604-140.273-54.44 0-98.663 62.728-98.663 140.273 0 77.602 44.223 140.386 98.663 140.386zm234.904 9.253c72.889 9.481 119.721-68.347 129.031-127.272 9.537-58.868-37.465-127.33-89.067-139.081-51.773-11.865-116.317 70.959-122.164 125-7.04 66.08 9.48 132.043 82.2 141.353zm178.647 346.624s-112.799-87.195-178.591-181.543c-89.296-139.08-216.114-82.484-258.519-11.75-42.234 70.731-108.028 115.408-117.395 127.273-9.48 11.694-136.242 80.097-108.085 205.044 28.156 124.946 126.989 122.505 126.989 122.505s72.832 7.266 157.302-11.694c84.528-18.735 157.303 4.71 157.303 4.71s197.438 66.135 251.48-61.195c53.984-127.332-30.484-193.35-30.484-193.35zm-337.88 189.49H351.981c-55.461-11.07-77.488-48.934-80.326-55.35-2.725-6.528-18.506-36.955-10.105-88.67 23.9-77.544 92.247-83.107 92.247-83.107h68.348v-84.017l58.131.964v310.18h.001zm239.105-.91H571.67c-57.22-14.757-59.888-55.519-59.888-55.519V661.31l59.888-.966v146.858c3.633 15.556 23.105 18.449 23.105 18.449h60.798V661.253h63.808v218.895zm209.13-436.146c0-28.212-23.444-113.136-110.355-113.136-87.026 0-98.663 80.155-98.663 136.867 0 54.099 4.542 129.657 112.683 127.216 108.143-2.44 96.335-122.562 96.335-150.947z"
                fill="lightgreen"
              /></svg
          ></span>
          <input
            id="word"
            type="search"
            v-model="text"
            @click.stop="getSuglist"
            @keyup="getSuglist"
            @keyup.enter="searchbyenter"
            @keydown.down="down"
            @keydown.up="up"
          />
          <span>
            <a :href="searchurl" target="_blank" @click="search"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="22px"
                height="22px"
                fill="yellow"
                class="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path
                  d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                /></svg></a
          ></span>
        </div>
        <div class="sug" v-show="isRes">
          <ul>
            <li
              v-for="(item, index) in this.sugList"
              :key="index"
              @click="searchBysug(item.q)"
              :class="[currentIndex === index ? 'active' : '']"
            >
              <span>{{ index + 1 }}</span
              >{{ item.q }}
            </li>
          </ul>
        </div>
      </div>

      <div class="navlist">
        <a
          class="nav"
          v-for="(item, index) in items"
          :key="index"
          :href="item.url"
          v-show="item.show"
          target="_blank"
        >
          <div
            class="logo"
            v-bind:style="{
              background: 'url(' + item.icon + ')',
              backgroundSize: '100% 100%',
            }"
          ></div>
          <div class="name">{{ item.name }}</div>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
// import axios from "axios";
import jquery from "jquery";

export default {
  name: "index",
  data() {
    return {
      text: "",
      isRes: false,
      sugList: [],
      currentIndex: -1,
      url: "https://www.baidu.com/s?wd=",
      sugurl:
        "https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&wd=",
      searchurl: "",
      items: [
        {
          name: "Lark",
          show: true,
          url: "https://ixs0hgtp0d.feishu.cn/",
          icon: "img/feishu.png",
        },
        {
          name: "掘金",
          show: true,
          url: "https://juejin.cn/",
          icon: "img/juejin.jpg",
        },
        {
          name: "Vue",
          show: true,
          url: "https://cn.vuejs.org",
          icon: "img/vue.png",
        },

        {
          name: "Pinia",
          show: true,
          url: "https://pinia.vuejs.org/",
          icon: "img/pinia.png",
        },
        {
          name: "Vite",
          show: true,
          url: "https://cn.vitejs.dev/",
          icon: "img/vite.png",
        },
        {
          name: "Nuxt",
          show: true,
          url: "https://nuxt.com/docs/getting-started/introduction",
          icon: "img/nuxt.png",
        },
        {
          name: "京东",
          show: false,
          url: "https://www.jd.com",
          icon: "img/jd.png",
        },
        {
          name: "淘宝",
          show: false,
          url: "https://www.taobao.com",
          icon: "img/tb.png",
        },
        {
          name: "小米",
          show: false,
          url: "https://www.mi.com",
          icon: "img/xiaomi.png",
        },
        {
          name: "微博",
          show: false,
          url: "https://www.weibo.com",
          icon: "img/wb.png",
        },
        {
          name: "Apple",
          show: true,
          url: "https://www.apple.com.cn",
          icon: "img/apple-logo.png",
        },
        {
          name: "Qzone",
          show: false,
          url: "https://qzone.qq.com/",
          icon: "img/qzone.png",
        },
        {
          name: "QQmail",
          show: true,
          url: "https://mail.qq.com/",
          icon: "img/qqmail.png",
        },
        {
          name: "Gmail",
          show: true,
          url: "https://mail.google.com/",
          icon: "img/gmail.ico",
        },
        {
          name: "163邮箱",
          show: false,
          url: "https://email.163.com/",
          icon: "img/163.png",
        },
        {
          name: "Google",
          show: true,
          url: "https://www.google.com",
          icon: "img/google.png",
        },
        {
          name: "Bing",
          show: true,
          url: "https://cn.bing.com/",
          icon: "img/bing.jpg",
        },
        {
          name: "INS",
          show: true,
          url: "https://www.instagram.com",
          icon: "img/ins.png",
        },
        {
          name: "Youtube",
          show: true,
          url: "https://www.youtube.com/",
          icon: "img/youtube.png",
        },
        {
          name: "哔哩哔哩",
          show: true,
          url: "https://www.bilibili.com",
          icon: "img/bili.png",
        },
        {
          name: "虎牙",
          show: false,
          url: "https://www.huya.com",
          icon: "img/huya.png",
        },
        {
          name: "QQTV",
          show: false,
          url: "https://v.qq.com/",
          icon: "img/txsp.png",
        },
        {
          name: "爱奇艺",
          show: false,
          url: "https://www.iqiyi.com/",
          icon: "img/aqy.png",
        },
        {
          name: "图虫",
          show: false,
          url: "https://tuchong.com/community",
          icon: "img/tuchong.png",
        },
        {
          name: "优酷",
          show: false,
          url: "https://www.youku.com/",
          icon: "img/youku.png",
        },
        {
          name: "斗鱼",
          show: false,
          url: "https://www.douyu.com/",
          icon: "img/douyu.jpg",
        },
        {
          name: "网易云",
          show: false,
          url: "https://music.163.com",
          icon: "img/netease.jpeg",
        },
        {
          name: "百度",
          show: true,
          url: "https://fanyi.baidu.com/",
          icon: "img/bdfy.png",
        },

        {
          name: "Element",
          show: true,
          url: "https://element-plus.org/zh-CN/component/button.html",
          icon: "img/Element.png",
        },
        {
          name: "Webpack",
          show: true,
          // url: "https://webpack.docschina.org/concepts/",
          url: "https://www.webpackjs.com/concepts/",
          icon: "img/webpack.png",
        },
        {
          name: "React",
          show: true,
          url: "https://reactjs.bootcss.com/",
          icon: "img/react.png",
        },
        {
          name: "AntDesign",
          show: true,
          url: "https://ant.design/docs/react/introduce-cn",
          icon: "img/antd.png",
        },
        {
          name: "Umi",
          show: true,
          url: "https://umijs.org/",
          icon: "img/umi.png",
        },
        {
          name: "菜鸟",
          show: false,
          url: "https://www.runoob.com/",
          icon: "img/cainiao.png",
        },
        {
          name: "ruoyi",
          show: true,
          url: "http://doc.ruoyi.vip/ruoyi/",
          icon: "img/ruoyi.png",
        },
        {
          name: "Bootstrap",
          show: true,
          url: "https://www.bootcss.com/",
          icon: "img/bootstrap.png",
        },
        {
          name: "NPM",
          show: true,
          url: "https://www.npmjs.com/",
          icon: "img/npm.png",
        },
        {
          name: "MDN",
          show: true,
          url: "https://developer.mozilla.org/zh-CN/",
          icon: "img/mdn.png",
        },
        {
          name: "Github",
          show: true,
          url: "https://github.com/",
          icon: "img/github.png",
        },
        // {
        //   name: "hao123",
        //   show: true,
        //   url: "https://www.hao123.com/",
        //   icon: "img/123.jpg",
        // },
        {
          name: "谷歌",
          show: false,
          url: "https://translate.google.com",
          icon: "img/ggfy.ico",
        },
      ],
    };
  },
  created() {
    document.addEventListener("click", (e) => {
      this.isRes = false;
    });
  },
  methods: {
    //点击图标搜索
    search() {
      this.searchurl = this.url + this.text;
    },
    // enter键触发搜索
    searchbyenter() {
      // 判断是根据当前输入框的值进行搜索还是焦点所在行的数据进行搜搜
      if (this.currentIndex === -1) {
        this.searchurl = this.url + this.text;
        window.open(this.searchurl);
      } else {
        let args = this.sugList[this.currentIndex].q;
        this.searchurl = this.url + args;
        window.open(this.searchurl);
      }
    },
    // 显示建议
    getSuglist() {
      if (this.text === "") {
        this.isRes = false;
      } else {
        let url = this.sugurl + this.text;
        let t = this;
        jquery(document).ready(function() {
          jquery.ajax({
            url: url,
            dataType: "jsonp",
            success: function(data) {
              if (data.g) {
                t.isRes = true;
                let l = data.g.length;
                t.sugList = data.g.slice(0, l - 1);
              } else {
                t.isRes = false;
              }
            },
          });
        });
      }
    },
    //点击建议进行搜索
    searchBysug(args) {
      this.searchurl = this.url + args;
      window.open(this.searchurl);
      this.text = "";
    },
    // ↓↓↓ 切换建议
    down() {
      if (this.currentIndex === this.sugList.length - 1) {
        this.currentIndex = 0;
      } else {
        this.currentIndex++;
      }
    },
    // ↑↑↑ 切换建议
    up() {
      if (this.currentIndex === 0) {
        this.currentIndex = this.sugList.length - 1;
      } else {
        this.currentIndex--;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.background {
  width: 100%;
  flex: 1;
  background-image: url("../static/moon.png");
  background-size: 100% 100%;
  z-index: 1;
  .container {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 4;
    .search-wrap {
      margin-left: 40px;
      margin-right: 40px;
      padding: 40px 0 30px 0;
      .search {
        max-width: 520px;
        min-width: 300px;
        height: 42px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        background-color: #0000;
        border-radius: 22px;
        border: 2.5px solid rgb(0, 208, 255);
        box-shadow: 0px 2px 8px #0085dd76;

        span {
          width: 60px;
          display: inline-block;
          cursor: pointer;
          line-height: 14px;
        }

        input {
          width: 100%;
          height: 34px;
          font-size: 17px;
          border: none;
          outline: none;
          background-color: #0000;
          color: whitesmoke;
        }

        input[type="search"]::-webkit-search-cancel-button {
          display: none;
        }
      }

      .sug {
        width: auto;
        max-width: 460px;
        min-width: 300px;
        position: absolute;
        background-color: rgba(29, 29, 29, 0.949);
        border-radius: 6px;
        padding: 15px 20px 10px;
        box-sizing: border-box;
        left: 0;
        right: 0;
        margin: 0 auto;
        margin-top: 8px;
        z-index: 6;
        @media screen and (max-width: 420px) {
          max-width: 300px;
          min-width: 240px;
        }

        ul {
          list-style-type: none;

          li {
            display: block;
            margin-bottom: 6px;
            text-align: left;
            cursor: pointer;
            transition: 0.2s;
            color: #46df9ad4;
            font-size: 17px;
            &.active {
              color: white;
            }

            span {
              font-size: 15px;
              font-style: oblique;
              margin-right: 20px;
              color: #cbcbcb;
            }
          }
          li:first-child span {
            color: red;
          }
          li:nth-child(2) span {
            color: rgb(255, 157, 0);
          }
          li:nth-child(3) span {
            color: rgb(236, 221, 2);
          }
          li:hover {
            color: white;
          }
        }
      }
    }

    .navlist {
      width: 80%;
      margin: 40px auto 0;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      .nav {
        width: 80px;
        height: 96px;
        cursor: pointer;
        text-decoration: none;

        .logo {
          width: 50px;
          height: 50px;
          margin: 0 auto 8px;
          border-radius: 15px;
          transition: 0.12s;
        }

        .logo:hover {
          filter: brightness(112%);
        }

        .name {
          width: 80px;
          height: 20px;
          color: white;
          font-size: 13px;
          opacity: 0.9;
        }
      }
    }
  }
}
// 背景高斯模糊
.background::after {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: inherit;
  filter: blur(2px);
  z-index: 2;
}
</style>
