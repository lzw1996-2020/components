<!--
 * @Description: 
 * @Author: zhongwei.liang
 * @Date: 2021-11-23 15:09:05
 * @LastEditTime: 2021-12-08 15:01:10
 * @LastEditors: zhongwei.liang
 * @Reference: 
-->
<template>
  <div>
    <!-- <sign @onReset="reset" @onConfirm="confirm" :config="config"></sign> -->
    <!-- <AutoSign ref="sign" :config="config" :autoStyle="className"></AutoSign>
    <button @click="reset">调用</button> -->

    <autoSign :config="config"></autoSign>
  </div>
</template>

<script>
import autoSign from '../sign/autoSign.vue';
import Sign from "../sign/signature.vue";
import AutoSign from "../sign/autoSign.vue"
export default {
  components: { autoSign },
  components: {
    Sign,
    AutoSign
  },
  name: "",
  data() {
    return {
      config: {
        text: '点击签字',
        line: 4,
        lineColor: 'black',
      },
      className: {},
    };
  },
  methods: {
    reset() {
      this.$refs.sign.onSave((res) => {
        console.log(res);
      })
    },
    confirm(res) {
      console.log(res);
    },
  },
};
</script>

<style scoped>
.bgColor {
  background-color: blue;
}
</style>
