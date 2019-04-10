<template>
    <div>
        <div class="active_amount" v-if="isShowMoney">发起借款<input type="number" v-model="itemIndex" @keyup="slideMoveTo(itemIndex-1)" min="1" max="10">00元</div>
        <div class="swiper-container-wrap">
            <div class="center-line">
                <img src="../assets/images/slider-icon.png" width="12" height="46">
            </div>
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-if="index!=0" v-for="(item, index) in num" :index="index" :class="{ 'long':  index % 5 == 0 || index == 1}">
                        <div class="num">{{index * 100 }}</div>
                        <div  class="line"></div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
    
</template>
<script type="text/javascript">
import Swiper from "swiper";
export default {
    // props: {
	// 	title: String,
	// 	showBack: Boolean,
	// 	showBtnClose: Boolean,
	// 	isShowCloseDialog: Boolean,
	// 	closeDialogTitle: String,
	// 	closeDialogContent: String,
	// 	closeDialogConfirmText: String,
	// 	closeDialogCancelText: String,
	// 	jumpRouteName: String,
	// 	closeJumpRouteName: String,
	// 	query: Object
	// },
	props:{
        isShowMoney: Boolean,
        initialSlide: Number
    },
	data() {
		return {
            swiper: {},
            num: 101,
            activeIndex: 101,
            itemIndex:100,
            lock: false
		};
	},
	mounted() {

		this.swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            slidesPerView: 10,
            centeredSlides: true,
            spaceBetween: 0,
            grabCursor: true,
            initialSlide : this.initialSlide,
            onSlideChangeEnd: (swiper)=>{
                this.activeIndex = swiper.activeIndex;
                
            }
        });
	},
	methods: {
		slideMoveTo(num){
            this.activeIndex = num;
            this.swiper.slideTo(num, 0, false);
        }
    },
    watch: {
        activeIndex(val, oldVal){//普通的watch监听
        console.info('val', val);
            this.itemIndex = val + 1;
        },
        itemIndex(val, oldVal){//普通的watch监听
            console.info('val == ', val, oldVal);
            this.$emit("slideVal", val)
            if(val<0 || val == 0) {
                this.itemIndex = ''; 
                return false;
            }
            if(val > 100) val = 100;
            if(!/^\d+$/.test(val)){
                this.itemIndex=oldVal;
            }else{
                this.itemIndex = val;
            }

            
        }
    },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "~bowerComponents/sass-rem/_rem.scss";
.active_amount{
    width: 100%;
    height: 50px;
    text-align: center;
    font-size: rem(16px);
    text-align: center;
    position: relative;
    font-weight: normal;
    line-height: rem(50px);
    input{
        width: rem(40px);
        height: rem(20px);
        line-height: rem(20px);
        text-align: center;
        display: inline-block;
        border-radius: 5px;
        margin: rem(0 5px);
        color: #a28362;
        font-size: rem(16px);
        border: 1px solid #A4A4A4;
        margin-top: -2px;
        margin-bottom: 1px;
    }
}
.swiper-container-wrap{
    position: relative;
    width: 80%;
    height: 40px;
    margin: 0 auto;
    .center-line{
        width: auto;
        height: 100%;
        position: absolute;
        top: -2px;
        left: calc(50% - 6px);
        z-index: 9;
    }
    .swiper-container{
        width: 100%;
        height: 40px;
        position: relative;
        border: 1px solid #DADADA;
        border-radius: 20px;
        
    }
    .swiper-wrapper{
        border-bottom: 1px solid #A4A4A4;
        height: 40px;
        .swiper-slide{
            position: relative;
            &.long{
                .num{
                    display: block;
                }
                .line{
                    height: 16px;
                }
            }
            &.first{
                display: none;
            }
            .num{
                width: 100%;
                text-align: center;
                font-size: 12px;
                position: absolute;
                top: 6px;
                left: 0;
                display: none;
            }
            .line{
                width: 1px;
                height: 8px;
                background: #A4A4A4;
                position: absolute;
                bottom: 0;
                left: calc(50% - 0.5px);
            }
        }
    }
}
</style>
