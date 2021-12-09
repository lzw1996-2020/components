<template>
  <div id="canvasBox" :style="getHorizontalStyle">
    <canvas :style="{ backgroundColor: signBackgroundColor }">{{ msg }}</canvas>
    <div class="greet" :style="{ backgroundColor: btnBoxBackgroundColor }">
      <div class="btnBox">
        <div
          class="btn"
          :style="{ backgroundColor: resetBackgroundColor, color: resetColor }"
          @click="clear()"
        >
          {{ resetText }}
        </div>
        <div
          class="btn"
          :style="{
            backgroundColor: confirmBackgroundColor,
            color: confirmColor,
          }"
          @click="download()"
        >
          {{ confirmText }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Draw from "./js/draw";
export default {
  name: "sign",
  data() {
    return {
      msg: "123",
      degree: 0, // 屏幕整体旋转的角度, 可取 -90,90,180等值
    };
  },
  props: {
    config: {
      type: Object,
      default: function () {
        return {
          exportWidth: "",
          exportHeight: "",
        };
      },
    },
    btnBoxBackgroundColor: {
      type: String,
      default: "#ffffff",
    },
    signBackgroundColor: {
      type: String,
      default: "#f9f9f9",
    },
    resetBackgroundColor: {
      type: String,
      default: "#F0F0F0",
    },
    resetColor: {
      type: String,
      default: "#898991",
    },
    resetText: {
      type: String,
      default: "重置",
    },
    confirmBackgroundColor: {
      type: String,
      default: "#2846FF",
    },
    confirmColor: {
      type: String,
      default: "#ffffff",
    },
    confirmText: {
      type: String,
      default: "确定",
    },
  },
  mounted() {
    this.onInit();
  },
  computed: {
    getHorizontalStyle() {
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
      if (this.canvasBox) {
        this.canvasBox.removeChild(document.querySelector("canvas"));
        this.canvasBox.appendChild(document.createElement("canvas"));
        setTimeout(() => {
          this.initCanvas();
        }, 200);
      }
      return {
        transform: `rotate(${this.degree}deg) translate(${length}px,${length}px)`,
        width: `${width}px`,
        height: `${height}px`,
        transformOrigin: "center center",
      };
    },
  },
  methods: {
    onInit() {
      this.canvasBox = document.getElementById("canvasBox");
      let that = this;
      setTimeout(() => {
        this.initCanvas();
      }, 0);
      //尺寸变化
      window.addEventListener("resize", function () {
        setTimeout(function () {
          location.reload();
        }, 0);
      });
      //屏幕旋转
      window.addEventListener(
        "orientationchange",
        function () {
          console.log(window.orientation);
          setTimeout(function () {
            location.reload();
          }, 0);
        },
        false
      );
    },
    //初始化canvas
    initCanvas() {
      const canvas = document.querySelector("canvas");
      this.draw = new Draw(canvas, -this.degree);
    },
    clear() {
      this.draw.clear();
      this.$emit("onReset");
    },
    download() {
      const { exportWidth, exportHeight } = this.config;
      let img = this.draw.getPNGImage(
        this.draw.scale(exportWidth, exportHeight)
      );
      this.$emit("onConfirm", img);
    },
  },
};
</script>

<style scoped>
#canvasBox {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #ffffff;
}
#canvasBox > canvas {
  flex: 1;
  cursor: crosshair;
}
.greet {
  padding: 20px;
  box-sizing: border-box;
  user-select: none;
}
.btnBox {
  padding: 0 2%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.btn {
  width: 48%;
  text-align: center;
  color: #fff;
  background-color: #f91;
  height: 40px;
  line-height: 40px;
  font-weight: 300;
  font-size: 1.5rem;
  border-radius: 4px;
}
</style>
