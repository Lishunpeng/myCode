<template>
	<div id="jobConsult">
		<header><span class="left"  @click="$router.back(-1)"></span>招聘会</header>
		
		<ul class="nav">
			<li @click="changeLi(0,'dailyRecruitment','jobFair')"><p :class="liVal==0?'cur':''">日常招聘</p></li>
			<li @click="changeLi(1,'thematicRecruitment','jobFair')"><p :class="liVal==1?'cur':''">专题招聘</p></li>
			<li @click="changeLi(2,'emergencyRecruitment','jobFair')"><p :class="liVal==2?'cur':''">紧急招聘</p></li>
			<li @click="changeLi(3,'largeRecruitment','jobFair')"><p :class="liVal==3?'cur':''">大型招聘</p></li>
			<li @click="changeLi(4)"><p :class="liVal==4?'cur':''">在线预订</p></li>
		</ul>
		<div class="mySwipeBox">
			<div class="bannerBox">
				<img :src="$ips+'/downloadData/img?filePath='+jfImg"/>
			</div>
		</div>
		<mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
			<ul class="newsList">
				<li v-for="data in newsPage">
					<router-link :to="{path:'/jobConsult/newsShow',query:{id:data.id}}">
						<p class="title lineBroke" v-text="data.news_title"></p>
						<p class="content" v-text="data.news_abstract+'...'"></p>
						<p class="time" v-text="data.news_publish_time"></p>
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
				liVal:0,//默认为新闻列表
				page:1,
  				allLoaded:false,
  				newsPage:[],//获取新闻信息
  				newsBanner:[],//banner图
  				listType:'dailyRecruitment',
  				jfImg:'',
  				listContTytpe:'jobFair'//默认为日常招聘
			}
		},
		created(){
			this.myfun.getAxios({path:'/app/channelIMG/76'},res=>{
				this.jfImg = res.content;
				console.log(res,'IMG');
			})
			this.myfun.getData(this,'newsPage','/app/newsCenter/'+this.page+'-'+this.listType+'-'+this.listContTytpe,['newsPage','list']);
			
		},
		methods:{
			loadBottom() {
				this.page++;
				this.myfun.getData(this,'newsPage','/app/newsCenter/'+this.page+'-'+this.listType+'-'+this.listContTytpe,['newsPage','list']);
			},
			//改变Li
			changeLi(val,liType,liContType){
				if(this.liVal==val){
					return;
				}
				else if(val==4){
					this.$router.push({path:'onlineReserve'});
				}
				else{
					this.page = 1;
					this.listContTytpe = liContType;
					this.liVal = val;
					this.listType = liType;
					this.newsPage = [];
					this.myfun.getData(this,'newsPage','/app/newsCenter/'+this.page+'-'+this.listType+'-'+this.listContTytpe,['newsPage','list']);
					this.isClick = false;
				}
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	#jobConsult{
		.show{display: block!important;}
		.hide{display: none!important;}
		.mySwipeBox{height: 334px;background: #ccc;width: auto;position:relative;width: 100%;margin-top: 90px;
			.bannerBox{width: 100%;height: 100%;overflow: hidden;
				img{width: 100%;}
			}
		}
		.nav{height: 80px;width: 100%;padding: 10px 0;display: flex;background:#fff;position: fixed;left: 0;top: 90px;z-index: 100;
			li{flex: 1;padding: 0 10px;font-size: 25px;
				p.cur{border-bottom: 5px solid #FF6000;color: #1B1B1B;}
				p{border-bottom: 5px solid transparent;color: #898989;line-height: 60px;text-align: center;}
			}
			li+li{border-left:2px solid #E1E1E1;}
		}
		.newsList{height: auto;padding: 30px;background: #fff;margin-bottom: 100px;
			li{height: auto;width: 100%;
				.title{font-weight: bold;color: #1B1B1B;font-size: 35px;height: 50px;line-height: 50px;letter-spacing:10px;}
				.content{height: auto;line-height: 40px;text-indent:50px;color: #535353;font-size: 26px;padding: 10px 0;}
				.time{color: #959595;text-align: right;}
			}
			li+li{border-top:2px dashed #E1E1E1;}
		}
	}
</style>