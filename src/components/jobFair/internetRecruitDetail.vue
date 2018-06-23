<template>
	<div id="int_recruitDetail">
		<header><span class="left"  @click="$router.back(-1)"></span>招聘详情</header>
		<div class="myHeader">
			<p class="title" v-text="jobFair.job_fair_title"></p>
			<p class="time">招聘时间：<span>{{jobFair.job_fair_start}}到{{jobFair.job_fair_end}}</span></p>
			<p class="content" v-html="jobFair.news_content"></p>
			<div class="mybtn" v-if="getType==0 && !isJoin"><button @click="participate">点击参与</button></div>
			<!--<div class="mybtn" v-else-if="getType==1 && !isJoin"><button class="isPass">未开始</button></div>-->
			<!--<div class="mybtn" v-else-if="getType==2 && !isJoin"><button class="isPass">已结束</button></div>-->
			<!--<div class="mybtn" v-else-if="isJoin"><button class="isPass">已参加</button></div>-->
		</div>
		<div class="myContent" v-for="data in recruitJobFair">
			<router-link :to="{path:'jf_comInfoShow',query:{comId:data.company_id,jfId:getId}}">
				<div class="left">
					<p class="title lineBroke" v-text="data.company_name"></p>
					<p class="content" v-text="data.recruit_title"></p>
				</div>
				<div class="right">
					<span class="linkRight"></span>
				</div>
			</router-link>
		</div>
		<div :class="['alertContainer',alertShow?'show':'hide']">
			<h3>选择参会的招聘职位</h3>
			<div class="alertContent">
				<p>选择职位：</p>
				<ul class="listBox">
					<li v-for="(data,index) in myJob" v-text="data.recruit_title" @click="chooseLi(index)" :class="data.ischoose?'active':''"></li>
				</ul>
			</div>
				<div class="btnBox">
					<button type="button" class="btn" @click="sure">确定</button>
					<button type="button" class="btn" @click="close">关闭</button>					
				</div>
		</div>
	</div>
</template>

<script>
	import { MessageBox,Toast } from 'mint-ui';
	export default{
		name:'int_recruitDetail',
		data(){
			return{
				getId:'',//获取ID
				jobFair:'',
				recruitJobFair:[],
				getType:'',
				alertShow:false,
				myJob:[],
				isJoin:false
			}
		},
		created(){
			this.getId = this.$route.query.id;
			this.getType = this.$route.query.type;
			this.myfun.getAxios({path:'/app/internetRecruitment/'+this.getId},res=>{
				this.jobFair = res.content.jobFair;
				var getTimeEnd = Date.parse(new Date(this.jobFair.job_fair_end.replace(/-/g, '/')));
				var getTimeStart = Date.parse(new Date(this.jobFair.job_fair_start.replace(/-/g, '/')));
				this.jobFair.job_fair_end = this.myfun.timestampToTime(getTimeEnd);
				this.jobFair.job_fair_start = this.myfun.timestampToTime(getTimeStart);
				this.recruitJobFair = res.content.recruitJobFairList;
				this.isJoin = res.content.isJoin;
				console.log(res);
			});
		},
		methods:{
			participate(){
				this.myfun.getAxios({path:'/app/joinJobFairForm/'+this.getId},res=>{
					$('.blackBox').show();
					this.myfun.bindTouchMove();
					for (let i in res.content.recruitInfoList) {
						res.content.recruitInfoList[i].ischoose = false;
					}
					this.myJob = res.content.recruitInfoList;
					console.log(res);
					this.alertShow = true;
				})
				
			},
			sure(){
				var postData = '';
				for(let i in this.myJob){
					if(this.myJob[i].ischoose){
						postData+='joinJobFair='+this.myJob[i].id+'&';
					}
				}	
				this.close();
				if(!postData){
					return Toast('至少选择一个职位');
				}
				this.myfun.postAxios({path:'/app/joinJobFairSave/'+this.getId,isUnchangeString:true},postData,res=>{
					this.myfun.getAxios({path:'/app/internetRecruitment/'+this.getId},res=>{
						this.recruitJobFair = res.content.recruitJobFairList;
						this.isJoin = res.content.isJoin;
					});
					Toast(res.msg);
				})
			},
			//选中职位
			chooseLi(val){
				this.myJob[val].ischoose  = this.myJob[val].ischoose?false:true;
			},
			close(){
				this.myfun.unbindTouchMove();
				$('.blackBox').hide();
				this.alertShow = false;
			},
		}
	}
</script>

<style lang="less" scoped="scoped">
	#box(){
		height: auto;width: 100%;background: #fff;padding: 30px;
	}
	.myHeader{#box;
		.title{font-weight: bold;color: #1B1B1B;font-size: 35px;min-height: 50px;line-height: 50px;letter-spacing:10px;}
		.time{color: #404040;padding-bottom: 20px;border-bottom: 1px solid #E1E1E1;margin-top: 20px;span{color:#888888}}
		.mybtn{height: auto;text-align: right;
			button{border:5px solid #FF6000;height: 60px;background: #fff;color: #FF6000;border-radius:60px;width: 200px;text-align: center;font-weight: bold;outline: none;
				&:active{background: #F7B48C;}
			}
			button.isPass{border:5px solid #898989;background: #e1e1e1;color: #898989;
				&:active{background: #e1e1e1;}
			}
		}
		.content{margin: 10px 0;}
	}
	.myContent{#box;margin-top: 10px;height: auto;
		a{display: flex;width: 100%;height: 100%;}
		.left{
			flex: 12;
			.content{margin-top: 10px;line-height: 40px;font-size: 25px;color: #888888;}
		}
		.right{
			flex: 1;position: relative;
			.linkRight{position: absolute;left: calc(50% - 10px);top: calc(50% - 20px);display: block;width: 20px;height: 40px;background: url(../../assets/image/linkRight_col.png) no-repeat center;background-size:100% 100%;}
		}
		
	}
	.alertContainer{border-radius:15px;padding-bottom:30px;min-height: 300px;width: 500px;background: #fff;z-index: 10000;position: fixed;left: calc(50% - 250px);justify-content: center;top: calc(50% - 150px);
		h3{height: 90px;line-height: 90px;border-bottom: 1px solid #E1E1E1;color: #FF6000;text-align: center;}
		.alertContent{
			height: auto;padding: 20px;
			p{line-height: 70px;}
			.listBox{height: auto;margin-bottom: 20px;overflow: hidden;
				li{height: 60px;line-height: 60px;width: auto;padding: 0 15px;border: 2px solid #E0E0E0;color:#898989;float: left;margin-right: 10px;margin-top: 10px;border-radius:10px;min-width: 80px;}
				li.active{color: #FF6000;border-color: #FF6000;}
			}
		}
		.btnBox{text-align: center;margin-top: 15px;
			.btn{display: inline-block;margin: 0;width: 40%;border: none;height: 60px;line-height: 60px;}
		}
	}
	
</style>