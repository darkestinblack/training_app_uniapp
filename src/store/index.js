import Vue from 'vue';
import Vuex from 'vuex';
import authMixin from '../components/mixins/authMixin.js';

Vue.use(Vuex);
const store = new Vuex.Store({
	//strict:true,
	state: {
		/**
		 * 是否需要强制登录
		 */
		forcedLogin: true,
		hasLogin: false,
		userName: '',
		authMixin: authMixin,
	},
	mutations: {
		login(state, user) {
			if (user) {
				state.userName = user.userName || '新用户';
				state.hasLogin = true;
				state.authToken = user.authToken;
				//
				uni.$user = {};
				uni.$user.hasLogin = true;
				uni.$user.userId = user.userId;
				uni.$user.userName = user.userName || '新用户';
				uni.$user.authToken = user.authToken;
				// 缓存用户信息
				uni.setStorageSync('user', user);
			}
		},
		logout(state) {
			state.userName = "";
			state.hasLogin = false;
			//
			uni.$user = null;
			// 清除登录缓存
			// uni.clearStorage();
			uni.removeStorageSync('user');
		},

	}
});
Vue.filter("toShortDate", function(v, fromatStr = 'MM月dd日 hh:mm') {
	return new Date(v).format(fromatStr);
});
export default store;
