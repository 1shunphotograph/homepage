<template>
  <div>
    <p>登录~页面</p>
    <p>{{ info }}</p>
    <br />
    <button @click="request">查看诗句</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      info: "",
    };
  },
  methods: {
    request() {
      axios
        .get("http://poetry.apiopen.top/sentences")
        .then((res) => {
          this.info = res.data.result.name;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
$--color-primary: #21a8f3;
p {
  color: $--color-primary;
  font-size: 20px;
}
</style>