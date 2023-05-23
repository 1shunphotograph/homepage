<template>
  <div class="background">
    <div class="container">
      <div class="search-wrap">
        <div class="search">
          <i class="space"></i>
          <input
            id="word"
            type="search"
            v-model="text"
            @click.stop="getSuglist"
            @keyup="getSuglist"
            @keyup.enter="searchbyenter"
            @keydown.down="down"
            @keydown.up="up"
            autofocus
          />
          <span>
            <a :href="searchurl" target="_blank" @click="search"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="22px"
                height="22px"
                fill="pink"
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
          name: "飞书",
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
          show: true,
          url: "https://www.mi.com",
          icon: "img/xiaomi.png",
        },
        {
          name: "微博",
          show: true,
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
          name: "qq邮箱",
          show: true,
          url: "https://mail.qq.com/",
          icon: "img/qqmail.png",
        },
        {
          name: "阿里邮箱",
          show: true,
          url: "https://mail.aliyun.com/alimail/",
          icon: "img/alimail.png",
        },
        {
          name: "Gmail",
          show: true,
          url: "https://mail.google.com/",
          icon: "img/gmail.ico",
        },
        {
          name: "163邮箱",
          show: true,
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
          name: "ChatGPT",
          show: true,
          url: "https://chat.openai.com/",
          icon: "img/openai.png",
        },
        {
          name: "instagram",
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
          name: "bilibili",
          show: true,
          url: "https://www.bilibili.com",
          icon: "img/bili.png",
        },
        {
          name: "抖音",
          show: false,
          url: "https://www.douyin.com",
          icon: "img/douyin.png",
        },
        {
          name: "虎牙",
          show: true,
          url: "https://www.huya.com",
          icon: "img/huya.png",
        },
        {
          name: "斗鱼",
          show: true,
          url: "https://www.douyu.com/",
          icon: "img/douyu.jpg",
        },
        {
          name: "百度翻译",
          show: true,
          url: "https://fanyi.baidu.com/",
          icon: "img/bdfy.png",
        },
        {
          name: "谷歌",
          show: true,
          url: "https://translate.google.com",
          icon: "img/ggfy.ico",
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
          url: "https://umijs.org/",
          icon: "img/umi.png",
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
          name: "github",
          show: true,
          url: "https://github.com/",
          icon: "img/github2.png",
        }
        
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
        border: 2.5px solid rgb(0, 206, 237);
        box-shadow: 0px 2px 8px #0085dd76;
        .space {
          width: 24px;
        }

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
        background-color: rgba(29, 29, 29, 0.857);
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
  filter: blur(3px) brightness(110%);
  z-index: 2;
}
</style>
