<!--
 * @Description: 
 * @Author: zhongwei.liang
 * @Date: 2021-11-23 15:09:05
 * @LastEditTime: 2021-12-23 18:32:24
 * @LastEditors: zhongwei.liang
 * @Reference: 
-->
<template>
  <div>
    <!-- <sign @onReset="reset" @onConfirm="confirm" :config="config"></sign> -->
    <AutoSign></AutoSign>
    <!-- <button @click="onClick" style="height:20vh">点击</button> -->
    <!-- <autoSign v-model="imgUrl" :config="config"></autoSign> -->
  </div>
</template>

<script>
// import autoSign from '../sign/autoSign.vue';
// import Sign from "../sign/signature.vue";
import AutoSign from "../sign/autoSign.vue"
export default {
  components: { AutoSign },
  // components: {
  //   Sign,
  //   AutoSign
  // },
  name: "",
  data() {
    return {
      config: {
        title: '默认标题',
        line: 4,//画笔粗细
        lineColor: 'black',//画笔颜色
        exportWidth: 100,//导出图片宽度
        exportHeight: 300,//导出图片高度
        isRotate: false,//是否横屏展示
      },
      imgUrl: "",
    };
  },
  methods: {
    onClick() {
      // console.log(this.imgUrl);
    }
  },
};
</script>

<style scoped>
.bgColor {
  background-color: blue;
}
</style>
