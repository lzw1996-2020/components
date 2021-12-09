<!--
 * @Description: 
 * @Author: zhongwei.liang
 * @Date: 2021-12-06 13:59:37
 * @LastEditTime: 2021-12-08 14:51:47
 * @LastEditors: zhongwei.liang
 * @Reference: 
-->
<template>
    <div class="signBox">
        <canvas id="myCanvas" :style="autoStyle"></canvas>
    </div>
</template>

<script>
import Draw from './js/autoDraw'
export default {
    name: 'autoSign',
    props: {
        autoStyle: {
            type: Object,
        },
        config: {
            type: Object
        }
    },
    data() {
        return {

        }
    },
    methods: {
        createCanvas() {
            let config = this.config
            this.draw = new Draw('myCanvas', config)
            this.draw.init()
        },
        onReset() {
            this.draw.reset()
        },
        onSave(callBack, degree, width, height) {
            let canvas = this.draw.scale(width, height)
            let oldImg = this.draw.save(canvas)
            this.draw.rotate(degree, oldImg, canvas, (res) => {
                callBack(res);
            })
        },
    },
    mounted() {
        this.createCanvas()
    },
}
</script>

<style scoped>
#myCanvas {
    background-color: #f9f9f9;
    width: 100%;
    height: 50vh;
}
</style>