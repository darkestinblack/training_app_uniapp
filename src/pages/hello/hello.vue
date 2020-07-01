<template>
	<view class="welcomePage">
		<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="1500" :duration="800">
			<swiper-item class="swiperItem" v-for="(it, index) in imgArts" :key="index">
				<image class="swiperImg" :src="it.src" :mode="'aspectFill'"></image>
			</swiper-item>
		</swiper>
		<button class="skip" @click="skip">跳过 {{ tick }}</button>
	</view>
</template>

<script>
import Vue from 'vue';
export default {
	data() {
		return {
			imgArts: [],
			tick: 5
		};
	},
	beforeCreate() {
		//this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
	},
	methods: {
		skip() {
			uni.reLaunch({
				url: '../tab/diet'
			});
		}
	},
	onReady() {
		const that = this;
		uni.request({
			// https://bing.biturl.top/
			// https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=3
			url: 'https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=4&h=240&w=320',
			type: 'get',
			success: function(res) {
				that.imgArts = res.data.images.map(function(it, index) {
					return {
						src: 'https://cn.bing.com/' + it.url,
						art: it.copyright,
					};
				});
			},
			fail: function(err) {}
		});
		var interval = setInterval(function() {
			//console.log(interval);
			that.tick--;
			if (that.tick <= 0) {
				clearInterval(interval);
				that.skip();
			}
		}, 1000);
	}
};
</script>
<style lang="less" scoped>
.welcomePage {
	background-color: #efeff4;
	width: 750rpx;
	.swiper {
		min-height: 100%;
		min-width: 750rpx;
		.swiperItem {
			.swiperImg {
				width: 750rpx;
				height: 100%;
			}
		}
	}
}
.skip {
	position: absolute;
	z-index: 100;
	opacity: 0.5;
	bottom: 5%;
	right: 5%;
	mix-blend-mode: 'difference';
	background-color: black;
	font-size: 13px;
	color: white;
	border-radius: 15px;
	padding-left: 10px;
	padding-right: 10px;
	line-height: 2;
}
</style>
