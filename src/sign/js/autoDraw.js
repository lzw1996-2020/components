export default class Draw {
    constructor(canvasId, config = {}, degree) {
        this.degree = degree
        this.canvasId = canvasId;
        this.canvas = document.getElementById(this.canvasId);

        let style = window.getComputedStyle(this.canvas, null)
        config.width = style.width.replace('px', '')
        config.height = style.height.replace('px', '')
        let { width = 300, height = 200 } = config
        this.config = config
        this.ctx = this.canvas.getContext("2d");
        const devicePixelRatio = window.devicePixelRatio
        if (devicePixelRatio) {
            this.canvas.style.width = `${width}px`
            this.canvas.style.height = `${height}px`
            this.canvas.width = width * devicePixelRatio
            this.canvas.height = height * devicePixelRatio
            this.ctx.scale(devicePixelRatio, devicePixelRatio)
        } else {
            this.canvas.width = width
            this.canvas.height = height
        }
        this.canvasInfo = this.canvas.getBoundingClientRect();
        this.x = this.canvasInfo.left
        this.y = this.canvasInfo.top
        this.width = this.canvasInfo.width
        this.height = this.canvasInfo.height
        this.isClick = false
    }
    init() {
        this.drawText()
        this.rotateCanvas(this.degree)
        let that = this;
        let { canvas, ctx, config = {} } = this
        const { line = 2, lineColor = "black" } = config
        canvas.addEventListener("touchstart", function (event) {
            ctx.lineWidth = line;
            ctx.strokeStyle = lineColor;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            that.drawBegin(event);
        });
        canvas.addEventListener("touchmove", function (event) {
            that.drawing(event);
        });
        canvas.addEventListener("touchend", function (event) {
            that.drawEnd(event);
        });
    }
    //页面旋转canvas调整
    rotateCanvas(degree) {
        this.ctx.rotate((-degree * Math.PI) / 180)
        const { width, height } = this.config
        switch (degree) {
            case 90:
                this.ctx.translate(-height, 0);
                break;
        }
    }
    //画文案
    drawText(str) {
        let { ctx, config } = this
        let { width, height } = config
        let text = str || "点击签名"
        if (!text) {
            return;
        }
        ctx.font = "30px Arial";
        ctx.fillStyle = "black";
        ctx.textBaseline = "middle";//设置字体垂直居中
        ctx.textAlign = 'center';//设置字体水平居中
        let textSize = ctx.measureText(text).width
        if (textSize > width) {
            return;
        }
        if (height < 30) {
            return;
        }
        ctx.fillText(text, width / 2, height / 2);
    }
    //旋转
    rotate(degree = 0, base, oldCanvas = this.canvas, callBack) {
        let that = this
        let width = oldCanvas.getBoundingClientRect().width || oldCanvas.width
        let height = oldCanvas.getBoundingClientRect().height || oldCanvas.height
        let newCanvas = document.createElement("canvas")
        let newCtx = newCanvas.getContext('2d')
        switch (degree) {
            case -90:
                newCanvas.width = height
                newCanvas.height = width
                break;
            case 90:
                newCanvas.width = height
                newCanvas.height = width
                break;
            default:
                newCanvas.width = width
                newCanvas.height = height
                break;
        }
        newCtx.rotate(degree * Math.PI / 180)
        let img = new Image()
        img.src = base
        img.onload = function () {
            switch (degree) {
                case -90:
                    newCtx.drawImage(img, -width, 0, width, height)
                    break;
                case 90:
                    newCtx.drawImage(img, 0, -height, width, height)
                    break;
                case 180:
                    newCtx.drawImage(img, -width, -height, width, height)
                    break;
                default:
                    newCtx.drawImage(img, 0, 0, width, height)
                    break;
            }
            setTimeout(() => {
                let url = that.save(newCanvas)
                callBack(url)
            }, 0);
        }
    }
    //按尺寸导出
    scale(width, height, canvas = this.canvas) {
        const w = canvas.width;
        const h = canvas.height;
        width = width || w;
        height = height || h;
        if (width !== w || height !== h) {
            const tmpCanvas = document.createElement('canvas');
            const tmpContext = tmpCanvas.getContext('2d');
            tmpCanvas.width = width;
            tmpCanvas.height = height;
            tmpContext.drawImage(canvas, 0, 0, w, h, 0, 0, width, height);
            canvas = tmpCanvas;
        }
        return canvas;
    }
    //点击触发
    drawBegin(e) {
        if (!this.isClick) {
            this.clear()
            this.isClick = true
        }
        let cX = e.touches[0].clientX - this.x
        let cY = e.touches[0].clientY - this.y
        this.ctx.beginPath()
        this.ctx.moveTo(cX, cY)
    }
    //滑动
    drawing(e) {
        let cX = e.touches[0].clientX - this.x
        let cY = e.touches[0].clientY - this.y
        this.ctx.lineTo(cX, cY);
        this.ctx.stroke();
    }
    //松开
    drawEnd() {
        this.ctx.closePath()
    }
    clear(ctx = this.ctx) {
        ctx.clearRect(0, 0, this.width, this.height);
    }
    save(canvas = this.canvas) {
        if (this.isClick) {
            return canvas.toDataURL("image/png");
        } else {
            return false;
        }
    }
    reset() {
        this.clear()
        this.isClick = false
        this.drawText()
    }
}