<template>
	<div id="reserveDetail">
		<header>
			<span class="left" @click="$router.back(-1)"></span>
			预订详情
			<span class="right" @click="save">保存</span>
		</header>

		<div class="container">
			<div class="header">
				<div class="title">梅州就业服务管理局招聘单位登记表</div>
				<div class="time">日期：{{nowTime}}</div>
			</div>
			<p><span>单位名称：</span>{{comInfo.company_name}}</p>
			<p><span>联系人：</span>{{comInfo.company_legal}}</p>
			<p><span>营业执照号码：</span>{{comInfo.company_business_license}}</p>
			<p class="lineBroke"><span>详细地址：</span>{{comInfo.company_owned_city_name_path}}</p>
			<p><span>电话号码：</span>{{comInfo.company_mobile_phone}}</p>
			<p><span>单位性质：</span>{{comInfo.company_nature_name}}</p>
			<p><span>单位简介：</span></p>
			<p class="detail">{{comInfo.company_brief_introduction}}</p>
			<p><span>招聘会主题：</span>{{onlineBooking.online_booking_title}}</p>
			<p><span>已选展位：</span>{{place}}</p>
			<ul class="listBox">
				<div class="list_header">招聘职位要求<span @click="addJobRequire"><i class="add"></i>添加</span></div>
				<li v-for="(data,index) in localArray">
					<router-link :to="{path:'editJobRequire',query:{id:index}}">
						<p><span class="left">{{data.online_position_title}}</span><span class="right" style="color: #FF6000;">试用期工资：{{data.online_position_probationary_payroll}}</span></p>
						<p><span class="left">招聘人数：{{data.online_position_people_number}}人</span><span class="right">试用期：{{data.online_position_probation_period}}</span></p>
					</router-link>
				</li>
			</ul>
			<div class="otherBox"><span>单位情况获知：</span>
				<div class="editWork"><span class="left">1.签订规范的劳动合同</span><div class="right"><input type="radio" name="editWork" checked="checked" value="1"/>是<input type="radio" name="editWork" value="0"/>否</div></div>
				<div><span class="left">1.劳动合同期限（年）</span><input type="number" placeholder="请输入劳动合同期限" class="right" v-model="workTime"/></div>
				<div class="editHouse"><span class="left">1.办理住房公积金</span><div class="right"><input type="radio" name="editHouse" checked="checked" value="1"/>是<input type="radio" name="editHouse" value="0"/>否</div></div>
				<div><span>4.办理社会保险（请选择）</span>
					<ul>
						<li v-for="(data,index) in protectData" v-text="data.name" :class="data.isChoose?'cur':''" @click="choose(index)"></li>
					</ul>
				</div>
			</div>
			<p class="_important">预定提交后无法修改，如有特殊情况请联系我们！</p>
			<p class="_important">补充说明：{{onlineBooking.online_booking_explain}}</p>
			<p class="lineBroke">地址：{{onlineBooking.online_booking_address}}</p>
			<p>联系电话：{{onlineBooking.online_booking_phone}}</p>
			<p>传真电话：{{onlineBooking.online_booking_fax}}</p>
			
		</div>
		
	</div>
</template>

<script>
	import { MessageBox,Toast } from 'mint-ui';
	export default{
		name:'reserveDetail',
		data(){
			return{
				protectData:[{name:'养老保险',isChoose:false},{name:'医疗保险',isChoose:false},{name:'工伤保险',isChoose:false},{name:'生育保险',isChoose:false},{name:'失业保险',isChoose:false}],
				localArray:[],
				workTime:'',//劳动合同期限
				getId:'',
				nowTime:'',
				comInfo:'',//公司信息
				place:'',
				onlineBooking:''//招聘信息
			}
		},
		created(){
			this.getId = this.$route.query.id;
			if(localStorage.my_postData){
				this.localArray = JSON.parse(localStorage.my_postData);
			}
			this.myfun.getAxios({path:'/app/jobFairInfo/'+this.getId,returnBack:true},res=>{
				console.log(res);
				res = res.content;
				this.nowTime = res.nowTime;
				this.comInfo = res.companyView;
				this.comInfo.company_owned_city_name_path = this.myfun.changeAddr(this.comInfo.company_owned_city_name_path);
				this.place = res.place;
				this.onlineBooking = res.onlineBookingView;
			})
			
			
		},
		methods:{
			choose(val){
				this.protectData[val].isChoose = this.protectData[val].isChoose?false:true;
			},
			addJobRequire(){
				if(this.localArray.length>=10){
					return MessageBox('提示','招聘职位最多10个！');
				}
				
				this.$router.push({path:'editJobRequire',query:{id:-1}});
			},
			save(){
				var _editWork = $('.editWork').find('input[type=radio]:checked').val();
				var _editHouse = $('.editHouse').find('input[type=radio]:checked').val();
				var _str = '';
				for (let i in this.protectData) {
					if(this.protectData[i].isChoose){
						_str+=','+this.protectData[i].name;
					}
				}
				_str = _str.substr(1);
				
				var myObj = [{_key:this.workTime,msg:'劳动合同期限',minSize:3}];
				if(!this.workTime){
					return MessageBox('提示','劳动合同期限信息不能为空！');
				}
				else if(!this.myfun.judeyStrLen(myObj)){
					return;
				}
				else if(this.workTime<=0){
					return MessageBox('提示','劳动合同期限至少大于1！');
				}
				else if(!_str){
					return MessageBox('提示','至少选择一个办理社会保险！');
				}
				else if(!this.localArray.length){
					return MessageBox('提示','至少添加一条招聘要求！');
				}
				for (let i in this.localArray) {
					this.localArray[i].online_position_housing_provident_fund = _editHouse;
					this.localArray[i].online_position_labor_contract = _editWork;
					this.localArray[i].online_position_labor_contract_period = this.workTime;
					this.localArray[i].online_position_social_insurance = _str;
				}
				var myStr = 'json='+JSON.stringify(this.localArray)+',';
				this.myfun.postAxios({path:'/app/jobFairInfoCompanySave/'+this.getId,isUnchangeString:true},myStr,res=>{
					localStorage.removeItem('my_postData');
					this.$router.push({path:'reserve_choosePlace',query:{id:this.getId}});
					return Toast(res.msg)
				})
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.container{padding: 30px;background: #fff;
		.header{
			height: auto;border-bottom:1px solid #E1E1E1;margin-bottom:20px;
			.title{font-size: 38px;color: #1B1B1B;font-weight: bold;text-align: center;height: 50px;line-height: 50px;letter-spacing: 4px;}		
			.time{text-align: right;color: #888888;margin: 10px 0;}	
		}
		p{line-height: 50px;height: auto;span{color: #000;font-weight: bold;}}
		p.detail{text-indent: 50px;}
		._important{color: #FF0000;}
		ul.listBox{margin: 30px 0;
			.list_header{height: 40px;border-left:10px solid #FF6000;color: #000000;padding-left: 30px;font-size: 35px;font-weight: bold;
				span{float: right;color: #FF6000;
					i{background: url(../../assets/image/addIcon.png) no-repeat;background-size:100% 100%;display: inline-block;height: 25px;width: 25px;margin-right: 10px;}
				}
			}
			li{min-height: 135px;box-shadow: 2px 2px 10px #888888;width: 100%;border-radius:10px;margin-top: 30px;padding: 20px;
				p{height: 50px;line-height: 50px;
					span{font-weight: normal;color: #888888;}
					span.left{float:left;}
					span.right{float:right;}
				}
			}			
		}
		.otherBox{
        	height: auto;display: block;padding: 10px 0;
        	 .other{text-indent: 50px;line-height: 50px;}
        	 span.left{float: left;}
        	 span.right{float: right;}
        	 input.right{float: right;border: none;text-align: right;}
        	 div.right{width: auto;border: none;padding: 0;float: right;input[type=radio]{margin: 0 10px 0 50px;position: relative;top: 3px;}}
        	 div{height: auto;width: 100%;overflow: hidden;height: auto;line-height: 40px;padding: 15px 10px;border-bottom: 1px solid #E1E1E1;color: #888888;
        	 	ul{margin-top:20px;display: flex;
        	 		li+li{margin-left: 8px;}
        	 		li{height: 70px;border: 2px solid #E1E1E1;border-radius:10px;text-align: center;line-height: 70px;padding: 0 5px;width: auto;font-size: 23px;flex: 1;color: #656B79;}
        	 		li.cur{border: 2px solid #FF6000;color: #FF6000;}
        	 	}
        	 }
        }
	}
</style>