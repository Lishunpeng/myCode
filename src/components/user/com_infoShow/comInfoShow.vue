<template>
	<div id="comInfoShow">
		<header>
			<span class="left" @click="$router.back(-1)"></span>
			企业信息
			<span class="right" @click="save">保存</span>
		</header>
		<div class="inputBox unChange"><span>公司名称：</span><input type="text" v-model="com_data.company_name" readonly="readonly"/></div>
		<div class="inputBox unChange"><span>营业执照：</span><input type="number" v-model="com_data.company_business_license" readonly="readonly"/></div>

		<div class="inputBox"><span>所属行业：</span>
			<select class="myCompanyScope">
				<option :value="data.id" v-for="data in companyScope" v-text="data.dictionary_name"></option>
			</select>
		</div>
		<div class="inputBox"><span>企业性质：</span>
			<select class="myCompanyNature">
				<option :value="data.id" v-for="data in companyNature" v-text="data.dictionary_name"></option>
			</select>
		</div>
		<div class="inputBox"><span>员工人数：</span>
			<select class="myCompanyStaffNumber">
				<option :value="data.id" v-for="data in companyStaffNumber" v-text="data.dictionary_name"></option>
			</select>
		</div>
		<div class="inputBox"><span>公司网页：</span><input type="text" placeholder="(选填)公司网页http://或https://" v-model="com_data.company_official_website"/></div>
		<div class="inputBox"><span>联&nbsp;系&nbsp;人：</span><input type="text" placeholder="请输入联系人" v-model="com_data.company_contacts"/></div>
		<div class="inputBox"><span>移动电话：</span><input type="text" placeholder="请输入移动电话" v-model="com_data.company_mobile_phone"/></div>
		<div class="inputBox"><span>固定电话：</span><input type="text" placeholder="(选填)格式：0753-2222222" v-model="com_data.company_telephone"/></div>
		<div class="inputBox">
			<span>公司地址：</span>
			<mt-picker :slots="myAddress" @change="onMyAddressChange" valueKey="address"></mt-picker>
			<input placeholder="请点击选择地址" type="text" readonly="readonly" @click="myshow('#myArea')" v-model="areaString" id="myArea">
		</div>
		<div class="workDescribe"><span>公司简介：</span>
			<textarea type="text" placeholder="请输入公司简介" v-model="comIntr" @keyup="stringNum"/>
			<input type="text"  readonly="readonly" v-model="textNum"/>
		</div>
	</div>
</template>

<script>
	import { MessageBox,Toast,Picker } from 'mint-ui';
	export default { 
  		name: 'per_regCenter',
  		data(){
  			return{
  				areaCode:'',//获取的代码值
				areaString:'',
				myAddress:'',//地址数据
  				textNum:'0/500',
  				companyStaffNumber:[],//员工人数
  				companyScope:[],//所属行业
  				companyNature:[],//企业性质
  				com_data:{},//公司信息
  				comIntr:''//公司简介
  			}
  		},
  		created(){
  			this.myAddress = this.myfun.areaFun();//获取地址数据
			this.$nextTick(() => {
				
	        	var that = this;
	        	//点击去除盒子
	        	$('.picker').on('click',function(){
	        		that.myfun.removeArea(this);
	        	});
	    	});
			
  			this.myfun.getAxios({path:'/app/com_information'},res=>{
  				console.log(res);
  				this.com_data = res.content.companyView;
				this.comIntr = this.com_data.company_brief_introduction;
				this.textNum = this.comIntr.length+'/500';
				this.companyScope = res.content.companyScopeList;
				this.companyNature = res.content.companyNatureList;
				this.companyStaffNumber = res.content.companyStaffNumberList;
				//移动电话
//				this.com_data.company_telephone==null?this.com_data.company_telephone = '':'';
				this.com_data.company_telephone = this.com_data.company_telephone|| '';
				this.com_data.company_official_website = this.com_data.company_official_website|| '';
				this.com_data.company_scope = this.com_data.company_scope?this.myfun.changeString(this.com_data.company_scope):'';
				//所属行业特殊处理
				this.myfun.selectStrData(this,'.myCompanyScope option',this.com_data.company_scope);
				//企业性质渲染
				this.myfun.selectedGetData(this,'.myCompanyNature option',this.com_data.company_nature);
				//员工人数
				this.myfun.selectedGetData(this,'.myCompanyStaffNumber option',this.com_data.company_staff_number);
				
				this.areaString = this.com_data.company_owned_city_name_path?this.myfun.changeAddr(this.com_data.company_owned_city_name_path):'';
				this.areaCode = this.com_data.company_owned_city || '';
				/*初始化位置*/
	        	this.myfun.beginAddrPlace(this,this.areaCode);
				
			})
  		},
 		methods: {
 			onMyAddressChange(picker, values) {
				/*返回数据*/
				var myAttr = this.myfun.myChange_mint(picker,values);
				if(myAttr){
					this.areaString = myAttr._address;
					this.areaCode = myAttr._code;
				}
			},
			//显示地址
			myshow(id){
				this.myfun.showArea(id);
			},
 			save(){
 				this.peopleCount = $('.peopleCount option:selected').val();
 				if(!this.com_data.company_contacts || !this.com_data.company_mobile_phone || !this.comIntr ||!this.areaCode){
 					return MessageBox('提示','信息不能为空！');
 				}
 				else if(!this.$phone.test(this.com_data.company_mobile_phone)){
 					return MessageBox('提示','手机号码输入有误！');
 				}
 				if(this.com_data.company_telephone){
 					if(!this.$telePhone.test(this.com_data.company_telephone)){
	 					return MessageBox('提示','电话号码输入有误！');
	 				}
 				}
 				if(this.com_data.company_official_website){
 					if(!this.$url.test(this.com_data.company_official_website)){
 						return MessageBox('提示','公司网页地址输入有误！');
 					} 					
 				}
 				var myCompanyScope = $('.myCompanyScope option:selected').text();
 				var myCompanyNature = $('.myCompanyNature option:selected').val();
 				var myCompanyStaffNumber = $('.myCompanyStaffNumber option:selected').val();
 				var postData = {
 					'company_scope':myCompanyScope,
 					'companuy.company_nature':myCompanyNature,
 					'companuy.company_staff_number':myCompanyStaffNumber,
 					'companuy.company_official_website':this.com_data.company_official_website,
 					'companuy.company_contacts':this.com_data.company_contacts,
 					'companuy.company_mobile_phone':this.com_data.company_mobile_phone,
 					'companuy.company_telephone':this.com_data.company_telephone,
 					'companuy.company_owned_city':this.areaCode,
 					'companuy.company_brief_introduction':this.comIntr
 				}
 				
 				console.log(postData);
 				this.myfun.postAxios({path:'/app/comInformationSave'},postData,res=>{
 					return MessageBox('提示',res.msg).then(()=>{
 						this.$router.back(-1);	
 					});
 					
 				});
 			},
			stringNum(){
				this.myfun.substrTextarea(this,'comIntr');
			},
		}
	}
</script>

<style lang="less" scoped="scoped">
#comInfoShow{
		padding-bottom:50px;
        .show{display: block;}
		.hide{display: none;}
        @color:#ff6000;
        .myTitle{height: 60px;display: flex;margin: 20px;
        	li{flex: 1;text-align: center;line-height: 60px;background: url(../../../assets/image/titleBg.png);background-size:100% 100% ;}
        	li.cur{background-image: url(../../../assets/image/titleBg1.png);color: #fff;}
        }
        .isAuditing{
        	background: #fff;padding: 50px;
        	img{margin: 50px auto;margin-bottom: 20px;display: block;}
        	p{text-align: center;}
        }
        .link a{float: right;margin: 10px;color: #217ec3;}
        .inputBox{
        	border-bottom: 1px solid #e1e1e1;
            padding-left:30px;
            height: 90px;
            width: 100%;
            display: flex;
            span{flex: 2;line-height: 90px;}
            input[type=text],input[type=number],select{outline: none;background-color: transparent;border: none;flex: 6;padding: 0 10px;text-align: left;padding-right: 20px;}
        }
        .unChange{background: #F1F1F1;}
        background:#fff;
        .workDescribe{padding: 30px;background: #fff;height: auto;padding-bottom: 20px;overflow: hidden;
       		span{margin-bottom: 20px;display: block;}
        	textarea{padding: 20px;border: 2px solid #e1e1e1;width: 100%;height:350px;border-radius:20px;}
        	input{background: transparent;float: right;text-align: right;border: none;outline: none;padding: 10px;display: block;height: 40px;}
        }
    }
</style>