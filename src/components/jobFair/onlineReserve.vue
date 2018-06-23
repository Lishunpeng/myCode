<template>
	<div id="jobConsult">
		<header><span class="left"  @click="$router.back(-1)"></span>在线预订</header>
		
		<mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
			<ul class="newsList">
				
					<li v-for="data in onlineReserve">
						<router-link :to="{path:'reserve_choosePlace',query:{id:data.id}}">
							<p class="title" v-text="data.online_booking_title"></p>
						</router-link>	
							<div class="listContent">
								<p class="time" v-text="data.online_booking_begin_time+'到'+data.online_booking_end_time"></p>
								<span :class="data.type==0?'cur':''" v-text="typeName[data.type]"></span>
								<router-link :to="{path:'onlineDetail',query:{id:data.id}}">
									<span class="infoCompany" v-text="'参会企业'"></span>
								</router-link>
							</div>
						
					</li>
				
			</ul>
		</mt-loadmore>
	</div>
</template>

<script>
	import { Swipe, SwipeItem } from 'mint-ui';
	export default{
		name:'jobConsult',
		data(){
			return{
				page:1,
  				allLoaded:false,
  				onlineReserve:[],//获取新闻信息
  				getNowtimestamp:'',//获取当前时间戳
  				typeName:['已开始','未开始','已结束']
			}
		},
		created(){
			this.getNowtimestamp = Date.parse(new Date());
			this.myfun.getData(this,'onlineReserve','/app/onlineBookMore/'+this.page,['onlineBookingPage','list']);
		},
		methods:{
			loadBottom() {
				this.page++;
				this.getNowtimestamp = Date.parse(new Date());
				this.myfun.getData(this,'onlineReserve','/app/onlineBookMore/'+this.page,['onlineBookingPage','list']);
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	#jobConsult{
		.newsList{height: auto;padding: 30px;background: #fff;margin-bottom: 100px;
			li{height: auto;width: 100%;padding: 10px 0;border-bottom: 2px solid #E1E1E1;
				.title{font-weight: bold;color: #1B1B1B;font-size: 35px;min-height: 50px;line-height: 50px;letter-spacing:10px;}
				.listContent{height: auto;overflow: hidden;margin-top:10px;
					.time{color: #959595;float: left;}
					.cur{color: #FF6000;}
					span{float: right;}
					.infoCompany{color: #FF6000;margin-right: 20px;border: 2px solid #FF6000;border-radius:15px;padding: 0 15px;transition: all 0.3s linear;
						&:active{background: #FF6000;color: #fff;}
					}
				}
			}
			li+li{border-top:1px dashed #E1E1E1;}
		}
	}
</style>