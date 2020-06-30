<!-- 百分比柱形组件 -->
<template>
	<view class="m-rateBar">
		{{ description }}
		<view class="roundedBar" :style="{ background: background }"></view>
		{{ info }}
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	props: {
		// 描述
		description: {
			type: [String],
			default: '描述'
		},
		//数据信息
		info: {
			type: [String],
			default: 'info'
		},
		//渐变方向
		direction: {
			type: [String],
			default: 'right'
		},
		//开始颜色
		bColor: {
			type: [String],
			default: '#ffc749',
			validator: function(v) {
				return v ? v : '#FF9933';
			}
		},
		//开始百分比
		bRate: {
			type: [String],
			default: '50%',
			validator: function(v) {
				v = v ? v : '50%';
				return v;
			}
		},
		//结束颜色
		eColor: {
			type: [String],
			default: '#dddddd'
		},
		//结束百分比
		eRate: {
			type: [String],
			default: '0'
		}
	},
	computed: {
		background() { 
			return 'linear-gradient(to ' + this.direction + ',' + this.bColor + ' ' + this.bRate + ',' + this.eColor + ' ' + this.eRate + ')';
		}
	}
};
</script>

<style scoped>
.m-rateBar {
	display: flex;
	justify-content: left;
	align-items: center;
	padding: 16rpx 0 16rpx 12%;
}
.roundedBar {
	display: block;
	width: 60%;
	height: 18rpx;
	border-radius: 30rpx;
	background-color: #dddddd;
	overflow: hidden;
	margin: 0 12rpx 0 12rpx;
}
</style>
