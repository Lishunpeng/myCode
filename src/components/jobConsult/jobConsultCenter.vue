<template>
	<div id="jobConsult">
		<header>就业资讯</header>
		<ul class="nav">
			<li @click="changeLi(0,'newsInformation','newsCenter')"><p :class="liVal==0?'cur':''">新闻资讯</p></li>
			<li @click="changeLi(1,'announcement','newsCenter')"><p :class="liVal==1?'cur':''">通知公告</p></li>
			<li class="moreNav" @click="showNav($event)"><p :class="liVal==2?'cur':''">政策法规</p><span :class="isClick?'cur':''"></span>
				<div :class="['hideBox',isClick?'show':'hide']" @click="removeClick($event)">
					<div @click="changeLi(2,'nationalPolicyDocuments','policiesRegulations')">国家政策文件</div>
					<div @click="changeLi(2,'provincialPolicyDocuments','policiesRegulations')">省级政策文件</div>
					<div @click="changeLi(2,'localPolicyDocuments','policiesRegulations')">本地政策文件</div>
				</div>
				
			</li>
		</ul>
		<div class="mySwipeBox">
			<mt-swipe :auto="4000">
				<mt-swipe-item v-for="data in newsBanner">
					<div class="bannerBox">
						<router-link :to="{path:'newsShow',query:{id:data.id}}">
							<img :src="$ips+'/downloadData/img?filePath='+data.news_img"/>
							<p class="lineBroke" v-text="data.news_title"></p>
						</router-link>
					</div>
				</mt-swipe-item>
			</mt-swipe>
		</div>
		<mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
			<ul class="newsList">
				<li v-for="data in newsPage">
					<router-link :to="{path:'newsShow',query:{id:data.id}}">
						<p class="title lineBroke" v-text="data.news_title"></p>
						<p class="content" v-text="data.news_abstract+'...'"></p>
						<p class="time" v-text="data.news_publish_time"></p>
					</router-link>
				</li>
				
			</ul>
		</mt-loadmore>
		<myFoot :num="2"></myFoot>
	</div>
</template>

<script>
	import { Swipe, SwipeItem } from 'mint-ui';
	import myFoot from './../footer.vue';
	export default{
		name:'jobConsult',
		components:{myFoot},
		data(){
			return{
				liVal:0,//默认为新闻列表
				isClick:false,
				page:1,
  				allLoaded:false,
  				newsPage:[],//获取新闻信息
  				newsBanner:[],//banner图
  				listType:'newsInformation',
  				listContTytpe:'newsCenter'//默认为新闻列表
			}
		},
		created(){
			localStorage.removeItem('userCenter');
			this.myfun.getAxios({path:'/app/newsShuffling'},res=>{
				this.newsBanner = res.content.newsShuffling;
				this.myfun.getData(this,'newsPage','/app/newsCenter/'+this.page+'-'+this.listType+'-'+this.listContTytpe,['newsPage','list']);
			})
			this.$nextTick(()=>{
				var _that = this;
				$(document).on('click',()=>{
					_that.isClick = false;
				})
			})
		},
		methods:{
			showNav(e){
				var oEvent = window.event || e;
				oEvent.cancelBubble = true;
				this.isClick = this.isClick?false:true;
			},
			removeClick(e){
				this.myfun.returnBubble(e);
			},
			loadBottom() {
				this.page++;
				this.myfun.getData(this,'newsPage','/app/newsCenter/'+this.page+'-'+this.listType+'-'+this.listContTytpe,['newsPage','list']);
			},
			//改变Li
			changeLi(val,liType,liContType){
				if(this.liVal==val && val !=2){
					return;
				}else{
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
	#jobConsult{height:auto;overflow: hidden;
		.show{display: block!important;}
		.hide{display: none!important;}
		.mySwipeBox{height: 524px;background: #ccc;width: auto;position:relative;width: 100%;margin-top: 90px;
			.bannerBox{width: 100%;height: auto;
				img{width: 100%;}
				p{height: 80px;width: 100%;position: absolute;left: 0;bottom: 0;background: rgba(0,0,0,.4);padding: 0 100px 0 30px;text-align: left;color: #fff;font-size: 32px;line-height: 80px;}
			}
		}
		.nav{height: 80px;width: 100%;padding: 10px 0;display: flex;background:#fff;position: fixed;left: 0;top: 90px;z-index: 100;
			li{flex: 1;padding: 0 20px;
				p.cur{border-bottom: 5px solid #FF6000;color: #1B1B1B;}
				p{border-bottom: 5px solid transparent;color: #898989;line-height: 60px;text-align: center;}
			}
			li+li{border-left:2px solid #E1E1E1;}
			.moreNav{position: relative;
				.hideBox{display: none;position: absolute;width: 100%;height: auto;background:#fff;top: 70px;z-index:100;left:0;padding:0 20px;
					div{height: 80px;width: 100%;border-top:2px solid #E1E1E1;text-align: center;line-height: 80px;font-size: 26px;color: #898989;
						&:active{background: #f1f1f1;}
					}
				}
				span{transition: all 0.2s linear;position: absolute;display: block;width: 20px;height:10px;background: url(../../assets/image/zcfg.png);background-size:100% 100%;top: calc(50% - 7.5px);left: auto;right: 30px;}
				span.cur{transform: rotateZ(180deg);}
			}
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