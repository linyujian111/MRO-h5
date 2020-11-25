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
            </div>
            <div class="signature-title">
                <div class="signature-item">
                    <span>请在下方空白区域进行签名</span>
                    <span @click="clearHandle">清空</span>
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
            isShowBtn: false,
            pathRecord: {
                startPath: [],
                endPath: []
            }
        };
    },
    created() {},
    mounted() {
        this.init();
    },
    methods: {
        //初始化
        init() {
            document.body.addEventListener(
                "touchmove",
                function(e) {
                    e.preventDefault();
                },
                { passive: false }
            );
            let board = this.$refs.board;
            board.width = this.$refs.boardBox.offsetWidth;
            board.height = this.$refs.boardBox.offsetHeight;
            this.ctx = board.getContext("2d");
            this.ctx.strokeStyle = "#000";
            this.ctx.lineWidth = 6;
            let drawImg = document.createElement("canvas");
            drawImg.width = 150;
            drawImg.height = 150;
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
        },
        saveLinkHandle() {
            this.drawImgCtx.translate(75, 75);
            this.drawImgCtx.rotate((-90 * Math.PI) / 180);
            this.drawImgCtx.scale(1.5, 1.5);
            this.drawImgCtx.drawImage(this.$refs.board, 50, 30, -75, -75);
            let picUrl = this.drawImgCtx.canvas.toDataURL("image/png", 1);
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
                if (!this.isShowBtn) {
                    this.isShowBtn = true;
                }
            }
        }
    }
};
</script>
<style lang="less" scoped>
.page {
    position: relative;
    .main-container {
        padding: 20px 0 20px 20px;
        box-sizing: border-box;
        display: flex;
        .boardBox {
            height: calc(100vh - 40px);
            background: #fff;
            // border: 1px solid transparent;
            box-sizing: border-box;
            flex: 1;
            width: 90%;
            border-radius: 10px;
            .canvas-board {
                box-sizing: border-box;
            }
        }
        .signature-title {
            width: 30px;
            padding: 8px;

            position: relative;
            .signature-item {
                position: absolute;
                left: 0;
                top: 30px;
                width: 100%;
                transform: rotateZ(90deg);
                display: -webkit-box;
                & > :first-child {
                    display: block;
                    width: 80vh;
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