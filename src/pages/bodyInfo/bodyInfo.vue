<template>
	<view class="content">
		<view class="contentRadius">
			<view class="title">
				<view class="iconContainer"><span class="iconfont">&#xe696;</span></view>
				<view class="infoContainer">
					<text>体重 {{ bodyInfo.weight * 2 }}斤</text>
					<text class="gray12">{{ bodyInfo.updatetime | toShortDate }}</text>
				</view>
			</view>
			<view class="qiun-charts"><canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" @touchstart="touchLineA"></canvas></view>
		</view>
		<view class="contentRadius">
			<view class="title">
				<view class="iconContainer"><span class="iconfont">&#xe693;</span></view>
				<view class="infoContainer">
					<text>身体指数 96</text>
					<text class="gray12">{{ bodyInfo.updatetime | toShortDate }}</text>
				</view>
			</view>
			<view>
				<m-RateBar
					class="bar"
					v-for="(bar, index) in bars"
					:key="index"
					:bRate="bar.bRate"
					:bColor="bar.bColor"
					:description="bar.description"
					:info="bar.info"
				></m-RateBar>
			</view>
		</view>
		<view class="contentRadius">
			<view class="title">
				<view class="iconContainer" style="background-color: #9900FF;"><span class="iconfont">&#xe69f;</span></view>
				<view class="infoContainer">
					<text>无睡眠数据</text>
					<text class="gray12">睡眠监测有助于更好的了解自己的身体状态</text>
				</view>
			</view>
		</view>
		<view class="contentRadius">
			<view class="title">
				<view class="iconContainer" style="background-color: #e44c03;"><span class="iconfont">&#xe658;</span></view>
				<view class="infoContainer">
					<text>无心率数据</text>
					<text class="gray12">随时了心率变化，能更多的察觉到身体异常，保持健康</text>
				</view>
			</view>
		</view>
		<view class="contentRadius">
			<view class="title">
				<view class="iconContainer"><span class="iconfont">&#xe72a;</span></view>
				<view class="infoContainer">
					<text>平衡性</text>
					<text class="gray12">还未测量过，快去测测你的平衡能力吧</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import authMixin from '../../components/mixins/authMixin.js';
import mRateBar from '../../components/m-rateBar.vue';
import uCharts from '../../js_sdk/u-charts/u-charts/u-charts.js';
var canvaLine = {};
export default {
	data() {
		return {
			bodyInfo: { weight: '', bfr: '', calorie: '', water: '', updatetime: '', muscle: '' },
			chartData: {
				categories: [],
				series: [
					{
						name: '体重变化',
						data: [],
						color: '#0faeff'
					}
				]
			},
			bars: [
				{
					description: '体脂',
					//数据信息
					info: '',
					//开始颜色
					bColor: '#FFCC00',
					//开始百分比
					bRate: ''
				},
				{
					description: '肌肉',
					//数据信息
					info: '',
					//开始颜色
					bColor: '#FF9900',
					//开始百分比
					bRate: ''
				},
				{
					description: '水分',
					//数据信息
					info: '',
					//开始颜色
					bColor: '#00CC99',
					//开始百分比
					bRate: ''
				}
			]
		};
	},
	mixins: [authMixin],
	computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
	components: {
		mRateBar
	},
	methods: {
		loadBodyInfo() {
			const that = this;
			uni.$bkHttpHandler({
				url: 'user/bodyInfos',
				data: { pId: 1, pSize: 5 },
				method: 'get',
				success: function(res) {
					if (typeof res.data != 'undefined') {
						that.bodyInfo = res.data[0];
						that.bars[0].info = that.bodyInfo.bfr + '%';
						that.bars[0].bRate = that.bodyInfo.bfr + '%';
						that.bars[1].info = that.bodyInfo.muscle * 2 + '斤';
						that.bars[1].bRate = (that.bodyInfo.muscle / that.bodyInfo.weight) * 100 + '%';
						that.bars[2].info = that.bodyInfo.water + '%';
						that.bars[2].bRate = that.bodyInfo.water + '%';
						res.data.reverse();
						for (let it of res.data) {
							that.chartData.categories.push(new Date(it.updatetime).format('yyyy-MM-dd') || '');
							that.chartData.series[0].data.push(it.weight * 2 || 0);
						}
						that.showLineA('canvasLineA', that.chartData);
					}
				},
				fail: function(err) {}
			});
		},
		showLineA(canvasId, chartData) {
			canvaLine = new uCharts({
				$this: this,
				canvasId: canvasId,
				type: 'line',
				fontSize: 11,
				legend: { show: false },
				dataLabel: false,
				dataPointShape: true,
				background: '#FFFFFF',
				pixelRatio: 1,
				categories: chartData.categories,
				series: chartData.series,
				animation: true,
				xAxis: {
					disabled: true,
					disableGrid: true
					//axisLine:false,
				},
				yAxis: {
					splitNumber: 2,
					disableGrid: true,
					data: [
						{
							min: 120,
							max: 125,
							axisLine: false,
							format: val => {
								return val.toFixed(0);
							}
						}
					]
				},
				width: 300,
				height: 100,
				extra: {
					line: {
						type: 'curve'
					}
				}
			});
		},
		touchLineA(e) {
			canvaLine.showToolTip(e, {
				format: function(item, category) {
					return new Date(category).format('MM月dd日') + ' ' + ':' + item.data + '斤';
				}
			});
		}
	},
	onLoad() {
		this.loadBodyInfo();
	},
	onShow() {
		// if (!this.hasLogin) {
		// 	uni.showToast({
		// 		icon: 'none',
		// 		title: 'show'
		// 	});
		// 	uni.showModal({
		// 		title: '未登录',
		// 		content: '您未登录，需要登录后才能继续',
		// 		/**
		// 		 * 如果需要强制登录，不显示取消按钮
		// 		 */
		// 		showCancel: !this.forcedLogin,
		// 		success: res => {
		// 			if (res.confirm) {
		// 				/**
		// 				 * 如果需要强制登录，使用reLaunch方式
		// 				 */
		// 				if (this.forcedLogin) {
		// 					uni.reLaunch({
		// 						url: '../login/login'
		// 					});
		// 				} else {
		// 					uni.navigateTo({
		// 						url: '../login/login'
		// 					});
		// 				}
		// 			}
		// 		}
		// 	});
		// }
	}
};
</script>

<style lang="less" scoped>
.contentRadius {
	padding: 20rpx;
	background-color: #ffffff;
	border-radius: 20rpx;
	box-shadow: 4rpx 4rpx 4rpx #8888887a;
	margin-bottom: 20rpx;
}
.title {
	display: flex;
	justify-content: left;
	align-content: center;
	padding: 30rpx 0 20rpx 0;
}
.bar {
	font-size: 24rpx;
}
/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
.qiun-charts {
	width: 670rpx;
	height: 200rpx;
	background-color: #ffffff;
}
.charts {
	width: 670rpx;
	height: 200rpx;
	background-color: #ffffff;
}
.iconContainer {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 60rpx;
	height: 60rpx;
	border-radius: 60rpx;
	background: #0faeff;
}
.iconfont {
	font-size: 36rpx;
	color: #f9fffd;
}
.infoContainer {
	padding: 0 0 0 30rpx;
	display: flex;
	flex-direction: column;
}
</style>
