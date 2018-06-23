<template>
	<div id="userCenter">
		<header>
			用户中心
			<router-link to="/user/safeInfo/safeCenter"><span class="rightIcon"></span></router-link>
		</header>
		<div class="userContent">
			<div class="title">
				<div class="left" @click="changePage('0')"><span :class="userStr==0?'cur':''">个人中心</span></div>
				<i></i>
				<div class="right" @click="changePage('1')"><span :class="userStr==1?'cur':''">企业中心</span></div>
			</div>
		</div>
		<div :class="['content',userStr==0?'show':'hide']">
			<div class="personInfo">
				<div class="left">
					<div class="imgbox">
						<div class="imgContainer">
							<input type="file" accept="image/*"  @change="postImg($event,'user')" class="file"/>
							<input type="hidden"/>		
							<img :src="$ips+'/downloadData/img?filePath='+userData.substation_img"/>
						</div>
					</div>
				</div>
				<div class="right">
					<div class="title" v-text="userData.substation_name"></div>
					<div v-text="'联系方式：'+userData.substation_phone"></div>
					<div>邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱：{{userData.substation_email==null||userData.substation_email==''?'未绑定':userData.substation_email}}</div>
					<div>账户类型：{{userData.substation_type==1?'个人会员':'企业会员'}}</div>
				</div>
			</div>

			<ul class="personList">
				<li v-for="data in personData">
					<router-link :to="data.myLink">
						<span :class="['left',data.myClass]"></span>{{data.title}}<span class="right"></span>
					</router-link>
				</li>
			</ul>

			
		</div>
		<div :class="['content',userStr==1?'show':'hide']">
			<div class="comInfo">
				<div class="left">
					<div class="imgbox">
						<div class="imgContainer">
							<input type="file" accept="image/*"  @change="postImg($event,'companyhead')" class="file"/>
							<input type="hidden"/>		
							<img :src="$ips+'/downloadData/img?filePath='+com_data.company_head_img"/>
						</div>
					</div>
				</div>
				<div class="right">
					<div class="title" v-text="com_data.company_name"></div>
					<div class="text">{{com_data.company_nature_name}}<span>|</span>{{com_data.company_staff_number_name}}<span>|</span>{{com_data.company_scope}}</div>
				</div>
			</div>

			<ul class="personList">
				<li v-for="data in comData">
					<router-link :to="data.myLink">
						<span :class="['left',data.myClass]"></span>{{data.title}}<span class="right"></span>
					</router-link>
				</li>
			</ul>
		</div>
		<myFoot :num="3"></myFoot>
	</div>
</template>

<script>
	import { MessageBox,Toast } from 'mint-ui';
	import myFoot from './../footer.vue';
	export default { 
  		name: 'userCenter',
  		data(){
  			return{
  				personData:[
  					{myClass:'per_infoShow',title:'个人信息',myLink:'/user/per_infoShow/per_infoShow'},
  					{myClass:'resumeCenter',title:'简历中心',myLink:'/user/per_resume/resumeCenter'},
  					{myClass:'myApply',title:'我的申请',myLink:'/user/per_apply/per_applyCenter'},
  					{myClass:'myCollect',title:'职位收藏',myLink:'/user/per_collect/per_collectCenter'},
  					{myClass:'lookMe',title:'谁看过我',myLink:'/user/per_lookMe/per_lookMeCenter'},
  					{myClass:'recommonJob',title:'推荐职位',myLink:'/user/per_recomJob/per_recomJob'},
  					{myClass:'interviewInvate',title:'面试邀请',myLink:'/user/per_invate/perInvateCenter'},
  					{myClass:'com_reg',title:'企业认证',myLink:'/user/per_registerCom/per_regCenter'}
  				],//总页面数居
  				comData:[
  					{myClass:'com_info',title:'企业信息',myLink:'/user/com_infoShow/comInfoShow'},
  					{myClass:'recruitCenter',title:'招聘中心',myLink:'com_recruit/recruitCenter'},
  					{myClass:'getResume',title:'收到简历',myLink:'/user/com_getResume/com_getResumeCenter'},
  					{myClass:'recommonTalent',title:'推荐人才',myLink:'/user/com_recomTalent/com_recomTalent'},
  					{myClass:'resumeCollect',title:'简历收藏',myLink:'/user/com_collect/com_collectCenter'},
  					{myClass:'onlineReserve',title:'在线预订',myLink:'/user/com_onlineReserve/com_onlineReserve'}
  				],
  				userData:{},
  				com_data:{},//公司信息
  				userStr:''//判断是在个人中心还是企业中心
  			}
  		},
  		components:{myFoot},
  		created(){
  			this.userStr = localStorage.userCenter || 0;
  			localStorage.removeItem('isPerson');
  			console.log(this.$router.history,'this.$router.history,');
  			this.myfun.getAxios({path:'/app/personalInformation'},res=>{
  				this.userData = res.content.substationLogin;
  				if(this.userData.substation_type!=1){
  					this.myfun.getAxios({path:'/app/com_information'},result=>{
						this.com_data = result.content.companyView;
						this.com_data.company_scope = this.com_data.company_scope?this.myfun.changeString(this.com_data.company_scope):'';
					})
  				}
			});
			
  		},
  		methods: {
 			changePage:function(val){
 				if(val=='1' && this.userData.substation_type==1){
 					return	MessageBox.confirm('您还不是企业账号！点击确定跳转企业认证！','提示').then(()=>{
  						this.$router.push({path:'/user/per_registerCom/per_regCenter'});
  					});
 				}
 				localStorage.userCenter = val;
 				this.userStr=val;
 			},
 			//提交图片
 			postImg(event,val){
 				var hasFiles = event.target.files[0];
				let name = hasFiles.name;
				let type = hasFiles.type;
				this.myfun.selectFileImage(hasFiles,res=>{
   					var _formData = new FormData();
   					var myImg = this.myfun.Base64ToFlie(res, type);
   					_formData.append('file',myImg,name);
	 				_formData.append('imgType',val);
	 				this.myfun.post_imgAxios({path:'/app/uploadImg'},_formData,result=>{
	 					if(val=='user'){
	 						this.userData.substation_img = result.content;
	 					}else if(val=='companyhead'){
	 						this.com_data.company_head_img = result.content;
	 					}
	 					Toast(result.msg);
	 				});
   				});
 			}
		}
	}

</script>

<style lang="less" scoped="scoped">
	header .rightIcon{height: 40px;width: 36px;display: block;background:url(../../assets/image/headerIcon.png);background-size:100% 100%;position: absolute;left: auto;right: 20px;top: 25px;}
	.userContent{background: #fff;height: auto;
		.title{height: 90px;display:flex;border-bottom:1px solid #e1e1e1;
			.left,.right{flex: 1;text-align: center;}
			i{font-style: normal;display: block;height: 50px;margin-top: 20px;background: #e1e1e1;width: 1px;}
			span{display: inline-block;padding: 0 20px;border-bottom: 6px solid transparent;height: 84px;line-height: 90px;font-size: 35px;color: #ccc;}
			span.cur{border-color: #FF6000;color: #333333;}
		}
		
	}
	.show{display: block;}
	.hide{display: none;}
	.content{height: auto;padding-bottom: 50px;
		.personInfo,.comInfo{height: 250px;background: #fff;box-shadow: 5px 5px 30px #ccc;width: 100%;padding: 30px;display: flex;margin-bottom:40px;
			.left{flex: 3;height: 100%;
				.imgbox{
					padding:20px 0;background: #fff;margin:5px 0;
					.imgContainer{width: 150px;height: 150px;margin: 0 auto;position: relative;
						input.file{position: absolute;opacity: 0;width: 100%;height: 100%;top: 0px;left: 0px;}
						img{width: 100%;height: 100%;}
					}
					
				}
			}
			.right{flex: 8;
				div.title{font-size: 35px;color: #404040;margin-bottom: 20px;}
				div{margin-bottom: 8px;}
			}
		
		}
		.personList{background: #fff;padding: 0 30px;
			#mySpan(){
				background-size:100% 100%;
			}
			li+li{border-top: 2px solid #E1E1E1;}
			li{height: 90px;width: 100%;line-height: 90px;font-size: 35px;
				a{width: 100%;display: block;height: 100%;}
				span.left{float: left;#mySpan;margin-right: 20px;display: block;width: 31px;}
				span.right{width: 17px;height: 30px;background-image:url(../../assets/image/linkRight_col.png) ;display: block;#mySpan;float: right;margin: 30px 0;}
				&:active{background: #e1e1e1;}
				span.resumeCenter{height: 37px;background-image:url(../../assets/image/resumeCenter.png);margin-top: 26px;}
				span.myApply{height: 31px;background-image:url(../../assets/image/myApply.png);margin-top: 28px;}
				span.myCollect{height: 30px;background-image:url(../../assets/image/myCollect.png);margin-top: 30px;}
				span.lookMe{height: 35px;background-image:url(../../assets/image/lookMe.png);margin-top: 27px;}
				span.recommonJob{height: 29px;background-image:url(../../assets/image/recommonJob.png);margin-top: 28px;}
				span.interviewInvate{height: 37px;background-image:url(../../assets/image/interviewInvate.png);margin-top: 26px;}
				span.com_reg{height: 27px;background-image:url(../../assets/image/com_reg.png);margin-top:31px;}
				span.com_info{height: 27px;background-image:url(../../assets/image/com_info.png);margin-top:31px;}
				span.recruitCenter{height: 31px;background-image:url(../../assets/image/recruitCenter.png);margin-top:29px;}
				span.getResume{height: 31px;background-image:url(../../assets/image/getResume.png);margin-top:29px;}
				span.recommonTalent{height: 24px;background-image:url(../../assets/image/recommonTalent.png);margin-top:33px;}
				span.resumeCollect{height: 26px;background-image:url(../../assets/image/resumeCollect.png);margin-top:32px;}
				span.per_infoShow{height: 31px;background-image:url(../../assets/image/per_infoShow.png);margin-top:28px;}
				span.onlineReserve{height: 31px;background-image:url(../../assets/image/onlineReserve.png);margin-top:28px;}
				
				
			}
		}
		.comInfo .left img{margin-top: 20px;}
		.comInfo .right{
			.title{margin-top: 50px;}
			span{margin: 0px 10px;color: #898989;font-size: 24px;}
			.text{color: #898989;font-size: 24px;}
		}
	}
</style>