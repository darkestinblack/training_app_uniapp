const authMixin = {
 	created: function() {		 
 		//console.log('mixin created');
 		this.authenticate()
 	},
 	beforeCreate: function() { 
 		//console.log('mixin beforeCreate')
 	},
 	methods: {
 		authenticate: function() { 
			const currentPage=getCurrentPages();
			if(currentPage[currentPage.length-1].route=="pages/login/login")
				return;
 			if (!(uni.$user&&uni.$user.hasLogin)) {
 				uni.redirectTo({
 					url: '../login/login'
 				});
 			}
 		}
 	}
 };
 export default authMixin;
