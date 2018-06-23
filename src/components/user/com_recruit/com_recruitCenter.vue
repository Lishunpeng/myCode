<template>
	<div id="editRecruit">
		<header>
			<span class="left" @click="$router.back(-1)"></span>
			发布职位
		</header>
		<ul class="myNav">
			<li :class="isClick==0?'cur':''" @click="changeNav(0)">职位简历</li>
			<li :class="isClick==1?'cur':''" @click="changeNav(1)">福利待遇</li>
			<li :class="isClick==2?'cur':''" @click="changeNav(2)">职位描述</li>
			<li :class="isClick==3?'cur':''" @click="changeNav(3)">联系方式</li>
		</ul>
		<!--简历信息-->
		<div :class="['recruitInfo',isClick==0?'show':'hide']">
			
			<div class="inputBox"><span>职业名称：</span>
				<input type="text" placeholder="请输入职位名称" v-model="rec_jobName"/>
			</div>
			<div class="inputBox"><span>有效时间：</span>
				<mt-datetime-picker v-model="effectTime_hide"  ref="out_picker" :startDate="_startDate" :endDate="_endTime" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="chooseEffectTime">
				</mt-datetime-picker>
				<input type="text" placeholder="请选择有效时间"  v-model="effectTime" @click="myshow('out_picker')" readonly="readonly"/>
			</div>
			<div class="inputBox addrBox"><span>工作地点：</span>
				<mt-picker :slots="myAddress" @change="onMyAddressChange" valueKey="address"></mt-picker>
				<input placeholder="请点击选择地址" type="text" readonly="readonly" @click="show('#myArea')" v-model="areaString" id="myArea">
			</div>
			<div class="inputBox _salary"><span>工资待遇：</span>
				<select>
					<option v-for="data in salary" v-text="data.dictionary_name" :value="data.id"></option>
				</select>
			</div>
			<div class="inputBox _workingLife"><span>工作经验：</span>
				<select>
					<option value="">不限</option>
					<option v-for="data in workingLife" v-text="data.dictionary_name" :value="data.id"></option>
				</select>
			</div>
			<div class="inputBox _positionCategory"><span>行业类别：</span>
				<select>
					<option value="">不限</option>
					<option v-for="data in positionCategory" v-text="data.dictionary_name" :value="data.id"></option>
				</select>
			</div>
			<div class="inputBox _employEducation"><span>学历要求：</span>
				<select>
					<option value="">不限</option>
					<option v-for="data in employEducation" v-text="data.dictionary_name" :value="data.id"></option>
				</select>
			</div>
			<div class="inputBox _householdRegister"><span>户籍要求：</span>
				<select>
					<option value="">不限</option>
					<option v-for="data in householdRegister" v-text="data.dictionary_name" :value="data.id"></option>
				</select>
			</div>
			<div class="inputBox _languageRequirements"><span>语言要求：</span>
				<select>
					<option value="">不限</option>
					<option v-for="data in languageRequirements" v-text="data.dictionary_name" :value="data.id"></option>
				</select>
			</div>
			<div class="inputBox _workingForm"><span>工作性质：</span>
				<select>
					<option v-for="data in workingForm" v-text="data.dictionary_name" :value="data.id"></option>
				</select>
			</div>
			<div class="inputBox"><span>招聘人数：</span><input type="number"  placeholder="请输入招聘人数"  v-model="rec_peopleNum"/></div>
			<div class="inputBox"><span>所属部门：</span><input type="text"  placeholder="请输入所属部门" v-model="rec_department"/></div>
			<div class="inputBox"><span>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</span>
				<ul>
					<li :class="isChoose==0?'cur':''" @click="changeSelet(0)">不限</li>
					<li :class="isChoose==1?'cur':''" @click="changeSelet(1)">男</li>
					<li :class="isChoose==2?'cur':''" @click="changeSelet(2)">女</li>
				</ul>
			</div>
			<div class="btn" @click="save(0)">
					保存
			</div>
		</div>
		
		<div :class="['welfareInfo',isClick==1?'show':'hide']">
			<ul class="welfareList">
				<li v-for="data in welfareList" v-text="data.dictionary_name" @click="welfareListClick(data)" :class="data.isPress?'cur':''" :data-id="data.id"></li>
			</ul>
			<div class="btn" @click="save(1)">
					保存
			</div>
		</div>
		
		
		<div :class="['recruitDetail',isClick==2?'show':'hide']">
			<textarea placeholder="请输入职位描述" @keyup="stringNum" v-model="myText"></textarea>
			<input type="text"  readonly="readonly" v-model="textNum"/>
			<div class="btn" @click="save(2)">
					保存
			</div>
		</div>
		<div :class="['linkWay',isClick==3?'show':'hide']">
			<div class="inputBox"><span>联&nbsp;&nbsp;系&nbsp;&nbsp;人：</span><input type="text"  placeholder="请输入联系人" v-model="linkPeople"/></div>
			<div class="inputBox"><span>联系人职务：</span><input type="text"  placeholder="请输入联系人职务" style="flex: 5;" v-model="linkJob"/></div>
			<div class="inputBox"><span>移动电话：</span><input type="text"  placeholder="请输入移动电话" v-model="mphone"/></div>
			<div class="inputBox"><span>联系地址：</span><input type="text"  placeholder="请输入联系地址" v-model="linkAddr"/></div>
			<div class="inputBox"><span>固定电话：</span><input type="text"  placeholder="(选填)0753-2222222" v-model="tphone"/></div>
			<div class="inputBox"><span>邮政编码：</span><input type="text"  placeholder="(选填)请输入邮政编码" v-model="zipCode"/></div>
			<div class="inputBox"><span>邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱：</span><input type="text"  placeholder="(选填)请输入邮箱" v-model="email"/></div>
			<div class="inputBox"><span>公司主页：</span><input type="text"  placeholder="(选填)公司主页http://或https://" v-model="com_web"/></div>
			<div class="btn" @click="save(3)">
					保存
			</div>
		</div>
	</div>
</template>

<script>
	import { MessageBox,Toast } from 'mint-ui';
	export default{
		name:'editRecruit',
		data(){
			return{
				welfareList:[],
				isClick:0,
				isChoose:0,
				myText:"",
				textNum:"0/500",
				recruitData:[],
				getId:'',
				employEducation:[],//学历要求
				householdRegister:[],//户籍要求
				languageRequirements:[],//英语程度
				positionCategory:[],//行业类别
				salary:[],//工资待遇
				workingForm:[],//工作性质
				workingLife:[],//工作经验
				effectTime:'',
				_startDate:"",//开始时间
				_endTime:"",//结束时间
				effectTime_hide:'',
				myAddress:'',//整个地址数据
				areaString:'',//地址字符串
				areaCode:'',//地址代码
				recruitData:[],//获取初始化信息
				rec_jobName:'',//职业名称
				rec_peopleNum:'',//招聘人数
				rec_department:'',//所属部门
				treatmentWelfare:[],//福利待遇
				linkPeople:'',//联系人
				linkJob:'',//联系人职位
				mphone:'',//移动电话
				tphone:'',//移动电话
				zipCode:'',//邮政编码
				email:'',//邮箱
				com_web:'',//公司网页
				linkAddr:''//联系地址
			}
		},
		created(){
			//获取ID
			this.getId = this.$route.query.id;
			//获取时间
			this._endTime = new Date('2200-01-01');
			this._startDate = new Date();
			this.effectTime_hide = new Date();
			//获取数据
			this.myfun.getAxios({path:'/app/com_recruitInfo/'+this.getId},res=>{
				console.log(res);
				res = res.content;
				this.employEducation = res.employEducationIdList;
				this.householdRegister = res.householdRegisterList;
				this.languageRequirements = res.languageRequirementsList;
				this.positionCategory = res.positionCategoryList;
				this.salary = res.salaryList;
				this.workingForm = res.workingFormList;
				this.workingLife = res.workingLifeList;
				this.recruitData = res.queryRecruitInfoView;
				this.rec_jobName = this.recruitData.recruit_title;
				/*select 渲染数据*/
				this.myfun.selectedGetData(this,'._employEducation option',this.recruitData.education_id);
				this.myfun.selectedGetData(this,'._householdRegister option',this.recruitData.registered_residence_id);
				this.myfun.selectedGetData(this,'._languageRequirements option',this.recruitData.language_id);
				this.myfun.selectedGetData(this,'._positionCategory option',this.recruitData.recruit_position_id);
				this.myfun.selectedGetData(this,'._salary option',this.recruitData.salary_id);
				this.myfun.selectedGetData(this,'._workingForm option',this.recruitData.working_form_id);
				this.myfun.selectedGetData(this,'._workingLife option',this.recruitData.service_id);
				/*地址数据渲染*/
				this.areaCode = this.recruitData.recruit_workplace;
				this.areaString = this.recruitData.workplace_name!=null?this.myfun.changeAddr(this.recruitData.workplace_name):'';
				//初始化地址位置
				this.myfun.beginAddrPlace(this,this.areaCode);
				
				//时间渲染
				this.effectTime = this.recruitData.recruit_valid_date;
				
				this.rec_peopleNum = this.recruitData.recruit_count;
				this.rec_department = this.recruitData.recruit_department;
				
				this.isChoose = this.recruitData.recruit_sex!=null?this.recruitData.recruit_sex : 0;
				
				/*福利待遇*/
				this.treatmentWelfare = res.treatmentWelfareList;
				for(let i in this.treatmentWelfare){
					if(this.recruitData.recruit_welfare && this.recruitData.recruit_welfare.indexOf(','+this.treatmentWelfare[i].dictionary_name+',')>=0){
						this.treatmentWelfare[i].isPress = true;
					}else{
						this.treatmentWelfare[i].isPress = false;
					}
					this.welfareList.push({dictionary_name:this.treatmentWelfare[i].dictionary_name,isPress:this.treatmentWelfare[i].isPress});
				}
				/*职位描述*/
				this.myText = this.recruitData.recruit_job_description || '';
				this.textNum = this.myText.length || '';
				
				/*联系方式*/
				
		/*<p>联系人：#(queryRecruitInfoView.recruit_contact)</p>
						<p>联系人职务：#(queryRecruitInfoView.recruit_contact_position)</p>
						<p>固定电话：#(queryRecruitInfoView.recruit_contact_telephone)</p>
						<p>移动电话：#(queryRecruitInfoView.recruit_contact_mobile_phone)</p>
						<p>联系地址：#(queryRecruitInfoView.recruit_contact_address)</p>
						<p>邮政编码：#(queryRecruitInfoView.recruit_contact_zip_code)</p>
						<p>邮箱：#(queryRecruitInfoView.recruit_email)</p>
						<p>公司网页：#(queryRecruitInfoView.recruit_company_official_website)</p>
				linkPeople:'',//联系人
				linkJob:'',//联系人职位
				mphone:'',//移动电话
				tphone:'',//移动电话
				zipCode:'',//邮政编码
				email:'',//邮箱
				com_web:'',//公司网页*/
				this.linkPeople = this.recruitData.recruit_contact;
				this.linkJob = this.recruitData.recruit_contact_position;
				this.mphone = this.recruitData.recruit_contact_mobile_phone;
				this.tphone = this.recruitData.recruit_contact_telephone || '';
				this.linkAddr = this.recruitData.recruit_contact_address;
				this.zipCode = this.recruitData.recruit_contact_zip_code || '';
				this.email = this.recruitData.recruit_email || '';
				this.com_web = this.recruitData.recruit_company_official_website || '';
			});
			//获取地址
			this.myAddress = this.myfun.areaFun();
			this.myfun.inputExpress(this);
			this.$nextTick(() => {
				/*初始化位置*/
//	        	this.myAddress[0].defaultIndex = 3;
//	        	this.myAddress[2].defaultIndex = 11;
//	        	this.myAddress[4].defaultIndex = 9;
	        	var that = this;
	        	//点击去除盒子
	        	$('.addrBox .picker').on('click',function(){
	        		that.myfun.removeArea(this);
	        	});
	    	});
			
		},
		methods:{
			//切换头部胡样式
			changeNav:function(val){
				if(!this.getId && val!=0){
					return Toast('请先保存职位简介！');
				}
				this.isClick = val;
			},
			//切换婚姻状况
			changeSelet:function(val){
				this.isChoose = val;
			},
			//识别字数
			stringNum:function(){
				var num = this.myText.length;
				if (num>500) {
					num = 500;
					this.myText = this.myText.substr(0,500);
				}
				this.textNum = num+'/500';
			},
			//福利待遇点击
			welfareListClick:function(obj){
				obj.isPress?obj.isPress = false:obj.isPress = true;
			},
			//显示时间插件
			myshow(str){
				this.$refs[str].open();
			},
			chooseEffectTime(){
 				this.effectTime = this.myfun.getMyDate(this.effectTime_hide);
 			},
 			//saveData
 			save(val){
 				if(val==0){
					if(!this.rec_jobName || !this.effectTime || !this.areaCode ||!this.rec_peopleNum ||!this.rec_department){
						return MessageBox('提示','信息不能为空！');
					}
					if(!this.$intNumber.test(this.rec_peopleNum)){
						return MessageBox('提示','招聘人数不为整数！');
					}
					var my_sex = this.isChoose?this.isChoose:'';
					var _employEducationId = $('._employEducation option:selected').val();
					var _householdRegisterId = $('._householdRegister option:selected').val();
					var _languageRequirementsId = $('._languageRequirements option:selected').val();
					var _positionCategoryId = $('._positionCategory option:selected').val();
					var _salaryId = $('._salary option:selected').val();
					var _workingFormId = $('._workingForm option:selected').val();
					var _workingLifeId = $('._workingLife option:selected').val();
					
 					var postData = {
 						'recruit_info.id':this.getId,
 						'recruit_info.recruit_title':this.rec_jobName,
 						'recruit_info.recruit_position_id':_positionCategoryId,
 						'recruit_info.recruit_valid_date':this.effectTime,
 						'recruit_info.recruit_salary':_salaryId,
 						'recruit_info.recruit_working_form':_workingFormId,
 						'recruit_info.recruit_language':_languageRequirementsId,
 						'recruit_info.recruit_service':_workingLifeId,
 						'recruit_info.recruit_registered_residence':_householdRegisterId,
 						'recruit_info.recruit_education':_employEducationId,
 						'recruit_info.recruit_count':this.rec_peopleNum,
 						'recruit_info.recruit_department':this.rec_department,
 						'recruit_info.recruit_workplace':this.areaCode,
 						'recruit_info.recruit_sex':my_sex
 					}
 					console.log(postData);
 				}else if(val==1){					
					var	postData = 'recruit_info.id'+'='+this.getId+'&';
			   		for (let i in this.welfareList) {
 						if(this.welfareList[i].isPress){
							postData += 'treatment_welfare'+'='+this.welfareList[i].dictionary_name+'&';
 						}
 					}
 				}else if(val==2){
 					if(!this.myText){
 						return MessageBox('提示','请输入职位详情');
 					}
 					var postData = {
 						'recruit_info.id':this.getId,
 						'recruit_info.recruit_job_description':this.myText
 					}
 				}else if(val==3){
 					
			/*linkPeople:'',//联系人
				linkJob:'',//联系人职位
				mphone:'',//移动电话
				tphone:'',//移动电话
				zipCode:'',//邮政编码
				email:'',//邮箱
				com_web:'',//公司网页
				linkAddr:''//联系地址*/
					
 					if(!this.linkPeople || !this.linkJob || !this.mphone ||!this.linkAddr){
 						return MessageBox('提示','信息不能为空');
 					}
 					else if(!this.$phone.test(this.mphone)){
 						return MessageBox('提示','手机号码输入不正确');
 					}
 					if(this.zipCode){
 						if(!this.$postCode.test(this.zipCode)){
 							return MessageBox('提示','邮编输入不正确');
 						} 						
 					}
 					if(this.com_web){
 						if(!this.$url.test(this.com_web)){
 							return MessageBox('提示','网页输入不正确');
 						} 						
 					}
 					if(this.email){
 						if(!this.$email.test(this.email)){
 							return MessageBox('提示','邮箱输入不正确');
 						} 
 					}
 					if(this.tphone){
 						if(!this.$telePhone.test(this.tphone)){
 							return MessageBox('提示','固定电话输入不正确');
 						}
 					}
 					var postData = {
 						'recruit_info.id':this.getId,
 						'recruit_info.recruit_contact':this.linkPeople,
 						'recruit_info.recruit_contact_position':this.linkJob,
 						'recruit_info.recruit_contact_telephone':this.tphone,
 						'recruit_info.recruit_contact_mobile_phone':this.mphone,
 						'recruit_info.recruit_contact_address':this.linkAddr,
 						'recruit_info.recruit_contact_zip_code':this.zipCode,
 						'recruit_info.recruit_email':this.email,
 						'recruit_info.recruit_company_official_website':this.com_web
 					}
 				}
 				var obj = val!=1?{path:'/app/comRecruitInfoUpdate'}:{path:'/app/comRecruitInfoUpdate',isUnchangeString:true};
 				this.myfun.postAxios(obj,postData,res=>{
 					this.getId = res.content;
 					this.isClick = (++this.isClick)%4;
 					return Toast(res.msg);
 				});
 			},
 			onMyAddressChange(picker, values) {
				/*返回数据*/
				var myAttr = this.myfun.myChange_mint(picker,values);
				if(myAttr){
					this.areaString = myAttr._address;
					this.areaCode = myAttr._code;
				}
			},
			//显示地址
			show(id){
				this.myfun.showArea(id);
			},
		}
	}
</script>

<style lang="less" scoped="scoped">
	#editRecruit{
		.myNav{height: 80px;width: 100%;display: flex;padding:20px 0 0 0;background:#fff;
				li{flex: 1;text-align: center;font-size: 25px;border-bottom: 5px solid transparent;}
				li.cur{border-bottom: 5px solid #FF6000;}
			}
		.recruitInfo,.linkWay{
			.btn{margin: 100px auto;}
			.imgbox{
				padding:20px 0;background: #fff;margin:5px 0;
				.imgContainer{width: 150px;height: 200px;margin: 0 auto;img{width: 100%;}}
				
			}
			.inputBox{background: #fff;border-bottom: 2px solid #e1e1e1; padding-left:30px; height: 90px; width: 100%; display: flex;margin-top: 3px;
				@flex:7;
                span{flex: 2;line-height: 90px;}
                input{border: none;flex: @flex;padding: 0 10px;}
                p{flex: @flex;padding: 0 10px;line-height: 90px;}
                select{border: none;outline: none;flex: @flex;}
                ul{display: flex;flex: @flex;height: 60px;margin: 15px;border-radius:20px;border:2px solid #e1e1e1;
                	li:nth-child(1){border-radius:20px 0 0 20px ;}
                	li:nth-child(3){border-radius:0 20px 20px 0;}
                	li{flex: 1;line-height: 60px;text-align: center;}
                	li+li{border-left:2px solid #E1E1E1 ;}
                	li.cur{background: #FF6000;color: #fff;}
                }
                
       		}
        }
       .recruitDetail{padding: 30px;
        	textarea{padding: 20px;border: 2px solid #ccc;width: 100%;height: 650px;}
        	input{background: transparent;float: right;text-align: right;border: none;outline: none;padding: 10px;}
        }
        .welfareInfo{
        	.welfareList{
        		padding: 10px;height: auto;overflow: hidden;
        		li{margin-top:20px ;padding: 0 15px;height: 60px;border: 2px solid #b5b5b5;border-radius:20px;float: left;margin-left: 20px;line-height: 60px;color: #b5b5b5;}
        		li.cur{border: 2px solid #ff6000;color: #ff6000;}
        	}
        }
	}

</style>