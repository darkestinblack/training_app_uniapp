<script>
import uuidv1 from 'uuid';
import store from './store';
import config from './config/config.js';
import bkHttpHandler from './common/js/bkHttpHandler.js';
import format from './common/js/dateFormatter.js';
export default {
	onLaunch: function() {
		//uuid 初始化
		if (!config.uuid) {
			config.uuid = uuidv1().toString();
		}
		uni.$config = config;
		uni.$bkHttpHandler = bkHttpHandler;
		Date.prototype.format = format;
		console.log('App Launch');
	},
	onShow: function() {
		// 缓存登录
		const user = uni.getStorageSync('user');
		if (user) {
			store.commit('login', user);
		}
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
@import './common/css/icon-font/iconfont.css';
/*每个页面公共css */
page {
	min-height: 100%;
	display: flex;
}

/* #ifdef MP-BAIDU */
page {
	width: 100%;
	height: 100%;
	display: block;
}

swan-template {
	width: 100%;
	min-height: 100%;
	display: flex;
}

/* 原生组件模式下需要注意组件外部样式 */
custom-component {
	width: 100%;
	min-height: 100%;
	display: flex;
}

/* #endif */

/* #ifdef MP-ALIPAY */
page {
	min-height: 100vh;
}

/* #endif */

/* 原生组件模式下需要注意组件外部样式 */
m-input {
	width: 100%;
	min-height: 100%;
	display: flex;
}

.content {
	font-size: 28rpx;
	display: flex;
	flex: 1;
	flex-direction: column;
	background-color: #efeff4;
	padding: 20rpx;
}

.input-group {
	background-color: #ffffff;
	margin-top: 40rpx;
	position: relative;
}

.input-group::before {
	position: absolute;
	right: 0;
	top: 0;
	left: 0;
	height: 1rpx;
	content: '';
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
	background-color: #c8c7cc;
}

.input-group::after {
	position: absolute;
	right: 0;
	bottom: 0;
	left: 0;
	height: 1rpx;
	content: '';
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
	background-color: #c8c7cc;
}

.input-row {
	display: flex;
	flex-direction: row;
	position: relative;
}

.input-row .title {
	width: 20%;
	height: 50rpx;
	min-height: 50rpx;
	padding: 15rpx 0;
	padding-left: 30rpx;
	line-height: 50rpx;
}

.input-row.border::after {
	position: absolute;
	right: 0;
	bottom: 0;
	left: 15rpx;
	height: 1rpx;
	content: '';
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
	background-color: #c8c7cc;
}

.btn-row {
	margin-top: 50rpx;
	padding: 20rpx;
}

button.primary {
	background-color: #0faeff;
}
.gray12 {
	font-size: 24rpx;
	color: #9e9ea2;
}
/* 水平垂直居中 */
.centerCenter {
	display: flex;
	justify-content: center;
	align-items: center;
}
/* 靠前垂直居中 */
.startCenter {
	display: flex;
	justify-content: flex-start;
	align-items: center;
}
/* 靠后垂直居中 */
.endCenter {
	display: flex;
	justify-content: flex-end;
	align-items: center;
}
/* 俩边平分垂直居中 */
.betweenCenter {
	display: flex;
	justify-content: space-between;
	align-items: center;
} 
</style>
