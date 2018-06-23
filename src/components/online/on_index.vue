<template>
	<div id="on_index">
		<header>{{isPerson?'个人用户':'企业用户'}}</header>
		<div class="container">
			<div :class="['person',isPerson?'show':'hide']">
				<div class="imgbox">
					<router-link to="person/on_comInter">
						<img src="../../assets/image/on_com_ms.png"/>
					</router-link>
				</div>
				<div class="imgbox">
					<router-link to="person/on_appointment">
						<img src="../../assets/image/on_per_yy.png"/>
					</router-link>
				</div>
			</div>
			<div :class="['com',!isPerson?'show':'hide']">
				<div class="imgbox">
					<router-link to="company/on_msList">
						<img src="../../assets/image/on_ms_list.png"/>
					</router-link>
				</div>
				<div class="imgbox">
					<router-link to="company/on_msApply">
						<img src="../../assets/image/on_ms_apply.png"/>
					</router-link>
				</div>
			</div>
			<div :class="['btn']" v-text="isPerson?'切换成企业用户':'切换成个人用户'" @click="change" v-if="hasBtn"></div>
			<a href="./static/videoInterview.html" style="text-align: center;margin: 20px;color: #FF6000;">点击测试直播播放</a>
		</div>
		<myFoot :num="1"></myFoot>
	</div>
</template>

<script>
	import myFoot from '../footer.vue';
	export default{
		name:'on_index',
		data(){
			return{
				isPerson:true,
				hasBtn:false
			}
		},
		components:{myFoot},
		created(){
			this.myfun.getAxios({path:'/app/isCompany'},res=>{
				console.log(res);
				this.isPerson = !res.content;
				console.log(this.isPerson);
				this.hasBtn = res.content;
				if(localStorage.isPerson){
					this.isPerson = localStorage.isPerson==1?true:false;					
				}
			})
		},
		methods:{
			change(){
				this.isPerson = !this.isPerson;
				this.isPerson?localStorage.isPerson = 1:localStorage.isPerson = 2;
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
#on_index{
	.container{padding:30px;padding-bottom: 100px;
		.btn{margin: 40px auto;width: 100%;}
		.imgbox{width: 100%;height: auto;img{width: 100%;}}
		.imgbox+.imgbox{margin-top: 30px;}
	}
}
</style>