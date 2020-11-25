<!--
 * @Description: 签名板
 * @Author: xwq
 * @Date: 2020-03-18 14:08:39
 -->
<template>
    <div class="page">
        <background />
        <div class="main-container">
            <div class="boardBox" ref="boardBox">
                <canvas
                    ref="board"
                    class="canvas-board"
                    @touchstart="mStart"
                    @touchmove="mMove"
                    @touchend="mEnd"
                ></canvas>
                <van-button
                    v-if="LandscapeBtn"
                    :class="{'btn-active':LandscapeBtn,'btn-normal':!LandscapeBtn}"
                    type="primary"
                    class="btn-style"
                    @click="saveLinkHandle"
                >确认</van-button>
                <div class="desc-title" v-if="!isLandscape">
                    <span>签名区域</span>
                </div>
                <div class="desc-title-2" v-if="isLandscape">
                    <span>签名区域</span>
                </div>
            </div>
            <div class="signature-title" v-if="!isLandscape">
                <div class="signature-item">
                    <span>请在下方空白区域进行签名</span>
                    <span
                        @click="clearHandle"
                        v-show="isShowBtn"
                        :class="{'btn-active':isShowBtn,'btn-normal':!isShowBtn}"
                    >清空</span>
                </div>
            </div>
            <div class="signature-title-2" v-if="isLandscape">
                <div class="signature-item-2">
                    <span>请在下方空白区域进行签名</span>
                    <span
                        @click="clearHandle"
                        v-show="LandscapeBtn"
                        :class="{'btn-active':LandscapeBtn,'btn-normal':!LandscapeBtn}"
                    >清空</span>
                </div>
            </div>
        </div>
        <div
            class="btn"
            v-if="isShowBtn"
            :class="{'btn-active':isShowBtn,'btn-normal':!isShowBtn}"
            @click="saveLinkHandle"
        >
            <van-button type="primary">确认</van-button>
        </div>
    </div>
</template>
<script>
import background from "@/components/background/background";
export default {
    components: {
        background
    },
    data() {
        return {
            url: "",
            ctx: null,
            coCtx: null,
            drawImgCtx: null,
            point: {
                x: 0,
                y: 0
            },
            moving: false,
            LandscapeBtn: false,
            isShowBtn: false,
            isLandscape: false,
            pathRecord: {
                startPath: [],
                endPath: []
            }
        };
    },
    created() {},
    mounted() {
        // document.body.addEventListener(
        //     "touchmove",
        //     function(e) {
        //         e.preventDefault();
        //     },
        //     { passive: false }
        // );
        let _this = this;
        window.addEventListener("resize", _this.renderResize, false);
        this.init();
    },
    methods: {
        renderResize() {
            this.$nextTick(() => {
                // 判断横竖屏
                let width = document.documentElement.clientWidth;
                let height = document.documentElement.clientHeight;
                if (width > height) {
                    console.log("横屏", this.isLandscape);
                    // this.LandscapeBtn = true;
                    this.isLandscape = true;
                    this.isShowBtn = false;
                    this.init();
                } else {
                    // this.init();
                    console.log("竖屏", this.isLandscape);
                    this.LandscapeBtn = false;
                    this.isLandscape = false;
                    this.init();
                    // this.isShowBtn = true;
                }
                // 做页面适配
                // 注意：renderResize方法执行时虚拟dom尚未渲染挂载，如果要操作vue实例，最好在this.$nextTick()里进行。
            });
        },
        //初始化
        init() {
            let board = this.$refs.board;
            board.width = this.$refs.boardBox.offsetWidth;
            board.height = this.$refs.boardBox.offsetHeight;
            this.ctx = board.getContext("2d");
            this.ctx.strokeStyle = "#000";
            this.ctx.lineWidth = 6;
            let drawImg = document.createElement("canvas");
            drawImg.width = this.ctx.canvas.width;
            drawImg.height = this.ctx.canvas.height;
            this.drawImgCtx = drawImg.getContext("2d");
            this.drawImgCtx.lineWidth = 6;
        },
        //清除
        clearHandle() {
            let width = this.ctx.canvas.width;
            let height = this.ctx.canvas.height;
            this.ctx.clearRect(0, 0, width, height);
            this.drawImgCtx = null;
            this.pathRecord["startPath"] = [];
            this.pathRecord["endPath"] = [];
            this.init();
            this.isShowBtn = false;
            this.LandscapeBtn = false;
        },
        saveLinkHandle() {
            console.log("方法==", this.ctx.getImageData);
            console.log("方法==", this.ctx.canvas.width);
            console.log("方法==", this.ctx.canvas.height);
            console.log("是否横屏==", window.orientation);
            // return;

            // this.ctx.putImageData(imageData, 0, 0);

            // this.drawImgCtx.translate(75, 75);
            // this.drawImgCtx.rotate((-90 * Math.PI) / 180);
            // this.drawImgCtx.scale(1.5, 1.5);
            // this.drawImgCtx.drawImage(this.$refs.board, 50, 30, -75, -75);
            // let picUrl = this.drawImgCtx.canvas.toDataURL("image/png", 1);
            let picUrl = this.ctx.canvas.toDataURL("image/png", 1);
            this.$emit("saveLinkHandle", picUrl);
        },
        mStart(e) {
            let params = {};
            let x = e.touches[0].clientX - e.target.offsetLeft,
                y = e.touches[0].clientY - e.target.offsetTop;
            this.point.x = x;
            this.point.y = y;
            params.x = x;
            params.y = y;
            this.pathRecord["startPath"].unshift(params);
            this.ctx.beginPath();
            this.moving = true;
        },
        mMove(e) {
            if (this.moving) {
                let x = e.touches[0].clientX - e.target.offsetLeft,
                    y = e.touches[0].clientY - e.target.offsetTop;
                this.ctx.moveTo(this.point.x, this.point.y);
                this.ctx.lineTo(x, y);
                this.ctx.stroke();
                this.point.x = x;
                this.point.y = y;
                this.ctx.save();
            }
        },
        mEnd() {
            if (this.moving) {
                this.ctx.closePath();
                this.moving = false;
                let params = {};
                params.x = this.point.x;
                params.y = this.point.y;
                this.pathRecord["endPath"].unshift(params);
                if (!this.isShowBtn && !this.isLandscape) {
                    this.isShowBtn = true;
                } else if (!this.LandscapeBtn && this.isLandscape) {
                    this.LandscapeBtn = true;
                }
            }
        }
    },
    destroyed() {
        window.removeEventListener("resize", function() {}, true);
        // window.removeEventListener("touchmove", function() {}, true);
    }
};
</script>
<style lang="less" scoped>
.page {
    position: relative;
    .main-container {
        // padding: 20px 0 20px 20px;
        box-sizing: border-box;
        display: flex;
        .boardBox {
            position: relative;
            height: calc(100vh - 40px);
            background: #fff;
            box-sizing: border-box;
            flex: 1;
            width: 90%;
            border-radius: 10px;
            .canvas-board {
                box-sizing: border-box;
                background: transparent;
                position: absolute;
                z-index: 99;
            }
            //新增btn
            .btn-style {
                position: absolute;
                bottom: 7vh;
                right: 7vw;
                // transform: rotateZ(90deg);
                border-radius: 10px;
                background-color: #46aef7;
                border-color: #46aef7;
                width: 100px;
                z-index: 99;
            }
            .desc-title {
                position: absolute;
                left: 20%;
                top: 46%;
                transform: translate(-50%, -50%);
                padding: 10px;
                transform: rotateZ(90deg);
                width: 180px;
                & > :first-child {
                    color: #ececec;
                    font-size: 40px;
                }
            }
            .desc-title-2 {
                position: absolute;
                left: 56%;
                top: 46%;
                transform: translate(-50%, -50%);
                padding: 10px;
                // transform: rotateZ(90deg);
                width: 180px;
                & > :first-child {
                    color: #ececec;
                    font-size: 30px;
                }
            }
        }
        .signature-title {
            width: 30px;
            padding: 8px;
            position: absolute;
            right: 18px;
            z-index: 99;
            .signature-item {
                position: absolute;
                left: 0;
                top: 30px;
                width: 100%;
                transform: rotateZ(90deg);
                display: -webkit-box;
                font-size: 16px;
                & > :first-child {
                    display: block;
                    width: 80vh;
                    color: #999;
                }
                & > :last-child {
                    display: inline-block;
                    color: #46aef7;
                }
            }
        }
        .signature-title-2 {
            width: 30px;
            padding: 8px;
            position: absolute;
            left: 30px;
            z-index: 99;
            .signature-item-2 {
                position: absolute;
                left: 0;
                top: 10px;
                width: calc(100vw - 30px);
                // transform: rotateZ(90deg);
                display: -webkit-box;
                font-size: 16px;
                & > :first-child {
                    display: block;
                    width: 80%;
                    color: #999;
                }
                & > :last-child {
                    display: inline-block;
                    color: #46aef7;
                }
            }
        }
    }
    .btn {
        position: absolute;
        bottom: 7vh;
        left: 0;
        transform: rotateZ(90deg);
        border-radius: 10px;
        z-index: 99;
        & > :first-child {
            background-color: #46aef7;
            border-color: #46aef7;
            width: 100px;
            border-radius: 10px;
        }
    }
    .btn-active {
        animation: btnActive 1s 1;
    }
    .btn-normal {
        animation: btnNormal 1s 1;
    }
    .stealth-canvas {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: -1;
        opacity: 0;
    }
}
</style>