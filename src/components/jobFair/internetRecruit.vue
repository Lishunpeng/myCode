<template>
	<div id="jobConsult">
		<header><span class="left"  @click="$router.back(-1)"></span>网络招聘</header>
		<mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
			<ul class="newsList">
					<li v-for="data in interInfo">
						<router-link :to="{path:'internetRecruitDetail',query:{id:data.id,type:data.type}}">
							<p class="title" v-text="data.job_fair_title"></p>
							<div class="listContent">
								<p class="time">{{data.job_fair_start+'到'+data.job_fair_end}}</p>
								<span :class="data.type==0?'cur':''" v-text="typeName[data.type]"></span>
							</div>
						</router-link>	
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
  				interInfo:[],//获取新闻信息
  				listType:'dailyRecruitment',
  				jfImg:'',
  				listContTytpe:'jobFair',//默认为日常招聘
  				getNowtimestamp:'',//获取当前时间戳
  				typeName:['已开始','未开始','已结束']
			}
		},
		created(){
			this.getNowtimestamp = Date.parse(new Date());
			this.myfun.getData(this,'interInfo','/app/internetRecruitmentMore/'+this.page+'-'+this.listType+'-'+this.listContTytpe,['jobFairPage','list']);
		},
		methods:{
			loadBottom() {
				this.getNowtimestamp = Date.parse(new Date());
				this.page++;
				this.myfun.getData(this,'newsPage','/app/newsCenter/'+this.page+'-'+this.listType+'-'+this.listContTytpe,['newsPage','list']);
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	#jobConsult{
		.newsList{height: auto;padding: 30px;background: #fff;margin-bottom: 100px;
			li{height: auto;width: 100%;padding: 10px 0;
				.title{font-weight: bold;color: #1B1B1B;font-size: 35px;min-height: 50px;line-height: 50px;letter-spacing:10px;}
				.listContent{height: auto;overflow: hidden;margin-top:10px;
					.time{color: #959595;float: left;}
					.cur{color: #FF6000;}
					span{float: right;color: #888888;}
				}
			}
			li+li{border-top:2px dashed #E1E1E1;}
		}
	}
</style>