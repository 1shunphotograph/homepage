<template>
  <div class="background">
    <div class="container">
      <div class="search-wrap">
        <div class="search">
          <i class="space"></i>
          <input id="word" type="search" v-model="text" @click.stop="getSuglist" @keyup="getSuglist"
            @keyup.enter="searchByEnter" @keydown.down="down" @keydown.up="up" autofocus />
          <span>
            <a class="baidu" target="_blank" @click="searchByBaidu">Baidu
            </a>
          </span>
          <span>
            <a class="bing" target="_blank" @click="searchByBing">Bing</a>
          </span>
          <span>
            <a class="google" target="_blank" @click="searchByGoogle">Google</a>
          </span>
          <!-- <span>
            <a class="bilibili" target="_blank" @click="searchByBilibili">Bilibili</a>
          </span> -->
        </div>
        <div class="sug" v-show="isRes">
          <ul>
            <li v-for="(item, index) in this.sugList" :key="index" @click="searchBySug(item.q)"
              :class="[currentIndex === index ? 'active' : '']">
              <span>{{ index + 1 }}</span><i>{{ item.q }}</i>
            </li>
          </ul>
        </div>
      </div>

      <div class="navlist">
        <a class="nav" v-for="item in items" :key="item.name" :href="item.url" v-show="item.show" target="_blank">
          <div class="logo" v-bind:style="{
            background: 'url(' + item.icon + ')',
            backgroundSize: '100% 100%',
          }"></div>
          <div class="name">{{ item.name }}</div>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import jquery from "jquery";

export default {
  name: "index",
  data() {
    return {
      text: "",
      isRes: false,
      sugList: [],
      currentIndex: -1,
      url_baidu: "https://www.baidu.com/s?wd=",
      url_bing: "https://cn.bing.com/search?q=",
      url_google: "https://www.google.com/search?q=",
      // url_bilibili: "https://search.bilibili.com/all?keyword=",
      url_sug_baidu: "https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&wd=",
      url_search: "",
      items: [
        {
          name: "lark",
          show: true,
          url: "https://ixs0hgtp0d.feishu.cn",
          icon: "img/feishu.png",
        },
        {
          name: "juejin",
          show: true,
          url: "https://juejin.cn",
          icon: "img/juejin.jpg",
        },
        {
          name: "vue",
          show: true,
          url: "https://cn.vuejs.org",
          icon: "img/vue.png",
        },
        {
          name: "pinia",
          show: true,
          url: "https://pinia.vuejs.org",
          icon: "img/pinia.png",
        },
        {
          name: "vite",
          show: true,
          url: "https://cn.vitejs.dev",
          icon: "img/vite.png",
        },
        {
          name: "nuxt",
          show: true,
          url: "https://nuxt.com/docs/getting-started/introduction",
          icon: "img/nuxt.png",
        },
        {
          name: "JD",
          show: false,
          url: "https://www.jd.com",
          icon: "img/jd.png",
        },
        {
          name: "Taobao",
          show: false,
          url: "https://www.taobao.com",
          icon: "img/tb.png",
        },
        {
          name: "mi",
          show: true,
          url: "https://www.mi.com",
          icon: "img/xiaomi.png",
        },
        {
          name: "weibo",
          show: true,
          url: "https://www.weibo.com",
          icon: "img/wb.png",
        },
        {
          name: "apple",
          show: true,
          url: "https://www.apple.com.cn",
          icon: "img/apple-logo.png",
        },
        {
          name: "Qzone",
          show: false,
          url: "https://qzone.qq.com",
          icon: "img/qzone.png",
        },
        {
          name: "qqmail",
          show: true,
          url: "https://mail.qq.com",
          icon: "img/qqmail.png",
        },
        {
          name: "alimail",
          show: true,
          url: "https://mail.aliyun.com/alimail",
          icon: "img/alimail.png",
        },
        {
          name: "gmail",
          show: true,
          url: "https://mail.google.com",
          icon: "img/gmail.ico",
        },
        {
          name: "163",
          show: false,
          url: "https://email.163.com",
          icon: "img/163.png",
        },
        {
          name: "yiyan",
          show: true,
          url: "https://yiyan.baidu.com",
          icon: "img/yiyan.png",
        },
        {
          name: "google",
          show: true,
          url: "https://www.google.com",
          icon: "img/google.png",
        },
        {
          name: "Bing",
          show: true,
          url: "https://cn.bing.com",
          icon: "img/bing.jpg",
        },
        {
          name: "chatgpt",
          show: true,
          url: "https://chat.openai.com",
          icon: "img/openai.png",
        },
        {
          name: "ins",
          show: true,
          url: "https://www.instagram.com",
          icon: "img/ins.png",
        },
        {
          name: "youtube",
          show: true,
          url: "https://www.youtube.com",
          icon: "img/youtube.png",
        },
        {
          name: "bilibili",
          show: true,
          url: "https://www.bilibili.com",
          icon: "img/bilibili.png",
        },
        {
          name: "抖音",
          show: false,
          url: "https://www.douyin.com",
          icon: "img/douyin.png",
        },
        {
          name: "huya",
          show: false,
          url: "https://www.huya.com",
          icon: "img/huya.png",
        },
        {
          name: "douyu",
          show: false,
          url: "https://www.douyu.com",
          icon: "img/douyu.jpg",
        },
        {
          name: "百度",
          show: true,
          url: "https://fanyi.baidu.com",
          icon: "img/bdfy.png",
        },
        {
          name: "谷歌",
          show: true,
          url: "https://translate.google.com",
          icon: "img/ggfy.ico",
        },
        {
          name: "markdown",
          show: true,
          url: "https://www.markdown.xyz", //https://markdown.com.cn/
          icon: "img/markdown.png",
        },
        {
          name: "tailwind",
          show: true,
          url: "https://www.tailwindcss.cn",
          icon: "img/tailwindcss.png",
        },
        {
          name: "headless",
          show: true,
          url: "https://headlessui.com",
          icon: "img/headless.png",
        },
        {
          name: "Sass",
          show: true,
          url: "https://www.sasscss.com",
          icon: "img/sass.png",
        },
        {
          name: "Element+",
          show: true,
          url: "https://element-plus.org/zh-CN/component/button.html",
          icon: "img/Element.png",
        },
        {
          name: "babel",
          show: true,
          url: "https://babel.docschina.org",
          icon: "img/babel.png",
        },
        {
          name: "rollup",
          show: true,
          url: "https://cn.rollupjs.org", //https://www.rollupjs.com/
          icon: "img/rollup.png",
        },
        {
          name: "webpack",
          show: true,
          url: "https://www.webpackjs.com/concepts/",
          icon: "img/webpack.png",
        },
        {
          name: "React",
          show: true,
          url: "https://react.dev/",
          icon: "img/react.png",
        },
        {
          name: "AntD",
          show: true,
          url: "https://ant.design/docs/react/introduce-cn",
          icon: "img/antd.png",
        },
        {
          name: "Umi",
          show: true,
          url: "https://umijs.org",
          icon: "img/umi.png",
        },
        {
          name: "ruoyi",
          show: true,
          url: "http://doc.ruoyi.vip/ruoyi",
          icon: "img/ruoyi.png",
        },
        {
          name: "Bootstrap",
          show: true,
          url: "https://www.bootcss.com",
          icon: "img/bootstrap.png",
        },
        {
          name: "npm",
          show: true,
          url: "https://www.npmjs.com/",
          icon: "img/npm.png",
        },
        {
          name: "MDN",
          show: true,
          url: "https://developer.mozilla.org/zh-CN",
          icon: "img/mdn.png",
        },
        {
          name: "W3C",
          show: true,
          url: "https://www.w3school.com.cn/index.html",
          icon: "img/w3c.png",
        },
        {
          name: "github",
          show: true,
          url: "https://github.com",
          icon: "img/github2.png",
        }
      ]
    };
  },
  created() {
    document.addEventListener("click", (e) => {
      this.isRes = false;
    });
  },
  methods: {
    searchByBaidu() {
      this.url_search = this.url_baidu + this.text;
      window.open(this.url_search);
    },
    searchByBing() {
      this.url_search = this.url_bing + this.text;
      window.open(this.url_search);
    },
    searchByGoogle() {
      this.url_search = this.url_google + this.text;
      window.open(this.url_search);
    },
    // searchByBilibili() {
    //   this.url_search = this.url_bilibili + this.text;
    //   window.open(this.url_search);
    // },
    // enter键触发搜索
    searchByEnter() {
      // 判断是根据当前输入框的值进行搜索还是焦点所在行的数据进行搜搜
      if (this.currentIndex === -1) {
        this.url_search = this.url_baidu + this.text;
        window.open(this.url_search);
      } else {
        let args = this.sugList[this.currentIndex].q;
        this.url_search = this.url_baidu + args;
        window.open(this.url_search);
      }
    },
    // 显示建议
    getSuglist() {
      if (this.text === "") {
        this.isRes = false;
      } else {
        let url = this.url_sug_baidu + this.text;
        let t = this;
        jquery(document).ready(function () {
          jquery.ajax({
            url: url,
            dataType: "jsonp",
            success: function (data) {
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
    searchBySug(args) {
      this.url_search = this.url_baidu + args;
      window.open(this.url_search);
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
  background-image: url("../static/beijing.jpg");
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
      padding: 90px 0 20px 0;

      .search {
        max-width: 500px;
        min-width: 300px;
        height: 46px;
        border-radius: 16px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #f4f4f400;
        border: 2px solid #73dffa;

        .space {
          width: 20px;
        }

        span {
          margin-right: 6px;
          font-size: 17px;
        }

        a {
          width: 60px;
          height: 34px;
          line-height: 34px;
          border-radius: 10px;
          display: inline-block;
          cursor: pointer;
          color: white;
        }

        .baidu {
          background-image: linear-gradient(-200deg, #4facfe 0%, #00f2fe 48%, #56c0fe 100%);
        }

        .bing {
          background-image: linear-gradient(-225deg, #5b9bfc 0%, #acd5ff 48%, #5cb1fc 100%);
        }

        .google {
          background-image: linear-gradient(-225deg, #5b7dda 0%, #B19FFF 48%, #ECA1FE 100%);
        }

        // .bilibili {
        //   background-image: linear-gradient(-225deg, #5b7dda 0%, #B19FFF 48%, #ECA1FE 100%);
        // }

        input {
          width: 100%;
          height: 38px;
          display: inline-block;
          margin-right: 6px;
          font-size: 18px;
          border: none;
          outline: none;
          background-color: #0000;
          color: rgb(245, 245, 245);
        }

        input[type="search"]::-webkit-search-cancel-button {
          display: none;
        }
      }

      .sug {
        max-width: 500px;
        min-width: 300px;
        position: absolute;
        background-image: linear-gradient(270deg, #e7f2f3 0%, #e3eeff 99%, #e3eeff 100%);
        border-radius: 16px;
        padding: 15px 20px 10px;
        box-sizing: border-box;
        left: 0;
        right: 0;
        margin: 8px auto 0;
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
            font-size: 17px;
            color: #1284e8;
            text-align: left;
            cursor: pointer;
            transition: 0.2s;

            &.active {
              color: rgb(233, 82, 27);
            }

            span {
              font-size: 15px;
              font-style: oblique;
              margin-right: 20px;
              color: #1885d8e2;
              text-decoration: none;
            }

            i {
              font-style: normal;
            }
          }

          li:first-child span {
            color: red;
          }

          li:nth-child(2) span {
            color: rgb(248, 145, 0);
          }

          li:nth-child(3) span {
            color: rgb(227, 223, 1);
          }

          li:hover {
            color: rgb(233, 82, 27);
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
          transition: 0.14s;
        }

        .name {
          width: 80px;
          height: 20px;
          color: white;
          font-size: 14px;
        }
      }

      .nav:hover {
        .logo {
          width: 56px;
          height: 56px;
          filter: brightness(104%);
        }

        .name {
          font-size: 15px;
          color: white;
        }
      }
    }
  }
}
</style>
