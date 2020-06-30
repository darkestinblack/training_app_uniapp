<template>
	<view class="content">
		<view class=" top">
			<view class="endCenter">
				<span class="iconfont" style="font-size: 60rpx;">&#xe603;</span>
			</view>
			<view class="centerCenter">
				<span class="iconfont" style="font-size: 80rpx;">&#xe697;</span>
			</view>
		<view class="betweenCenter" style="padding: 0 10% 0 10%; margin: 28rpx 0 0 0;">
			<view class="gray14 ">状态</view>
			<view class="gray14">健走</view>
			<view class="gray14">跑步</view>
			<view class="gray14">骑行</view>
			<view class="gray14">健身</view>
		</view>
		</view>
		<view class="contentRadius">
			<view class="contentRow betweenCenter">
				<view style="display: flex; flex-direction: column;">
					<text style="color: #FF3300; font-size: 80rpx;">2354</text>
					<text class="gray12">距离达成目标还有3646步</text>
				</view>
				<view class="iconWalkOutside centerCenter">
					<view class="iconWalkInside centerCenter"><span class="iconfont" style="font-size: 60rpx;color: #FF3300; ">&#xe927;</span></view>
				</view>
			</view>
			<view class="contentRow startCenter">
				<view class="iconContainer"><span class="iconfont">&#xe696;</span></view>
				<view class="infoContainer">
					<text>体重 {{ bodyInfo.weight * 2 }}斤</text>
					<text class="gray12">{{ bodyInfo.updatetime | toShortDate }}</text>
				</view>
			</view>
			<view class="contentRow startCenter">
				<view class="iconContainer"><span class="iconfont">&#xe693;</span></view>
				<view class="infoContainer">
					<text>身体指数 96</text>
					<text class="gray12">体脂{{bodyInfo.bfr+'% '}}| 肌肉{{bodyInfo.muscle}}斤 | 水分{{bodyInfo.water}}%</text>
				</view>
			</view>
			<navigator url="../bodyInfo/bodyInfo" class="centerCenter gray12">查看更多</navigator>
		</view>
		
		<view class="contentRadius">
			<!-- <view  class="centerCenter" style=" color:#9E9EA2">卡路里</view> -->
			<view class="contentRow betweenCenter">
				<view style="display: flex; flex-direction: column;">
					<text style="color: #FF9900; font-size: 50rpx;">525 Kcal</text>
					<text class="gray12">基础代谢1,254千卡</text>
				</view>
				<view class="iconWalkOutside centerCenter">
					<view class="iconWalkInside centerCenter"><span class="iconfont" style="font-size: 60rpx;color: #FF9900; ">&#xe508;</span></view>
				</view>
			</view>
			<view class="contentRow startCenter">
				<view class="iconContainer" style="background-color: #00cc99;"><span class="iconfont">&#xe66e;</span></view>
				<view class="infoContainer">
					<text>饮食</text>
					<text class="gray12">早餐 235千卡 | 午餐 568千卡 | 晚餐 600千卡</text>
				</view>
			</view>
			<view class="contentRow startCenter">
				<view class="iconContainer" style="background-color: #00cc99;"><span class="iconfont">&#xe63a;</span></view>
				<view class="infoContainer">
					<text>喝水</text>
					<text class="gray12">400 毫升 | 233 毫升 | 300 毫升</text>
				</view>
			</view>
			<navigator url="../bodyInfo/bodyInfo" class="centerCenter gray12">查看更多</navigator>
		</view>
	</view>
</template>

<script>
import authMixin from '../../components/mixins/authMixin.js';

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
			}
		};
	},
	mixins: [authMixin],
	computed: {},
	methods: {
		loadBodyInfo() {
			const that = this;
			uni.$bkHttpHandler({
				url: 'user/bodyInfos',
				data: { pId: 1, pSize: 1 },
				method: 'get',
				success: function(res) {
					if (res.data) {
						that.bodyInfo = res.data[0];
					}
				},
				fail: function(err) {}
			});
		}
	},
	onLoad() {
		this.loadBodyInfo();
	}
};
</script>

<style>
.top {
	padding: 40rpx 0 40rpx 0;
	height: 15%;
}
.content {
	background: linear-gradient(to bottom, #ff9933 10%, #efeff4 40%);
}
.contentRadius {
	padding: 40rpx 40rpx 40rpx 40rpx;
	background-color: #ffffff;
	border-radius: 20rpx;
	box-shadow: 4rpx 4rpx 4rpx #8888887a;
	margin-bottom: 20rpx;
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
.infoContainer {
	padding: 0 0 0 30rpx;
	display: flex;
	flex-direction: column;
}
.iconWalkOutside {
	width: 100rpx;
	height: 100rpx;
	border-radius: 100rpx;
	background: #dddddd;
}
.iconWalkInside {
	width: 80rpx;
	height: 80rpx;
	border-radius: 80rpx;
	background: #ffffff;
}
.iconfont {
	font-size: 36rpx;
	color: #f9fffd;
}
.contentRow {
	border-bottom: solid #efeff4 2rpx;
	padding: 0 0 40rpx 0;
	margin: 0 0 40rpx 0;
}
.gray14{
	font-size: 28rpx;
	color: #efeff4;
}
</style>
