<template>
	<div id="app">
		<!--<div class="loadingBox" :class="isShow?'show':'hide'">
			<div class="ajaxloader2">
				<div class="outer"></div>
				<div class="inner"></div>
			</div>
		</div>-->
		<!--<iframe id="geoPage" width=0 height=0 frameborder=0 style="display:none;" scrolling="no" src="https://apis.map.qq.com/tools/geolocation?key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp">
		</iframe>-->
		<div class="headerBoxReplace"></div>
		<div class="blackBox"></div>
		<!--<lg-preview></lg-preview>-->
		<router-view/>
	</div>
</template>

<script>
	export default {
		name: 'app',
		data(){
			return{
				toPath:'',
				toFrom:'',
			}
		},
		watch:{
			$route(to, from) { 
                isNeedBack = true;
            }  
		},
		created() {
			this.myfun.getThis(this);
			//定位
//			this.myfun.getLocation(this);
			//自动登录
			localStorage.token = localStorage.token || '123';
			this.myfun.addBackClick();
		}
	}
</script>
<style lang="less" scoped="scoped">
	.headerBoxReplace{height:90px;background: rgba(0,0,0,0.3);}
</style>