<template>
	<div id="recruitDetail">
		<header>
			<span class="left" @click="$router.back(-1)"></span>
			职位详情
		</header>
		<div class="header">
			<div v-if="isDownRecruit">
				<p class="title" v-text="companyData.recruit_title"></p>
				<p v-text="companyData.company_name_xx"></p>
			</div>
			<router-link :to="{path:'/search/com_info',query:{comId:companyData.company_id}}" v-else>
				<p class="title" v-text="companyData.recruit_title"></p>
				<p v-text="companyData.company_name"></p>
				<p>{{companyData.company_nature_name}}<span>|</span>{{companyData.company_staff_number_name}}<span>|</span>{{companyData.company_scope}}</p>					
				<i></i>
			</router-link>
		</div>
		
		<div class="resumeDetailBox">
			<div class="title"><i class="baseInfo"></i>职位简介：<span class="sliderBtn" data-bool="0"></span></div>
			<div class="sliderBox">
				<div class="baseInfoBox">
					<ul class="text">
						<li class="lineBroke">职业名称：{{companyData.recruit_title}}</li>
						<li class="lineBroke">所属行业：{{companyData.position_name}}</li>
						<li>性别要求：{{companyData.recruit_sex}}</li>
						<li>招聘人数： {{companyData.recruit_count}}人</li>
						<li>工资待遇：{{companyData.salary_name}}</li>
						<li>语言要求：{{companyData.language_name==null||companyData.language_name==''?'不限':companyData.language_name}}</li>
						<li>工作年龄：{{companyData.service_name==null||companyData.service_name==''?'不限':companyData.service_name}}</li>
						<li>户籍要求：{{companyData.registered_residence_name==null||companyData.registered_residence_name==''?'不限':companyData.registered_residence_name==null}}</li>
						<li class="lineBroke">工作地点：{{companyData.workplace_name}}</li>
						<li>所属部门：{{companyData.recruit_department}}</li>
						<li>工作性质：{{companyData.working_form_name==null||companyData.working_form_name==''?'不限':companyData.working_form_name}}</li>
						<li>发布时间：{{companyData.recruit_release_date}}</li>
						<li>学历要求：{{companyData.education_name==null||companyData.education_name==''?'不限':companyData.education_name}}</li>
						<li>有效时间：{{companyData.recruit_valid_date}}</li>
					</ul>
				</div>
			</div>
		</div>
		
		<div class="welfareInfo resumeDetailBox">
			<div class="title"><i class="welfare"></i>福利待遇：<span class="sliderBtn" data-bool="0"></span></div>
			<div class="sliderBox">
				<ul class="welfareList">
					<li v-for="data in companyData.recruit_welfare" v-text="data"></li>
				</ul>
			</div>
		</div>
		
		
		
		<div class="resumeDetailBox">
			<div class="title"><i class="recruitDetail"></i>职业描述：<span class="sliderBtn" data-bool="0"></span></div>
			<div class="sliderBox">
				<ul class="content">
					<pre class="preBox">{{companyData.recruit_job_description}}</pre>
				</ul>
			</div>
		</div>
		<div class="resumeDetailBox">
			<div class="title"><i class="linkUs"></i>联系我们：<span class="sliderBtn" data-bool="0"></span></div>
			<div class="sliderBox">
				<ul class="content">
					<li>联系人：{{companyData.recruit_contact}}</li>
					<li>联系人职务：{{companyData.recruit_contact_position}}</li>
					<li>固定电话：{{companyData.recruit_contact_telephone?companyData.recruit_contact_telephone:'无'}}</li>
					<li>联系地址：{{companyData.recruit_contact_address}}</li>
					<li>邮政编码：{{companyData.recruit_contact_zip_code}}</li>
					<li>邮箱：{{companyData.recruit_email}}</li>
					<li>移动电话：{{companyData.recruit_contact_mobile_phone}}</li>
					<li>公司主页：{{companyData.recruit_company_official_website}}</li>
				</ul>
			</div>
		</div>
		<div class="resumeDetailBox" style="margin-bottom: 1.3rem;">
			<div class="title"><i class="comInfo"></i>公司信息：<span class="sliderBtn" data-bool="0"></span></div>
			<div class="sliderBox">
				<ul class="content">
					<div v-text="isDownRecruit?companyData.company_brief_introduction_xx:companyData.company_brief_introduction"></div>
				</ul>
			</div>
		</div>
		<div class="resumeBtn_box">
			<button class="btn" @click="collect"><span></span>{{isCollect?'取消收藏':'收藏'}}</button>
			<button :class="['btn',isDownRecruit?'disable':'']" @click="applyRecruit" :disabled="isDownRecruit?'disable':false"><span></span>申请</button>
		</div>

		<div :class="['alertContainer',alertShow?'show':'hide']">
			<h3>简历</h3>
			<div class="alertContent">
				<p>选择简历：</p>
				<select class="resumeSelect">
					<option :value="data.id" v-for="data in resumeList" v-text="data.resume_title"></option>
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
	import {MessageBox} from 'mint-ui';
	export default{
		name:'recruitDetail',
		data(){
			return{
				alertShow:false,
				companyId:'',
				companyData:{},
				resumeList:[],
				isCollect:false,//是否收藏了
				collectId:'',//collecting?id:''
				isLogin:'',
				isDownRecruit:false
			}
		},
		created(){
			this.mySlider();
			this.companyId = this.$route.query.id;
			this.myfun.getAxios({path:'/app/recruitInfoShow/'+this.companyId},res=>{
				console.log(res.content);
				this.isLogin = res.content.sign;
				this.companyData = res.content.queryRecruitInfoView;
				this.isDownRecruit = !this.companyData.substation_login_id || this.companyData.substation_login_id == 1?true:false;
				if(res.content.personalCollection==null){
					this.isCollect = false;
				}else{
					this.collectId = res.content.personalCollection.id;
					this.isCollect = true;
				}
				this.companyData.company_scope = this.myfun.changeString(this.companyData.company_scope);
				this.companyData.workplace_name = this.myfun.changeAddr(this.companyData.workplace_name);
				this.resumeList = res.content.resumeInfoList || [];
				this.companyData.recruit_welfare = this.companyData.recruit_welfare?this.myfun.welfareStr(this.companyData.recruit_welfare):'';
				
				switch (this.companyData.recruit_sex){
					case '':;
					case null:this.companyData.recruit_sex='不限';
						break;
					case 1:	this.companyData.recruit_sex='男';
						break;
					case 2:	this.companyData.recruit_sex='女';
						break;
					default:
						break;
				}
			})
		},
		methods:{
			mySlider(){
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
			applyRecruit(){
				if(this.isLogin=='noLogin'){
					return this.myfun.toLogin();
				}
				else if(!this.resumeList.length){
					return MessageBox('提示','你还没有发布简历，请先发布简历！');
				}
				$('.blackBox').show();
				this.alertShow = true;
				this.myfun.bindTouchMove();
			},
			sure(){
				var myId = $('.resumeSelect option:selected').val();
				this.close();
				if(!myId){
					return MessageBox('提示','你还没有公开简历，请先公开简历在申请！').then(()=>{
						this.$router.push({path:'/user/per_resume/resumeCenter'});
					});
				}
				this.myfun.getAxios({path:'/app/personalBidSave/'+this.companyId+'-'+myId},res=>{
					return MessageBox('提示',res.msg).then(()=>{
						this.$router.push({path:'/user/per_apply/per_applyCenter'});
					});
				})
				
			},
			close(){
				this.myfun.unbindTouchMove();
				$('.blackBox').hide();
				this.alertShow = false;
			},
			//收藏
			collect(){
				if(this.isLogin=='noLogin'){
					return this.myfun.toLogin();
				}
				if(this.isCollect){
					this.myfun.getAxios({path:'/app/personalCollectionSave/'+this.companyId+'-'+this.collectId},res=>{
						this.isCollect = false;
						return MessageBox('提示',res.msg);
					})
				}else{
					this.myfun.getAxios({path:'/app/personalCollectionSave/'+this.companyId},res=>{
						this.myfun.getAxios({path:'/app/recruitInfoShow/'+this.companyId},data=>{
							this.collectId = data.content.personalCollection.id;
							this.isCollect = true;
							return MessageBox('提示',res.msg);
						});
					})					
				}
			}
		}
	}
	
</script>

<style lang="less" scoped="scoped">
#recruitDetail{
	.preBox{color: #1B1B1B;}
	.header{height: auto;background:#fff;padding: 20px 30px;margin-bottom:30px;position:relative;
		p{height: 50px;line-height: 50px;}
		.title{font-weight: bold;font-size: 35px;}
		span{margin: 0 15px;}
		i{display: block;position: absolute;left: auto;right: 30px;top: calc(50% - 20px);width: 20px;height: 40px;background: url(../../../assets/image/linkRight_col.png);background-size:100% 100%;}
	}
	.welfareInfo{height: auto;background: #fff;overflow: hidden;padding-bottom: 30px;
        	.welfareList{padding: 10px;
        		li{margin-top: 20px;padding: 0 40px;height: 60px;border: 2px solid #ff6000;color: #898989;border-radius:10px;float: left;margin-left: 20px;line-height: 60px;}
        	}
     }
	.resumeDetailBox{background: #fff;margin-bottom: 30px;height: auto;
		.sliderBox{height: auto;}
		.title{border-bottom: 1px solid #E1E1E1;border-bottom: 2px solid #e6e6e6;height: 90px;font-size: 35px;line-height: 90px;width: 100%;padding: 0 30px;
			span{transition: all 0.3s;margin: 35px 20px;float: right;display: block;width: 40px;height: 20px;background: url(../../../assets/image/up.png);background-size:100% 100%;}
			i{height: 33px;display: inline-block;background-size:100% 100%;margin-right: 20px;position: relative;top:2px;width: 35px;}
			i.baseInfo{background-image:url(../../../assets/image/baseInfo.png);}
			i.recruitDetail{background-image:url(../../../assets/image/recruitDetail.png);}
			i.welfare{background-image:url(../../../assets/image/welfare.png);}
			i.comInfo{background-image:url(../../../assets/image/comInfo.png);}
			i.linkUs{background-image:url(../../../assets/image/linkUs.png);}
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
			li{width: 100%;height: auto;line-height: 60px;}
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
				li{width:50%;font-size: 30px;height: 50px;line-height: 50px;}
			}
		}
	}
	.resumeBtn_box{height: 110px;width: 100%;background: #fff;display: flex;position: fixed;bottom: 0;padding: 0 30px;border-top:2px solid #E1E1E1;padding-top: 10px;
		.btn{display: block;flex: 1;border:2px solid #ff6000;margin: 0;outline: none;font-size:28px;
			span{display: inline-block;height: 28px;width: 30px;background-image:url(../../../assets/image/collectBtn.png);background-size:100% 100%;margin-right: 10px;position: relative;top: 2px;}
		}
		.btn.disable{background: #ccc;border: none;}
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