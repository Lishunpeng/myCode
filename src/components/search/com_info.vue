<template>
	<div id="com_info">
		<header>
			<span class="left" @click="$router.back(-1)"></span>公司信息
		</header>
		<div class="com_info_box">
			<div class="imgbox">
				<img :src="$ips+'/downloadData/img?filePath='+companyInfo.company_img"/>
			</div>
			<div class="right">
				<div class="title" v-text="companyInfo.company_name"></div>
				<div class="text">{{companyInfo.company_nature_name}}<span>｜</span>{{companyInfo.company_staff_number_name}}<span>|</span>{{companyInfo.company_scope}}</div>
			</div>
			
		</div>
		<div class="com_info_container">
			<div class="title">
				<div class="left" @click="changePage('left')"><span :class="isLeft?'cur':''">公司简介</span></div>
				<div class="right" @click="changePage('right')"><span :class="isLeft?'':'cur'">招聘职位</span></div>
			</div>
			<div :class="['content',isLeft?'show':'hide']" v-text="companyInfo.company_brief_introduction"></div>
		<mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
			<div :class="['content','rightBox',isLeft?'hide':'show']">
				<div class="contList" v-for="data in resumeList">
					<router-link :to="{path:'/user/com_recruit/recruitDetail',query:{id:data.id}}">
						<div class="contListBox">
							<div class="left">
								<div class="title" v-text="data.recruit_title"></div>
								<div class="text">{{data.service_name?data.service_name:'无'}}经验<span>｜</span>{{data.education_name?data.education_name:'无学历要求'}}<span>|</span>招{{data.recruit_count}}人</div>
							</div>
							<div class="right">
								<div class="money" v-text="data.salary_name"></div>
								<div class="time" v-text="data.recruit_release_date"></div>
							</div>
						</div>
					</router-link>
				</div>
			</div>
		</mt-loadmore>
			
		</div>
	</div>
</template>

<script>
	import { Loadmore } from 'mint-ui';
	export default { 
  		name: 'login',
  		data(){
  			return{
  				isLeft:false,//左边页面
  				page:1,
  				getComId:'',//获取地址栏信息
  				companyInfo:{},
  				resumeList:[],
  				allLoaded:false
  			}
  		},
  		created(){
  			this.getComId = this.$route.query.comId;
  			this.myfun.getAxios({path:'/app/companyShow/'+this.page+'-'+this.getComId},res=>{
  				this.companyInfo = res.content.companyView;
  				this.companyInfo.company_scope = this.myfun.changeAddr(this.companyInfo.company_scope);
  				this.resumeList = res.content.queryRecruitInfoViewPage.list;
  				console.log(res);
  			})
  		},
 		methods: {
 			changePage:function(val){
 				val=='left'?this.isLeft=true:this.isLeft=false;
 			},
 			loadBottom() {
				this.page++;
				this.myfun.getData(this,'resumeList','/app/companyShow/'+this.page+'-'+this.getComId,['queryRecruitInfoViewPage','list']);
			}
		}
}
</script>

<style lang="less" scoped="scoped">
	.com_info_box{
		.imgbox{
			border: 1px solid #E1E1E1;
			flex: 1;
			min-height:180px;
			img{width: 100%;}
		}
		.right{
			flex: 3;margin-left: 20px;
			.title{font-weight: bold;font-size: 35px;min-height:80px;line-height: 40px;}
			.text{height: 57px;margin-top: 20px;
				span{margin: 0 15px;}
			}
		}
		height: auto;background: #fff;padding: 20px 30px;margin-bottom: 30px;display:flex;
		
	}
	.com_info_container{height: auto;background: #fff;
		.title{height: 90px;display:flex;border-bottom:2px solid #ccc;
			.left,.right{flex: 1;text-align: center;}
			span{display: inline-block;padding: 0 20px;border-bottom: 6px solid transparent;height: 84px;line-height: 90px;font-size: 35px;color: #ccc;}
			span.cur{border-color: #FF6000;color: #333333;}
		}
		.show{display: block;}
		.hide{display: none;}
		.content{height: auto;padding:30px;padding-bottom: 50px;min-height: 900px;}
		.rightBox{
			padding-top: 0;
			padding-bottom: 30px;
			.contList{border-bottom: 1px solid #ccc;width: 100%;height: 122px;}
			.contListBox{display: flex;}
			.left{flex: 7;
				.title{font-weight: bold;font-size: 28px;height: 65px;line-height: 65px;border-bottom: 0;}
				.text{height: 57px;font-size: 24px;
					span{margin: 0 15px;}
				}
			}
			.right{flex: 3;
				.money{font-size: 28px;height: 65px;line-height: 65px;border-bottom: 0;color: #FF6000;text-align: right;}
				.time{height: 57px;text-align: right;font-size: 24px;}
			}
		}
	}
</style>