<template>
	<div id="myResumeDetail">
		<header>
			<span class="left" @click="$router.back(-1)"></span>
			简历详情
		</header>
		
		
		<div class="resumeDetailBox">
			<div class="title"><i class="baseInfo"></i>基本信息：<span class="sliderBtn" data-bool="0"></span></div>
			<div class="sliderBox">
				<div class="baseInfoBox">
					<div class="left">
						<div>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：{{baseInfo.resume_name}}</div>
						<div>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：{{baseInfo.resume_sex==1?'男':'女'}}</div>
						<div>出生日期：{{baseInfo.resume_birthday}}</div>
						<div>工作年龄：{{baseInfo.resume_service_name}}</div>
					</div>
					<div class="right">
						<img :src="$ips+'/downloadData/img?filePath='+baseInfo.resume_img"/>
					</div>
					<ul class="text">
						<li>学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;历：{{baseInfo.resume_education_name}}</li>
						<li>身高(cm)：{{baseInfo.resume_height}}cm</li>
						<li>手&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机：{{baseInfo.resume_phone}}</li>
						<li>婚&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;姻：{{baseInfo.resume_marital_status}}</li>
						<li class="lineBroke">民&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;族：{{baseInfo.resume_nation}}</li>
						<li>视&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;力：{{baseInfo.resume_vision}}</li>
						<div>身份证号：{{baseInfo.resume_idcard_number}}</div>
						<div>邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱：{{baseInfo.resume_email}}</div>
						<div>现居住地：{{baseInfo.resume_place_name}}</div>
						<div>户&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;口：{{baseInfo.resume_native_name}}</div>
					</ul>
				</div>
			</div>
		</div>
		
		<div class="resumeDetailBox">
			<div class="title"><i class="jobNeed"></i>求职意向：<span class="sliderBtn" data-bool="0"></span></div>
			<div class="sliderBox">
				<ul class="content">
					<li>寻求职位：{{baseInfo.resume_position_name}}</li>
					<li>工资待遇：{{baseInfo.resume_salary_name}}</li>
					<li>工作地区：{{baseInfo.resume_workplace_name}}</li>
				</ul>
			</div>
		</div>
		
		
		<div class="resumeDetailBox">
			<div class="title"><i class="jobEXP"></i>工作经验：<span class="sliderBtn" data-bool="0"></span></div>
			<div class="sliderBox">
				<ul class="listBox">
					<li v-for="data in workInfo">
						<div class="headerTitle"><span></span>{{data.company_name}}</div>
						<p class="headerDetail">{{data.position_name}}<span>|</span>{{data.wages}}元</p>
						<div class="workTitle">工作描述:</div>
						<p class="workDetail" v-text="data.work_content"></p>
					</li>
				</ul>
			</div>
		</div>
		<div class="resumeDetailBox">
			<div class="title"><i class="eduEXP"></i>教育经历：<span class="sliderBtn" data-bool="0"></span></div>
			<div class="sliderBox">
				<ul class="listBox">
					<li v-for="data in educationInfo">
						<div class="headerTitle"><span></span>{{data.school_name}}({{data.education_start}} 到 {{data.education_end}})</div>
						<p class="headerDetail">{{data.major}}</p>
					</li>
				</ul>
			</div>
		</div>
		<div class="resumeDetailBox" style="margin-bottom: 1.3rem;">
			<div class="title"><i class="myEvaluate"></i>自我评价：<span class="sliderBtn" data-bool="0"></span></div>
			<div class="sliderBox">
				<ul class="content">
					{{baseInfo.resume_evaluate}}
				</ul>
			</div>
		</div>
		
		<div class="resumeBtn_box" v-if="!applyId">
			<button class="btn" @click="collect"><span></span>{{isCollect?'取消收藏':'收藏'}}</button>
			<button class="btn" @click="invate"><span></span>邀面试</button>
		</div>
		<div :class="['alertContainer',alertShow?'show':'hide']">
			<h3>邀面试</h3>
			<div class="alertContent">
				<p>选择职位：</p>
				<select class="resumeSelect">
					<option :value="data.id" v-for="data in recruitList" v-text="data.recruit_title"></option>
				</select>
			</div>
				<div class="btnBox">
					<button type="button" class="btn" @click="sure">确定</button>
					<button type="button" class="btn" @click="close">关闭</button>					
				</div>
		</div>
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	export default{
		name:'myResumeDetail',
		data(){
			return{
				collectId:'',// collecting?has id
				personId:'',
				baseInfo:{},//基本信息
				workInfo:[],//工作经验
				educationInfo:[],//教育经验
				isCollect:false,
				alertShow:false,
				recruitList:[],
				isComReset:false,
				isLogin:'',
				applyId:''
			}
		},
		created(){
			this.personId = this.$route.query.id;
			this.applyId = this.$route.query.applyId;
			this.mySlider();
			let obj=null;
			this.applyId?obj = {path:'/app/resumeInfoShow/'+this.personId+'-'+this.applyId}:obj = {path:'/app/resumeInfoShow/'+this.personId};
			this.myfun.getAxios(obj,res=>{
				console.log(res);
				
				this.isComReset = res.content.isCompany;
				this.isLogin = res.content.sign;
				
				if(res.content.companyCollection==null){
					this.isCollect = false;
				}else{
					this.isCollect = true;
					this.collectId = res.content.companyCollection.id;
				}
				this.recruitList = res.content.recruitInfoList;
				this.baseInfo = res.content.resumeInfo;
				this.baseInfo.resume_native_name = this.baseInfo.resume_native_name!=null?this.myfun.changeAddr(this.baseInfo.resume_native_name):'';
				
				this.baseInfo.resume_place_name = this.baseInfo.resume_place_name!=null?this.myfun.changeAddr(this.baseInfo.resume_place_name):'';
				this.baseInfo.resume_workplace_name = this.baseInfo.resume_workplace_name!=null?this.myfun.changeAddr(this.baseInfo.resume_workplace_name):'';
				this.workInfo = res.content.workInfoList;
				this.educationInfo = res.content.educationInfoList;
				switch (this.baseInfo.resume_marital_status){
					case 1:this.baseInfo.resume_marital_status = '未婚'
						break;
					case 2:this.baseInfo.resume_marital_status = '已婚'
						break;
					case 3:this.baseInfo.resume_marital_status = '离异'
						break;	
					default:
						break;
				}
			})
		},
		methods:{
			mySlider:function(){
				console.log(1111);
				setTimeout(function(){
					$('.sliderBtn').on('click',function(){
						console.log(1111);
						if($(this).attr('data-bool')==0){
							$(this).attr('data-bool',1).css('transform','rotateZ(180deg)');
							$(this).parents('.resumeDetailBox').children('.sliderBox').slideToggle(300);
						}else{
							$(this).attr('data-bool',0).css('transform','rotateZ(0deg)');
							$(this).parents('.resumeDetailBox').children('.sliderBox').slideToggle(300);
						}
					})
				})
			},
			collect(){
				if(this.isLogin=='noLogin'){
					return this.myfun.toLogin();
				}
				if(!this.isComReset){
					return MessageBox('提示','你还没有进行企业认证，请先进行企业认证！');
				}
				if(this.isCollect){
					this.myfun.getAxios({path:'/app/companyCollectionSave/'+this.personId+'-'+this.collectId},res=>{
						console.log(res)
						this.isCollect = false;
						return MessageBox('提示',res.msg);
					})
				}else{
					this.myfun.getAxios({path:'/app/companyCollectionSave/'+this.personId},res=>{
						this.myfun.getAxios({path:'/app/resumeInfoShow/'+this.personId},data=>{
							console.log(data);
//							this.collectId = data.content.companyCollection.id;
							this.isCollect = true;
							return MessageBox('提示',res.msg);
						});
					})					
				}
			},
			invate(){
				if(this.isLogin=='noLogin'){
					return this.myfun.toLogin();
				}
				else if(!this.isComReset){
					return MessageBox('提示','你还没有进行企业认证，请先进行企业认证！');
				}
				else if(!this.recruitList.length){
					return MessageBox('提示','你还没有进行职位发布，请先发布职位！');
				}
				$('.blackBox').show();
				this.myfun.bindTouchMove();
				this.alertShow = true;
			},
			sure(){
				var myId = $('.resumeSelect option:selected').val();
				this.close();
				if(!myId){
					return MessageBox('提示','你还没有进行企业认证或者职位未发布，请先完善！')
				}
				this.myfun.getAxios({path:'/app/comCollectionInterview/'+this.personId+'-'+myId},res=>{
					return MessageBox('提示',res.msg);
				});
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
#myResumeDetail{
	.resumeDetailBox{background: #fff;margin-bottom: 30px;height: auto;
		.sliderBox{height: auto;}
		.title{border-bottom: 1px solid #E1E1E1;border-bottom: 2px solid #e6e6e6;height: 90px;font-size: 35px;line-height: 90px;width: 100%;padding: 0 30px;
			span{transition: all 0.3s;margin: 35px 20px;float: right;display: block;width: 40px;height: 20px;background: url(../../../assets/image/up.png);background-size:100% 100%;}
			i{height: 33px;display: inline-block;background-size:100% 100%;margin-right: 20px;position: relative;top:2px;width: 35px;}
			i.baseInfo{background-image:url(../../../assets/image/baseInfo.png);}
			i.jobNeed{background-image:url(../../../assets/image/jobNeed.png);}
			i.jobEXP{background-image:url(../../../assets/image/jobEXP.png);}
			i.eduEXP{background-image:url(../../../assets/image/eduEXP.png);}
			i.myEvaluate{background-image:url(../../../assets/image/myEvaluate.png);}
		}
		#ul(){padding: 20px 30px;height: auto;width: 100%;padding-bottom: 30px;overflow: hidden;}
		ul.text{#ul;
			li{min-width: 50%;float: left;height: 60px;line-height: 60px;text-align: left;}
		}
		ul.list{#ul;
			li{padding: 0 10px;height: 40px;border: 1px solid #FF6000;border-radius:10px;float: left;margin-top: 20px;margin-left:30px;}
			li:nth-child(4n+1){margin-left: 0;}
		}
		ul.content{#ul;
			li{width: 100%;height: 60px;line-height: 60px;}
		}
		ul.listBox{#ul;
			li{
				p{color: #1b1b1b;padding-left:45px;}
				.headerTitle{color: #898989;
					span{display: inline-block;height: 25px;width: 25px;background: url(../../../assets/image/headerTitleIcon.png);background-size:100% 100%;margin-right: 20px;}
				}
				.headerDetail{height: auto;line-height: 60px;
					span{margin: 0 15px;}
				}
				.workTitle{color: #898989;padding-left: 45px;margin-top: 20px;}
			}
		}
		.baseInfoBox{height: auto;background: #fff;width: 100%;padding: 30px;border-bottom: 1px solid #E1E1E1;
			.text{padding: 0!important;position:relative;top:-5px;
				li{width: 65%;min-width: auto;font-size: 25px;height: 50px;line-height: 50px;}
				li:nth-child(2n){width: 35%!important;}
				div{height: auto;font-size: 25px;line-height: 50px;}
			}
			.right{float:right;width: 150px;margin-right: 100px;
				img{width: 100%;}
			}
			.left{float: left;
				div{margin-bottom: 10px;font-size: 25px;span{margin: 0 20px;font-size: 25px;}}
			}
		}
	}
	.resumeBtn_box{height: 110px;width: 100%;background: #fff;display: flex;position: fixed;bottom: 0;padding: 0 30px;border-top:2px solid #E1E1E1;padding-top: 10px;
		.btn{display: block;flex: 1;border:2px solid #ff6000;margin: 0;outline: none;font-size:28px;
			span{display: inline-block;height: 28px;width: 30px;background-image:url(../../../assets/image/collectBtn.png);background-size:100% 100%;margin-right: 10px;position: relative;top: 2px;}
		}
		button.btn+button.btn{margin-left: 100px;
			span{background-image:url(../../../assets/image/applyBtn.png);}
		}
		button.btn:nth-child(1){background: transparent;color: #FF6000;
			&:active{background: #f7b48c;}		
		}
	}
	.alertContainer{border-radius:15px;padding-bottom:30px;min-height: 300px;width: 500px;background: #fff;z-index: 10000;position: fixed;left: calc(50% - 250px);justify-content: center;top: calc(50% - 150px);
		h3{height: 90px;line-height: 90px;border-bottom: 1px solid #E1E1E1;color: #FF6000;text-align: center;}
		.alertContent{
			display: flex;height: 100px;padding: 20px;
			p{flex: 3;line-height: 70px;}
			select{flex: 5;border: 2px solid #e1e1e1;}
		}
		.btnBox{text-align: center;margin-top: 15px;
			.btn{display: inline-block;margin: 0;width: 40%;border: none;height: 60px;line-height: 60px;}
		}
	}
}
</style>