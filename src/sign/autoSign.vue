<!--
 * @Description: 
 * @Author: zhongwei.liang
 * @Date: 2021-12-06 13:59:37
 * @LastEditTime: 2021-12-23 18:50:57
 * @LastEditors: zhongwei.liang
 * @Reference: 
-->
<template>
    <div class="signBox" :style="getHorizontalStyle">
        <div class="title" v-show="config.title">{{ config.title || '标题' }}</div>
        <div class="signContent">
            <canvas id="myCanvas"></canvas>
        </div>
        <div class="fixedBox">
            <div class="fixedBox_btn btn_grey" @click="onReset">重置</div>
            <div class="fixedBox_btn btn_blue" @click="onConfirm">确认</div>
        </div>
    </div>
</template>

<script>
import Draw from './js/autoDraw'
export default {
    name: 'autoSign',
    props: {
        config: {
            type: Object,
            default: function() {
                return {
                    title: '默认标题',
                    line: 4,//画笔粗细
                    lineColor: 'black',//画笔颜色
                    isRotate: false,//是否横屏展示
                }
            }
        }
    },
    data() {
        return {
            degree: 0,
        }
    },
    methods: {
        createCanvas() {
            let config = this.config
            this.draw = new Draw('myCanvas', config, this.degree)
            this.draw.init()
            //尺寸变化
            window.addEventListener("resize", function () {
                setTimeout(function () {
                    location.reload();
                }, 0);
            }, false);
            //屏幕旋转
            window.addEventListener(
                "orientationchange",
                function () {
                    setTimeout(function () {
                        location.reload();
                    }, 0);
                },
                false
            );
        },
        onReset() {
            this.draw.reset()
            this.$emit("input", "")
        },
        onConfirm() {
            const { exportWidth, exportHeight } = this.config
            let canvas = this.draw.scale(exportWidth, exportHeight)
            let img = this.draw.save(canvas)
            console.log(img);
            this.$emit("input", img)
        },
    },
    mounted() {
        this.createCanvas()
    },
    computed: {
        getHorizontalStyle() {
            if (this.config?.isRotate) {
                const d = document;
                const w =
                    window.innerWidth ||
                    d.documentElement.clientWidth ||
                    d.body.clientWidth;
                const h =
                    window.innerHeight ||
                    d.documentElement.clientHeight ||
                    d.body.clientHeight;
                let length = (h - w) / 2;
                let width = w;
                let height = h;
                if (width < height) {
                    this.degree = 90;
                    width = h;
                    height = w;
                } else {
                    length = 0;
                }
                return {
                    transform: `rotate(${this.degree}deg) translate(${length}px,${length}px)`,
                    width: `${width}px`,
                    height: `${height}px`,
                    transformOrigin: "center center",
                };
            }
        },
    },
}
</script>

<style scoped>
.signBox {
    width: 100vw;
    height: 100vh;
    background-color: #f9f9f9;
}
.title {
    font-family: PingFang SC;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 44px;
    color: #333333;
    width: 100%;
    text-align: center;
}
.signContent {
    width: calc(100% - 32px);
    height: calc(100% - 148px);
    margin: 24px auto;
}
.signContent #myCanvas {
    background-color: #ffffff;
    width: 100%;
    height: 100%;
    border-radius: 8px;
}
.fixedBox {
    width: 100%;
    height: 56px;
    background-color: #ffffff;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.fixedBox .fixedBox_btn {
    width: 40%;
    height: 40px;
    border-radius: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: PingFang SC;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
}
.btn_grey {
    background: #f0f0f0;
    color: #898991;
}
.btn_blue {
    background-color: #2846ff;
    color: #ffffff;
}
</style>