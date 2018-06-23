<template>
	<div id="jobConsult">
		<header><span class="left"  @click="$router.back(-1)"></span>展位展示</header>
		<div class="container">
			<div class="top">
				<div class="title">{{comInfo.online_booking_title}}</div>
				<div class="linkBtn"><router-link :to="{path:'reserve_choosePlace',query:{id:getId}}">预定展位</router-link> </div>
			</div>
			<div class="list">
				<li v-if="!list.length" style="color: #FF6000;">
					目前还未有人预定展位！
				</li>
				<li v-for="data in list" v-else>
					<div class="left">
						<div class="title" v-text="data.company_name"></div>
						<div class="detail" v-text="data.works"></div>
					</div>
					<div class="right">
						<span v-text="data.online_booking_place"></span>
					</div>
				</li>
			</div>
		</div>
	</div>
</template>

<script>
	import { Swipe, SwipeItem } from 'mint-ui';
	export default{
		name:'jobConsult',
		data(){
			return{
				getId:'',
				list:[],
				comInfo:{}
			}
		},
		created(){
			this.getId = this.$route.query.id;
			console.log(this.getId,'this.getId');
			this.myfun.getAxios({path:'/app/onlineBookDetail/'+this.getId},res=>{
				this.comInfo = res.content.onlineBookingView;
				this.list = res.content.OnlineCompanyView.list;
			})
		},
		methods:{
			
		}
	}
</script>

<style lang="less" scoped="scoped">
	.container{
		.top{height: auto;background:#fff;padding:20px 30px;overflow:auto;
			.title{font-size: 40px;font-weight: bold;word-break: break-word;line-height: 50px;}
			.linkBtn{transition: all 0.3s linear;border: 5px solid #FF6000;text-align: center;line-height: 40px;width: auto;padding: 10px 30px;float: right;color: #FF6000;border-radius:50px;
				&:active{background: #FF6000;color:#fff;}
			}
		}
		.list{margin-top: 20px;background: #fff;padding: 30px;
			li{height: auto;display: flex;border-bottom: 2px solid #E1E1E1;padding: 10px 0;
				div{height: auto;
					.title{font-size:40px;line-height: 40px;}
					.detail{color: #999;margin-top: 10px;}
				}
				.left{flex: 8;}
				.right{flex:2;color: #FF6000;display: flex;
					span{color: #FF6000;margin: auto;height: 50px;line-height: 50px;width: auto;}
				}
			}
		}
	}
</style>