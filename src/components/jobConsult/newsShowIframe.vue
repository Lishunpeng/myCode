<template>
	<div id="newsShowIframe">
		<header>
			<span class="left" @click="$router.back(-1)"></span>
			新闻详情
		</header>
		<div class="container">
			<iframe  width="" height=""></iframe>
		</div>
	</div>
</template>

<script>
	export default{
		name:'newsShowIframe',
		data(){
			return{
				myHref:''
			}
		},
		created(){
			this.myHref = this.$route.query.href;
			this.$nextTick(()=>{
				$('body,html,#newsShowIframe,#app,.container,.container iframe').css({width:'100%',height:'100%'});
				$('.container').find('iframe').attr('src',this.myHref);		
				
				/*window.onbeforeunload=function(e){   
					console.log('确定离开当前页面吗')
				　　var e = window.event||e;  
				　　e.returnValue=("确定离开当前页面吗？");
					return false;
				} */
				$(window).on('beforeunload',function(e){
					console.log('确定离开当前页面吗');
					if(e && e.preventDefault) {
						e.preventDefault();
					} else {
						window.event.returnValue = false;
					}
					return false;
				})
			});
		},
		methods:{
			
		}
	}
</script>

<style lang="less" scoped="scoped">
</style>