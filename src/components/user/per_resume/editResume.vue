<template>
	<div id="editResume">
		<header>
			<span class="left" @click="$router.back(-1)"></span>
			简历编辑
		</header>
		<ul class="myNav">
			<li :class="isClick==0?'cur':''" @click="changeNav(0)">基本信息</li>
			<li :class="isClick==1?'cur':''" @click="changeNav(1)">求职意向</li>
			<li :class="isClick==2?'cur':''" @click="changeNav(2)">工作经验</li>
			<li :class="isClick==3?'cur':''" @click="changeNav(3)">教育经验</li>
			<li :class="isClick==4?'cur':''" @click="changeNav(4)">自我评价</li>
		</ul>
		<!--简历信息-->
		<div :class="['baseInfo',isClick==0?'show':'hide']">
			<div class="inputBox"><span>简历名称：</span><input type="text" placeholder="请输入简历名称" v-model="resumeInfo.resume_title"/></div>
			<div class="imgbox">
				<div class="imgContainer">
					<input type="file" accept="image/*"  @change="postImg($event)" class="file"/>
					<input type="hidden" placeholder="请输入企业名称"/>		
					<img :src="$ips+'/downloadData/img?filePath='+resumeInfo.resume_img"/>
				</div>
				<p style="color: #ff0000;text-align: center;">点击图片上传图片</p>
			</div>
			<div class="inputBox unChange"><span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</span><p v-text="resumeInfo.resume_name"></p></div>
			<div class="inputBox unChange"><span>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</span><p v-text="resumeInfo.resume_sex==1?'男':'女'"></p></div>
			<div class="inputBox unChange"><span>出生日期：</span><p v-text="resumeInfo.resume_birthday"></p></div>
			<div class="inputBox unChange"><span>户&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;籍：</span><p v-text="resumeInfo.resume_native_name" class="lineBroke"></p></div>
			<div class="inputBox unChange"><span>民&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;族：</span><p v-text="resumeInfo.resume_nation"  class="lineBroke"></p></div>
			<div class="inputBox unChange"><span>身份证号：</span><p v-text="resumeInfo.resume_idcard_number"></p></div>
			<div class="inputBox"><span>现所在地：</span>
				<mt-picker :slots="myAddress" @change="onMyAddressChange" valueKey="address"></mt-picker>
				<input placeholder="请点击选择地址" type="text" readonly="readonly" @click="myshow('#myArea')" v-model="areaString" id="myArea">
			</div>
			<div class="inputBox"><span>手机号码：</span><input type="text" v-model="resumeInfo.resume_phone" placeholder="请输入手机号码"/></div>
			<div class="inputBox"><span>电子邮箱：</span><input type="text" v-model="resumeInfo.resume_email" placeholder="请输入电子邮箱"/></div>
			<div class="inputBox"><span>经&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;验：</span>
				<select class="myWorkingLife">
					<option v-for="data in workingLife" :value="data.id" v-text="data.dictionary_name"></option>
				</select>
			</div>
			<div class="inputBox"><span>学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;历：</span>
				<select class="myEmployEducationId">
					<option v-for="data in employEducationId" v-text="data.dictionary_name" :value="data.id"></option>
				</select>
			</div>
			<!--<div class="inputBox"><span>电子邮箱：</span><p>440811199601130413</p></div>-->
			<div class="inputBox"><span>婚姻状态：</span>
				<ul>
					<li :class="isChoose==1?'cur':''" @click="changeSelet(1)">未婚</li>
					<li :class="isChoose==2?'cur':''" @click="changeSelet(2)">已婚</li>
					<li :class="isChoose==3?'cur':''" @click="changeSelet(3)">离异</li>
				</ul>
			</div>
			<div class="inputBox"><span>身高(cm)：</span><input type="number" v-model="resumeInfo.resume_height" placeholder="请输入身高"/></div>
			<div class="inputBox"><span>视&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;力：</span><input type="text" v-model="resumeInfo.resume_vision" placeholder="请输入视力"/></div>
			<div class="btn" @click="save(0)">
				保存
			</div>
		</div>
		
		<div :class="['jobNeed',isClick==1?'show':'hide']">
			<div class="inputBox"><span>意向职位：</span>
				<input type="text" v-model="resumeInfo.resume_position_name_cs" placeholder="请输入意向职位"/>
				<!--<select class="myResumePosition">
					<option v-for="data in resumePosition" v-text="data.dictionary_name" :value="data.id"></option>
				</select>-->
			</div>
			<div class="inputBox"><span>工作待遇：</span>
				<select class="mySalary">
					<option v-for="data in salary" v-text="data.dictionary_name" :value="data.id"></option>
				</select>
			</div>
			<div class="inputBox"><span>工作地区：</span>
				<mt-picker :slots="myAddress1" @change="onMyAddressChange1" valueKey="address"></mt-picker>
				<input placeholder="请点击选择地址" type="text" readonly="readonly" @click="myshow('#myJob')" v-model="job_area" id="myJob">
			</div>
			<div class="btn" @click="save(1)">
				保存
			</div>
		</div>
		
		<div :class="['workEXP',isClick==2?'show':'hide']">
			<ul>
				<li v-for="data in workInfo">
					<router-link :to="{path:'editWork',query:{resumeId:data.resume_id,workId:data.id}}">
						<div class="title" v-text="data.company_name"></div>
						<div class="time">{{data.work_start}}到{{data.work_end}}</div>
						<span></span>
					</router-link>
				</li>
				
			</ul>
			<router-link :to="{path:'editWork',query:{resumeId:resumeId,workId:''}}">
				<div class="addWorkExp">
					<span></span>
					添加
				</div>
			</router-link>
		</div>
		<div :class="['eduEXP',isClick==3?'show':'hide']">
			<ul>
				<li v-for="data in educationInfo">
					<router-link :to="{path:'editEducation',query:{resumeId:data.resume_id,eduId:data.id}}">
						<div class="title" v-text="data.school_name"></div>
						<div class="time">{{data.education_start}}到{{data.education_end}}</div>
						<span></span>
					</router-link>
				</li>
			</ul>
			<router-link :to="{path:'editEducation',query:{resumeId:resumeId,eduId:''}}">
				<div class="addWorkExp">
						<span></span>
						添加
				</div>
			</router-link>
		</div>
		<div :class="['myEvaluate',isClick==4?'show':'hide']">
			<textarea placeholder="优秀的自我评价可以吸引招聘人员，为您的简历增色不少" @keyup="stringNum" v-model="myEvaluate"></textarea>
			<input type="text"  readonly="readonly" v-model="textNum"/>
			<div class="btn" @click="save(2)">
				保存
			</div>
		</div>
		
	</div>
</template>

<script>
	import { Picker,MessageBox,Toast } from 'mint-ui';
	export default{
		name:'editResume',
		data(){
			return{
				isClick:0,
				isChoose:1,
				textNum:"0/500",
				resumeId:'',
				resumeInfo:'',
				myAddress:[],//地址库
				areaString:'',//个人信息地址
				areaCode:'',//个人信息地址代码
				workingLife:[],//工作经验
				employEducationId:[],//学历
//				resumePosition:'',//意向职位
				salary:[],//工资待遇
				job_area:'',//求职意向地址
				job_areaCode:'',//求职意向地址代码
				myEvaluate:'',//自我评价
				workInfo:[],//工作经验
				educationInfo:[],//教育经验
				myAddress1:[]
			}
		},
		created(){
			//地址选择器
			this.isClick = localStorage.isClick || 0;
			this.myAddress = this.myfun.areaFun();
			this.myAddress1 = this.myfun.areaFun();
			//初始化位置
			this.$nextTick(() => {
	        	var that = this;
	        	//点击去除盒子
	        	$('.picker').on('click',function(){
	        		that.myfun.removeArea(this);
	        	});
	    	});
			this.myfun.inputExpress(this);
			
			this.resumeId = this.$route.query.id;
			this.myfun.getAxios({path:'/app/resumeInfo/'+this.resumeId},res=>{
				console.log(res);
				//工作经验
				this.workInfo = res.content.workInfoList;
				//教育经验
				this.educationInfo = res.content.educationInfoList;
				this.resumeInfo = res.content.resumeInfo;
				this.workingLife = res.content.workingLifeList;
				this.employEducationId = res.content.employEducationIdList;
				this.resumePosition = res.content.resumePositionList;
				this.salary = res.content.salaryList;
				this.myEvaluate = this.resumeInfo.resume_evaluate || '';
				this.textNum = this.myEvaluate.length+'/500' || '0/500';
				this.isChoose = this.resumeInfo.resume_marital_status || 1;
				this.resumeInfo.resume_native_name = this.resumeInfo.resume_native_name!=null?this.myfun.changeAddr(this.resumeInfo.resume_native_name):'';
				this.areaString = this.resumeInfo.resume_place_name!=null?this.myfun.changeAddr(this.resumeInfo.resume_place_name):'';
				this.areaCode = this.resumeInfo.resume_place;
				
				this.job_area = this.resumeInfo.resume_workplace_name!=null?this.myfun.changeAddr(this.resumeInfo.resume_workplace_name):'';
				this.job_areaCode = this.resumeInfo.resume_workplace;
				
				this.myfun.selectedGetData(this,'.myWorkingLife option',this.resumeInfo.resume_service);
				this.myfun.selectedGetData(this,'.myEmployEducationId option',this.resumeInfo.resume_education);
//				this.myfun.selectedGetData(this,'.myResumePosition option',this.resumeInfo.resume_position_id);
				this.myfun.selectedGetData(this,'.mySalary option',this.resumeInfo.resume_salary);
				
				/*初始化位置*/
	        	this.myfun.beginAddrPlace(this,this.areaCode,'myAddress');
	        	this.myfun.beginAddrPlace(this,this.job_areaCode,'myAddress1');
				
			})
		},
		methods:{
			//切换头部胡样式
			changeNav:function(val){
				this.isClick = val;
				localStorage.isClick = val;
			},
			
			//切换婚姻状况
			changeSelet:function(val){
				this.isChoose = val;
			},
			//识别字数
			stringNum:function(){
				this.myfun.substrTextarea(this,'myEvaluate');
			},
			onMyAddressChange(picker, values) {
				/*返回数据*/
				var myAttr = this.myfun.myChange_mint(picker,values);
				if(myAttr){
					this.areaString = myAttr._address;
					this.areaCode = myAttr._code;
					console.log(this.areaCode)	
				}
			},
			onMyAddressChange1(picker, values){
				var myAttr = this.myfun.myChange_mint(picker,values);
				if(myAttr){
					this.job_area = myAttr._address;
					this.job_areaCode = myAttr._code;
				}
			},
			//显示地址
			myshow(id){
				this.myfun.showArea(id);
			},
			//提交图片
 			postImg(event){
 				var hasFiles = event.target.files[0];
				let name = hasFiles.name;
				let type = hasFiles.type;
				this.myfun.selectFileImage(hasFiles,res=>{
   					var _formData = new FormData();
   					var myImg = this.myfun.Base64ToFlie(res, type);
   					_formData.append('file',myImg,name);
	 				_formData.append('imgType','resumeInfo');
	 				_formData.append('resumeId',this.resumeInfo.id); 
	 				this.myfun.post_imgAxios({path:'/app/uploadImg'},_formData,result=>{
	 					console.log(result)
	 					this.resumeInfo.resume_img = result.content;
						Toast(result.msg);
	 				});
   				});
 			},
 			save(val){
 				if(val==0){
 					if(!this.resumeInfo.resume_phone || !this.resumeInfo.resume_email || !this.resumeInfo.resume_height || !this.resumeInfo.resume_vision || !this.areaCode || !this.resumeInfo.resume_title){
 						return MessageBox('提示','信息不能为空');
 					}
 					else if(!this.$phone.test(this.resumeInfo.resume_phone)){
 						return MessageBox('提示','手机号码格式有误');
 					}
 					else if(!this.$email.test(this.resumeInfo.resume_email)){
 						return MessageBox('提示','邮箱格式有误');
 					}
 					else if(!this.$floatNumber.test(this.resumeInfo.resume_vision)){
 						return MessageBox('提示','视力输入的不是有效小数或整数');
 					}
 					else if(parseInt(this.resumeInfo.resume_vision)>5.3 || parseInt(this.resumeInfo.resume_vision)<0){
 						return MessageBox('提示','视力输入范围为0-5.3');
 					}
 					else if(parseInt(this.resumeInfo.resume_height)>1000){
 						return MessageBox('提示','身高过高');
 					}
 					var myWorkingLifeCode = $('.myWorkingLife option:selected').val();
 					var myEmployEducationIdCode = $('.myEmployEducationId option:selected').val();
 					var postData = {
 						resumeId:this.resumeInfo.id,
 						'resumeInfo.resume_phone':this.resumeInfo.resume_phone,
 						'resumeInfo.resume_email':this.resumeInfo.resume_email,
 						'resumeInfo.resume_height':this.resumeInfo.resume_height,
 						'resumeInfo.resume_place':this.areaCode,
 						'resumeInfo.resume_marital_status':this.isChoose,
 						'resumeInfo.resume_vision':this.resumeInfo.resume_vision,
 						'resumeInfo.resume_education':myEmployEducationIdCode,
 						'resumeInfo.resume_service':myWorkingLifeCode,
 						'resumeInfo.resume_title':this.resumeInfo.resume_title
 					}
 				}
 				else if(val==1){
 					if(!this.job_areaCode || !this.resumeInfo.resume_position_name_cs){
 						return MessageBox('提示','信息不能为空！');
 					}
 					else if(this.resumeInfo.resume_position_name_cs.length>50){
 						return MessageBox('提示','意向求职字数过长！');
 					}
// 					var myResumePositionCode = $('.myResumePosition option:selected').val();
 					var mySalaryCode = $('.mySalary option:selected').val();
 					var postData = {
 						resumeId:this.resumeInfo.id,
 						'resumeInfo.resume_name':this.resumeInfo.resume_name,
 						'resumeInfo.resume_position_name_cs':this.resumeInfo.resume_position_name_cs,
 						'resumeInfo.resume_salary':mySalaryCode,
 						'resumeInfo.resume_workplace':this.job_areaCode
 					}
 					console.log(postData);
 				}
 				else if(val==2){
 					if(!this.myEvaluate){
 						return MessageBox('提示','自我评价不能为空');
 					}
 					var postData = {
 						resumeId:this.resumeInfo.id,
 						'resumeInfo.resume_evaluate':this.myEvaluate
 					}
 				}
 				this.myfun.postAxios({path:'/app/resumeInfoSave'},postData,res=>{
 					console.log(res);
 					this.isClick = (++this.isClick)%5;
 					return Toast('保存成功！');
 				})
 			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	#editResume{
		
		.myNav{height: 80px;width: 100%;display: flex;padding:20px 0 0 0;background:#fff;
				li{flex: 1;text-align: center;font-size: 25px;border-bottom: 5px solid transparent;}
				li.cur{border-bottom: 5px solid #FF6000;}
			}
		.baseInfo .btn{margin-top:100px;}
		.baseInfo,.jobNeed{
			.imgbox{
				padding:20px 0;background: #fff;margin:5px 0;
				.imgContainer{width: 150px;min-height: 200px;margin: 0 auto;position: relative;
					input.file{position: absolute;opacity: 0;width: 100%;height: 100%;top: 0px;left: 0px;}
					img{width: 100%;}
				}
				
			}
			.inputBox{background: #fff;border-bottom: 2px solid #e1e1e1; padding-left:30px; height: 90px; width: 100%; display: flex;margin-top: 3px;
				@flex:6;
                span{flex: 2;line-height: 90px;}
                input{border: none;flex: @flex;padding: 0 10px;}
                p{flex: @flex;padding: 0 10px;line-height: 90px;}
                select{border: none;outline: none;flex: @flex;}
                ul{display: flex;flex: @flex;height: 60px;margin: 15px;border-radius:20px;border:2px solid #e1e1e1;
                	li:nth-child(1){border-radius:20px 0 0 20px ;}
                	li:nth-child(3){border-radius:0 20px 20px 0;}
                	li{flex: 1;line-height: 60px;text-align: center;}
                	li+li{border-left:1px solid #E1E1E1 ;}
                	li.cur{background: #FF6000;color: #fff;}
                }
                
       		}
       		.unChange{background: #f5f5f5;}
        }
        .workEXP,.eduEXP{height: auto;
        	ul{height: auto;margin-top: 10px;
        		li{height: 130px;background: #fff;width: 100%;padding: 30px;position: relative;
        			.title{color: #404040;font-weight: bold;font-size: 35px;}
        			.time{font-size: 25px;}
        			span{left: auto;right: 30px;top: calc(50% - 12px);position: absolute;width: 14px;height: 24px;background: url(../../../assets/image/linkRight_col.png);background-size:100% 100%;}
        		}
        		li+li{border-top:2px solid #e1e1e1 ;}
        	}
        	.addWorkExp{width: 90%;height: 90px;border-radius:5px;border: 2px solid #ccc;margin: 60px auto;text-align: center;line-height: 90px;color: #B5B5B5;
        		span{background-size:100% 100%;height: 44px;width: 44px;background-image:url(../../../assets/image/addworkEXP.png);display: inline-block;position: relative;top: 10px;}
        		&:active{background: #ccc;}
        	}
        	
        }
        
        .myEvaluate{padding: 30px;
        	textarea{padding: 20px;border: 2px solid #ccc;width: 100%;height: 650px;}
        	input{background: transparent;float: right;text-align: right;border: none;outline: none;padding: 10px;}
        }
        .btn{margin-bottom: 50px;}
	}

</style>