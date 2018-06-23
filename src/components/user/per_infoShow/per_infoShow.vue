<template>
	<div id="perInfoShow">
		<header>
			<span class="left" @click="$router.back(-1)"></span>
			个人信息
			<span class="right" @click="save">保存</span>
		</header>
		<div class="inputBox"><span>姓名：</span><input type="text" placeholder="请输入姓名" v-model="name"/></div>
		<div class="inputBox"><span>户籍：</span>
			<mt-picker :slots="myAddress" @change="onMyAddressChange" valueKey="address"></mt-picker>
			<input placeholder="请点击选择地址" type="text" readonly="readonly" @click="myshow('#myArea')" v-model="areaString" id="myArea">
		</div>
		<div class="inputBox"><span>身份证号：</span><input type="text" placeholder="请输入身份证号"  v-model="idCard"/></div>
		<div class="inputBox"><span>民族：</span><input type="text" placeholder="请输入民族"  v-model="peopleType"/></div>
		<div class="inputBox" style="background: #F1F1F1"><span>性别：</span><input type="text" placeholder="保存身份证后自动获取"  v-model="sex" readonly="readonly"/></div>
		<div class="inputBox" style="background: #F1F1F1"><span>出生日期：</span><input type="text" placeholder="保存身份证后自动获取"  v-model="bothDate" readonly="readonly"/></div>
	</div>
</template>

<script>
	import { MessageBox,Toast,Picker} from 'mint-ui';
	export default { 
  		name: 'perInfoShow',
  		data(){
  			return{
  				name:'',
  				sex:'',
  				areaString:'',
  				areaCode:'',
  				bothDate:'',
  				idCard:'',
  				peopleType:'',
  				myAddress:''
  			}
  		},
  		created(){
  			this.myAddress = this.myfun.areaFun();
  			this.myfun.getAxios({path:'/app/personalInformation'},res=>{
  				res = res.content;
  				this.peopleType = res.substationLogin.substation_nation;
  				this.name = res.substationLogin.substation_real_name;
  				this.sex = res.substationLogin.substation_sex==1?'男':'女';
  				this.areaString = res.substationLogin.registered_residence_name?this.myfun.changeAddr(res.substationLogin.registered_residence_name):'';
				this.bothDate = res.substationLogin.substation_birthday?this.myfun.timestampToTime(res.substationLogin.substation_birthday.replace(/-/g,'/')):'';
  				this.areaCode = res.substationLogin.substation_registered_residence;
  				this.idCard = res.substationLogin.substation_card;
  				
  				/*初始化位置*/
	        	this.myfun.beginAddrPlace(this,this.areaCode);
				
  				
  			})
			this.$nextTick(()=>{
				var that = this;
				$('.picker').on('click',function(){
	        		that.myfun.removeArea(this);
	        	});
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
 			save(){
 				if(!this.peopleType || !this.name || !this.areaCode || !this.idCard){
 					return	MessageBox('提示','信息不能为空！');
 				}
 				if(!this.myfun.checkIdcard(this.idCard)){
 					return MessageBox('提示','身份证格式有误！');
 				}
 				var	postData = {
 					substation_real_name:this.name,
 					substation_card:this.idCard,
 					substation_nation:this.peopleType,
 					substation_registered_residence:this.areaCode
 				}
 				this.myfun.postAxios({path:'/app/personalInformationUpdate'},postData,res=>{
 					return	MessageBox('提示',res.msg).then(()=>{
 						this.$router.back(-1);
 					});
 				})
 			},
 			//显示地址
			myshow(id){
				this.myfun.showArea(id);
			},
		}
	}
</script>

<style lang="less" scoped="scoped">
#perInfoShow{
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
            input[type=text],input[type=number],select{border: none;flex: 4;padding: 0 10px;text-align: right;padding-right: 20px;background: transparent;}
        }
        
        .txtBox{
        	span{display: block;height: 90px;line-height: 90px;}
        	textarea{display: block;width: 100%;min-height: 250px;padding: 20px;border-radius:20px ;}
        	height: auto;padding:30px;padding-top: 0;
        }
        background:#fff;
        .btn{margin: 40px;}
    }
</style>